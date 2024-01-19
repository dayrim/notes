import { LIB_VERSION } from 'electric-sql/version'
import { ElectricConfig } from 'electric-sql'
import { makeElectricContext } from 'electric-sql/react'
import { uniqueTabId, genUUID } from 'electric-sql/util'
import { insecureAuthToken } from 'electric-sql/auth'
import { Capacitor } from '@capacitor/core'
import { Electric, schema } from './generated/client'

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()


const discriminator = 'notes'
const distPath = '/'
const ELECTRIC_URL = import.meta.env.VITE_ELECTRIC_URL

// We export dbName so that we can delete the database if the schema changes
export let dbName: string

export const initElectric = async () => {
  console.log("Init electric")
  const { tabId } = uniqueTabId()
  dbName = `${discriminator}-${LIB_VERSION}-${tabId}.db`

  const config = {
    auth: {
      token: insecureAuthToken({ user_id: genUUID() }),
    },
    url: ELECTRIC_URL,
    debug: true,
  }

  const platform = Capacitor.getPlatform();
  console.log("Platform:" + platform)
  return await initWaSQLite(dbName, config);
}

async function initWaSQLite(dbName: string, config: ElectricConfig) {
  console.log("Init initWaSQLite")
  const { ElectricDatabase, electrify } = await import('electric-sql/wa-sqlite')
  const conn = await ElectricDatabase.init(dbName, distPath)
  return await electrify(conn, schema, config)
}
