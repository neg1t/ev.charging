import type { FC } from 'react'

import { useUnit } from 'effector-react'

import { authModel } from 'entities/auth'

import { hasRole } from 'shared/role-guard'
import type { AppRole } from 'shared/role-guard'
import { Forbidden } from 'shared/ui/Forbidden'

interface RoleGuardProps {
  allowedRoles: AppRole[]
  children: React.ReactNode
  showForbiddenMessage?: boolean
}

export const RoleGuard: FC<RoleGuardProps> = (props) => {
  const userRole = useUnit(authModel.stores.$role)
  const hasAccess = hasRole(userRole, props.allowedRoles)

  if (hasAccess) return props.children
  if (props.showForbiddenMessage) return <Forbidden />
  return null
}
