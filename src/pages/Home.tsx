
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useElectric } from '../electric';
import { v4 as uuidv4 } from 'uuid'
import { useLiveQuery } from 'electric-sql/react';
import { Box, AppBar, Toolbar, Typography, Drawer, Divider, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import MiniSearch from 'minisearch';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Note } from '../../db/generated/client';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 240;


export type FilteredNote = {
  id: string;
  title: string;
  content: string;
  plainContent: string;
  score: number;
  createDate: Date | null;
  updateDate: Date | null;
}

export const Notes = () => {
  const quillRef = useRef<ReactQuill>(null);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [searchQuery, setSearchQuery] = useState('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const { db } = useElectric()!
  const { results: notes } = useLiveQuery(
    db.note.liveMany()
  );

  const [content, setContent] = useState<string>('<h1></h1>');

  const saveNote = async (content: string) => {
    if (!selectedNote) return; // Ensure there's a selected note

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');
    let title = h1?.textContent || '';

    const textContent = doc?.body?.textContent || '';0
    // Use electricSQL to update the note
    await db.note.update({
      where: {
        id: selectedNote.id, // Assuming selectedNote has the id
      },
      data: {
        title: title, // Updating the title
        content: content, // Updating the content
        plainContent: textContent,
        updateDate: new Date(), // Set the current date and time
      },
    });

  };
  // const throttledSaveNote = useCallback(throttle(saveNote, 2000), [selectedNote]);
  const getFilteredAndSortedNotes = useCallback(() => {
    if (!searchQuery) return notes ?? []; // If no search query, return all notes

    // Search using MiniSearch
    console.log(miniSearch, 'miniSearch')
    const searchResults = miniSearch.search(searchQuery);
    console.log(searchResults, 'searchResults')


    return searchResults.sort((a, b) => {
      // First, sort by match score in descending order
      const scoreDifference = b.score - a.score;
      if (scoreDifference !== 0) return scoreDifference;

      // If match scores are equal, then sort by createDate in descending order
      const dateA = a.createDate ? new Date(a.createDate) : new Date(0); // Fallback to epoch if undefined
      const dateB = b.createDate ? new Date(b.createDate) : new Date(0); // Fallback to epoch if undefined
      return dateB.getTime() - dateA.getTime(); // Compare timestamps
    });

  }, [notes, searchQuery])

  const handleChange = (content: string) => {
    setContent(content);
    saveNote(content);
  };


  useEffect(() => {
    const quillInstance = quillRef.current?.getEditor();
    if (quillInstance) {
      const firstLineFormat = quillInstance.getFormat(0);

      if (!firstLineFormat.header || firstLineFormat.header !== 1) {
        quillInstance.formatLine(0, 1, 'header', 1);
      }
    }
  }, [content]);
  const miniSearch = useMemo(() => {
    const miniSearch = new MiniSearch<Note>({
      fields: ['title', 'plainContent'], // Use plainContent for indexing
      storeFields: ['title', 'content', 'id', 'createDate', 'updateDate', 'plainContent'],
      searchOptions: { fuzzy: 0.1, prefix: true }
    });
    miniSearch.addAll(notes ?? []);
    return miniSearch;
  }, [notes]);

  useEffect(() => {
    if (firstLoad && notes && notes?.length > 0) {
      setSelectedNote(notes[0]);
      setContent(notes[0].content);
      setFirstLoad(false);
    }
  }, [notes, firstLoad]);

  async function addNote() {
    const note = await db.note.create({
      data: {
        id: uuidv4() as string,
        title: '',
        content: '',
        plainContent: "",
        createDate: new Date(),
        updateDate: new Date()
      },
    });
    setSelectedNote(note)
  }
  async function deleteNote() { // assuming ID is a string UUID
    if (selectedNote) {
      await db.note.delete({ where: { id: selectedNote?.id } });

    }
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >
          <TextField
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginLeft: 'auto' }}
          />
          <IconButton onClick={addNote}>
            <AddIcon style={{ marginLeft: 'auto' }} />
          </IconButton>
          <IconButton onClick={deleteNote}>
            <DeleteIcon style={{ marginLeft: 'auto' }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>

          {getFilteredAndSortedNotes()
            .map((note: any) => (
              <ListItem key={note.id} disablePadding>
                <ListItemButton
                  onClick={() => { setContent(note.content); setSelectedNote(note); }}
                  selected={selectedNote?.id === note.id}
                >
                  <ListItemText primary={note.title ? note.title.slice(0, 15) : "New note..."} />
                </ListItemButton>
              </ListItem>
            ))}

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          {/* {selectedNote && selectedNote.content} */}
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
              ]
            }}
            formats={[
              'header', 'font', 'size',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image', 'video'
            ]}
            scrollingContainer='#scrolling-container'
            placeholder='Compose an epic...'
            theme='bubble'
          />

        </Typography>
      </Box>
    </Box>

  );
}

