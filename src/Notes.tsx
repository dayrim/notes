import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useElectric } from './electric'

import { v4 as uuidv4 } from 'uuid'
import { useLiveQuery } from 'electric-sql/react';

function Notes() {
    const { db } = useElectric()!
    const { results: notes } = useLiveQuery(
        db.note.liveMany()
    );

    // useEffect(() => {
    //   loadData();
    // }, []);

    // async function loadData() {
    //   const noteRepository = dataSource.getRepository(Note);
    //   const allNotes = await noteRepository.find();
    //   setNotes(allNotes);

    // }

    // async function addNote() {
    //   const noteRepository = dataSource.getRepository(Note);
    //   const newNote = noteRepository.create({ title: 'New note', content: 'Content of the new note' });
    //   await noteRepository.save(newNote);
    //   if (Capacitor.getPlatform() === 'web' && typeof dataSource.options.database === 'string') {
    //     await connection.saveToStore(dataSource.options.database);
    //   }
    //   loadData(); // Reload notes
    // }

    // async function deleteNote(id: number) {
    //   const noteRepository = dataSource.getRepository(Note);
    //   await noteRepository.delete(id);
    //   if (Capacitor.getPlatform() === 'web' && typeof dataSource.options.database === 'string') {
    //     await connection.saveToStore(dataSource.options.database);
    //   }
    //   loadData(); // Reload notes
    // }
    async function addNote() {
        await db.note.create({
            data: {
                id: uuidv4() as string, // generate a new UUID for the note
                title: 'New note',
                content: 'Content of the new note'
            },
        });
    }
    async function deleteNote(id: string) { // assuming ID is a string UUID
        await db.note.delete({ where: { id } });
    }

    return (

        <div>
            <Button variant="contained" onClick={addNote}>Add Note</Button>

            <h1>Notes</h1>
            <List>
                {notes && notes.map(note => (
                    <ListItem
                        key={note.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(note.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={note.title} secondary={note.content} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Notes;

