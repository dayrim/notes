// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import { CssBaseline } from '@mui/material';
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'


import { defineCustomElements as jeepSqlite, applyPolyfills, JSX as LocalJSX } from "jeep-sqlite/loader";
import { HTMLAttributes } from 'react';
import { CapacitorSQLite } from '@capacitor-community/sqlite';

type StencilToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
  };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {
    }
  }
}

applyPolyfills().then(() => {
  jeepSqlite(window);
});
window.addEventListener('DOMContentLoaded', async () => {
  console.log('$$$ in index $$$');
  // const platform = Capacitor.getPlatform();
  try {
    // if (platform === "web") {
    //   const jeepEl = document.createElement("jeep-sqlite");
    //   document.body.appendChild(jeepEl);
    //   await customElements.whenDefined('jeep-sqlite');
    //   await sqliteConnection.initWebStore();
    // }


    // // when using Capacitor, you might want to close existing connections,
    // // otherwise new connections will fail when using dev-live-reload
    // // see https://github.com/capacitor-community/sqlite/issues/106
    await CapacitorSQLite.checkConnectionsConsistency({
      dbNames: [], // i.e. "i expect no connections to be open"
      openModes: [],
    }).catch((e) => {
      // the plugin throws an error when closing connections. we can ignore
      // that since it is expected behaviour
      console.log(e);
      return {};
    });

    // for (const connection of [DataSource]) {
    //   if (!connection.isInitialized) {
    //     await connection.initialize();
    //   }

    //   await connection.runMigrations();
    // }


    // if (platform === 'web') {
    //   // save the database from memory to store
    //   await sqliteConnection.saveToStore('notes-db');
    // }

    const container = document.getElementById('root')
    const root = createRoot(container!)
    root.render(
      <React.StrictMode>
        <CssBaseline />
        <App />
      </React.StrictMode>
    )



  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }
});

