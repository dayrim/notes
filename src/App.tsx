import { useState, useEffect } from 'react';
import { Notes } from './pages/Home';
import { ElectricProvider, initElectric, dbName } from './electric'
import { Electric } from '../db/generated/client';
import { authClient } from './auth-client'; // Import the Feathers client

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Login } from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [electric, setElectric] = useState<Electric>()

  useEffect(() => {
    authClient.reAuthenticate()
      .then(() => setIsAuthenticated(true))
      .catch(error => console.error('Re-authentication failed', error));

    const init = async () => {
      try {
        const client = await initElectric()
        setElectric(client)
        const { synced } = await client.db.note.sync({})
        await synced

      } catch (error) {
        if (
          (error as Error).message.startsWith(
            "Local schema doesn't match server's",
          )
        ) {
          deleteDB()
        }
        throw error
      }
    }

    init()
  }, [])
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const login = async (email: string, password: string) => {
    try {
      await authClient.authenticate({
        strategy: 'local',
        email,
        password,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed', error);
      // Handle errors (e.g., showing an alert or message to the user)
    }
  };


  const register = async (email: string, password: string) => {
    try {
      // Creating a new user
      await authClient.service('user').create({ email, password });
      // If registration is successful, automatically log the user in
      await login(email, password);
    } catch (error) {
      console.error('Registration failed', error);
      // Handle errors (e.g., showing an alert or message to the user)
    }
  };


  return electric && (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        electric && (
          <ElectricProvider db={electric}>
            <Notes />
          </ElectricProvider>
        )
      ) : (
        <Login onLogin={login} onRegister={register} />
      )}
    </ThemeProvider>
  );
}

export default App;

function deleteDB() {
  console.log("Deleting DB as schema doesn't match server's")
  const DBDeleteRequest = window.indexedDB.deleteDatabase(dbName)
  DBDeleteRequest.onsuccess = function () {
    console.log('Database deleted successfully')
  }
  // the indexedDB cannot be deleted if the database connection is still open,
  // so we need to reload the page to close any open connections.
  // On reload, the database will be recreated.
  window.location.reload()
}
