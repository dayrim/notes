import { LIB_VERSION } from 'electric-sql/version'
import { ElectricConfig } from 'electric-sql'
import { makeElectricContext } from 'electric-sql/react'
import { uniqueTabId, genUUID } from 'electric-sql/util'
import { insecureAuthToken } from 'electric-sql/auth'
import { Capacitor } from '@capacitor/core'
import { Electric, schema } from '../db/generated/client'

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

const discriminator = 'notes'
const distPath = '/'
const ELECTRIC_URL = import.meta.env.VITE_ELECTRIC_URL
const ENVIRONMENT = import.meta.env.VITE_ENV

// We export dbName so that we can delete the database if the schema changes
export let dbName: string

export const initElectric = async () => {
  console.log("Initializing Electric...");

  const { tabId } = uniqueTabId()
  dbName = `${discriminator}-${LIB_VERSION}-${tabId}.db`

  console.log(`Database Name: ${dbName}`);

  const config = {
    auth: {
      token: insecureAuthToken({ user_id: genUUID() }),
    },
    url: ELECTRIC_URL,
    debug: ENVIRONMENT === 'development',
  }

  console.log("Electric Config:", config);

  const platform = Capacitor.getPlatform();
  console.log("Platform:", platform);

  try {
    const initResult = await initWaSQLite(dbName, config);
    console.log("Electric initialized successfully:", initResult);
    return initResult;
  } catch (error) {
    console.error("Error initializing Electric:", error);
    throw error;
  }
}

async function initWaSQLite(dbName: string, config: ElectricConfig) {
  console.log(`Initializing WaSQLite with dbName: ${dbName}`);

  const { ElectricDatabase, electrify } = await import('electric-sql/wa-sqlite')
  const conn = await ElectricDatabase.init(dbName, distPath)

  console.log("Connection established with WaSQLite:", conn);

  const electrifiedConn = await electrify(conn, schema, config)
  console.log("Electrified Connection:", electrifiedConn);

  return electrifiedConn;
}
