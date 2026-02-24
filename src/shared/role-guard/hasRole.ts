import type { AppRole } from "./types"

export const hasRole = (userRole: AppRole | undefined, allowed?: AppRole[]) => {
  if (!allowed || allowed.length === 0) return true
  if (!userRole) return false;
  return allowed.includes(userRole)
}
