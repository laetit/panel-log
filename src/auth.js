const token = "tkn"
const permission = "pms"
const profile = "pfl"

export const isAuthenticated = () => localStorage.getItem(token) !== null ? true : false 
export const getToken = () => localStorage.getItem(token)
export const login = newToken => { localStorage.setItem(token, newToken) }
export const logout = () => { localStorage.removeItem(token) }

export const setPermissions = (loggedPermissions) => { localStorage.setItem(permission, JSON.stringify(loggedPermissions))}
export const getPermissions = () => {return JSON.parse(localStorage.getItem(permission))}
export const clearPermissions = () => { localStorage.removeItem(permission) }

export const setProfile = (loggedProfile) => { localStorage.setItem(profile, loggedProfile) }
export const getProfile = () => localStorage.getItem(profile)
export const clearProfile = () => { localStorage.removeItem(profile) }
