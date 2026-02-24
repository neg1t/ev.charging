import { sample } from 'effector'

import { authModel } from 'entities/auth'

import { initApiClientFx } from 'shared/api'
import { appStarted } from 'shared/lib/effector-utils'

import '../../shared/i18n/i18n'

sample({
  clock: appStarted,
  target: initApiClientFx,
})

sample({
  clock: appStarted,
  target: authModel.effects.initUserManagerFx,
})

sample({
  clock: appStarted,
  fn: () => window.location.search,
  target: authModel.effects.aquireUser,
})
