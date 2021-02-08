import fakeUsers from "Services/BackendAPI/fakeUsers"
import delay from "Utils/delay"


export async function getByToken(token: string): Promise<User> {
  await delay(600)

  const [id, username] = token.split("___", 3) as (string | undefined)[]

  if (!(id && username))
    throw new Error("session is not valid")

  const result = Object.entries(fakeUsers).find(([uid, un]) => id === uid && un === username)
  if (!result) {
    throw new Error("user is not exists")
  }

  return {id, username}
}


export type User = {
  id: string
  username: string
}

