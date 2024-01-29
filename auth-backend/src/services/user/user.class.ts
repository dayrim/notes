// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './user.schema'
import { v4 as uuidv4 } from 'uuid'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends KnexAdapterParams<UserQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends KnexService<
  User,
  UserData,
  UserParams,
  UserPatch
> {
  async create(data: UserData, params?: ServiceParams): Promise<User>
  async create(data: UserData[], params?: ServiceParams): Promise<User[]>
  async create(data: UserData | UserData[], params?: ServiceParams): Promise<User | User[]> {
    if (Array.isArray(data)) {
      // Handle array of UserData objects
      const extendedDataArray = data.map((item) => ({
        ...item,
        id: uuidv4()
      }))
      return super.create(extendedDataArray, params)
    } else {
      // Handle single UserData object
      const extendedData = {
        ...data,
        id: uuidv4() // Generate UUID
      }
      return super.create(extendedData, params)
    }
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'user'
  }
}
