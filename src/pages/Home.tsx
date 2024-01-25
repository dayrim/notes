
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useElectric } from '../electric';
import { v4 as uuidv4 } from 'uuid'
import { useLiveQuery } from 'electric-sql/react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import ReactQuill from 'react-quill';
import throttle from 'lodash.throttle';


import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Note } from 'src/generated/client';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const drawerWidth = 240;



export const Notes = () => {
  const quillRef = useRef<ReactQuill>(null);
  const [selectedNote, setSelectedNote] = useState<Note>();
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

    // Use electricSQL to update the note
    await db.note.update({
      where: {
        id: selectedNote.id, // Assuming selectedNote has the id
      },
      data: {
        title: title, // Updating the title
        content: content, // Updating the content
        updateDate: new Date(), // Set the current date and time
      },
    });

  };
  const throttledSaveNote = useCallback(throttle(saveNote, 2000), [selectedNote]);

  const handleChange = (content: string) => {
    setContent(content);
    throttledSaveNote(content);
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
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
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
          <IconButton onClick={addNote}>
            <AddIcon style={{ marginLeft: 'auto' }} />
          </IconButton>
          <IconButton onClick={deleteNote}>
            <DeleteIcon style={{ marginLeft: 'auto' }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>

          {notes && notes
            .sort((a, b) => {
              const dateA = a.createDate ? new Date(a.createDate) : new Date(0); // Fallback to epoch if undefined
              const dateB = b.createDate ? new Date(b.createDate) : new Date(0); // Fallback to epoch if undefined

              return dateB.getTime() - dateA.getTime(); // Compare timestamps
            })
            .map((note, index) => (
              <ListItem key={note.id} disablePadding>
                <ListItemButton
                  onClick={() => { setContent(note.content); setSelectedNote(note); }}
                  selected={selectedNote?.id === note.id}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={note.title || "New note..."} />
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

