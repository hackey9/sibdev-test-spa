import fakeUsers from "Services/BackendAPI/fakeUsers"
import {User} from "Services/BackendAPI/Users"
import delay from "Utils/delay"


export async function login(username: string, password: string): Promise<LoginResult> {

  await delay(500)

  const [id] = Object.entries(fakeUsers).find(([, uname]) => uname === username) ?? []

  if (!id) {
    throw new Error("user not found")
  }

  if (username !== password) {
    throw new Error("password is incorrect")
  }

  const rand = +new Date()
  const token = `${id}___${username}___${rand}`
  const user = {id, username}

  return {token, user}
}


export type LoginResult = {
  token: string
  user: User
}
