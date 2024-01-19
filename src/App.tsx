import { useState, useEffect } from 'react';
import Notes from './Notes';
import { ElectricProvider, initElectric, dbName } from './electric'
import { Electric } from './generated/client';

function App() {
  const [electric, setElectric] = useState<Electric>()

  useEffect(() => {
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

  return electric && (
    <ElectricProvider db={electric}>
      <Notes></Notes>
    </ElectricProvider>
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
