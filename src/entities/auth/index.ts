import {
  $role,
  $tokenData,
  aquireUser,
  initUserManagerFx,
  logout,
  userReceived,
} from './model'

const stores = {
  $tokenData,
  $role,
}

const effects = {
  aquireUser,
  initUserManagerFx,
}

const events = {
  userReceived,
  logout,
}

export const authModel = { stores, events, effects }
