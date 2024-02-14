
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useElectric } from '../electric';
import { v4 as uuidv4 } from 'uuid'
import { useLiveQuery } from 'electric-sql/react';
import { Box, AppBar, Toolbar, Typography, Drawer, Divider, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import MiniSearch, { SearchResult } from 'minisearch';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Note } from '../../db/generated/client';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 240;



export const Notes = () => {
  const quillRef = useRef<ReactQuill>(null);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [searchQuery, setSearchQuery] = useState('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const { db } = useElectric()!
  const { results: dbNotes } = useLiveQuery(
    db.note.liveMany()
  );
  const [notes, setNotes] = useState<Note[]>()

  const miniSearch = useMemo(() => {
    const miniSearch = new MiniSearch<Note>({
      fields: ['title', 'plainContent'], // Use plainContent for indexing
      storeFields: ['title', 'content', 'id', 'createDate', 'updateDate', 'plainContent'],
      searchOptions: { fuzzy: 0.1, prefix: true }
    });
    return miniSearch;
  }, []);
  useEffect(() => {
    if (!searchQuery) {
      const sortedNotes = (dbNotes || []).sort((a, b) => {
        const dateA = a.createDate ? new Date(a.createDate) : new Date(0);
        const dateB = b.createDate ? new Date(b.createDate) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      })
      setNotes(sortedNotes);
      return;
    }
    miniSearch.removeAll();
    miniSearch.addAll(dbNotes ?? []);
    const searchResults: Note[] | SearchResult[] = miniSearch.search(searchQuery);
    searchResults.sort((a, b) => {
      // First, sort by match score in descending order
      const scoreDifference = b.score - a.score;
      if (scoreDifference !== 0) return scoreDifference;

      // If match scores are equal, then sort by createDate in descending order
      const dateA = a.createDate ? new Date(a.createDate) : new Date(0); // Fallback to epoch if undefined
      const dateB = b.createDate ? new Date(b.createDate) : new Date(0); // Fallback to epoch if undefined
      return dateB.getTime() - dateA.getTime(); // Compare timestamps
    })

    setNotes(searchResults.map(result => ({
      id: result.id,
      title: result.title,
      content: result.content,
      plainContent: result.plainContent,
      createDate: result.createDate,
      updateDate: result.updateDate,
    })));
  }, [dbNotes, searchQuery, miniSearch])
  const [content, setContent] = useState<string>('<h1></h1>');

  const saveNote = async (content: string) => {
    if (!selectedNote) return; // Ensure there's a selected note

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');
    let title = h1?.textContent || '';

    const textContent = doc?.body?.textContent || ''; 0
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
    setSelectedNote(note);
    setContent(note.content);
  }
  const deleteNote = useCallback(async () => {
    if (selectedNote) {
      // Delete the note from the database
      await db.note.delete({ where: { id: selectedNote?.id } });

      // Proceed only if there are notes and more than one note exists
      if (notes?.length && notes.length > 1) {
        const index = notes.findIndex(note => note.id === selectedNote.id);

        // Use a ternary operator to simplify the selection of the new note
        // This selects the next note if available, otherwise the previous one
        const newIndex = (index < notes.length - 1) ? index + 1 : index - 1;

        // Ensuring the new index is within bounds in case of edge cases
        const newSelectedNote = notes[newIndex >= 0 ? newIndex : 0];

        // Update the selected note state and its content
        setSelectedNote(newSelectedNote);
        setContent(newSelectedNote.content);
      }
    }

  }, [selectedNote, notes]);


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

          {!!notes && notes
            .map((note) => (
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

