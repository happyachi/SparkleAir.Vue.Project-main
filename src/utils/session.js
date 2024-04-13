export function getSession(key) {
    return sessionStorage.getItem(key)
}

export function setSession(key, value) {
    sessionStorage.setItem(key, value)
}

export function removeSession(key) {
    sessionStorage.removeItem(key)
}

export function clearSession() {
    sessionStorage.clear()
}
