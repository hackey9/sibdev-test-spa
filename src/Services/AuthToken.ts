const AUTH_TOKEN = "auth_token"


// if (!(window && window.localStorage)) {
//   console.warn("localStorage is not available on server")
// }

export function fetch(): string | null {
  return window.localStorage.getItem(AUTH_TOKEN)
}

export function save(token: string) {
  return void window.localStorage.setItem(AUTH_TOKEN, token)
}

export function clear() {
  return void window.localStorage.removeItem(AUTH_TOKEN)
}

