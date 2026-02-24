import { allSettled } from 'effector'
import { createRoot } from 'react-dom/client'

import { scope } from 'shared/config/app-scope'
import { appStarted, enableScopeInspector } from 'shared/lib/effector-utils'

import { App } from './app'

if (import.meta.env.DEV) {
  enableScopeInspector()
}

await allSettled(appStarted, { scope })

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App scope={scope} />)
