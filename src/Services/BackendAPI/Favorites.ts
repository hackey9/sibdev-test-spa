import * as users from "Services/BackendAPI/Users"
import {User} from "Services/BackendAPI/Users"
import {Order} from "Services/YouTubeAPI"


export async function all(token: string): Promise<Favorite[]> {
  const user = await users.getByToken(token)
  return internalGet()[user.id] ?? []
}

export async function remove(token: string, id: Favorite["id"]) {
  const user = await users.getByToken(token)
  let items = internalGet()

  items = {
    ...items,
    [user.id]: items[user.id].filter(item => item.id !== id)
  }

  //items[user.id] = items[user.id].filter(item => item.id !== id)
  internalSet(items)
}

export async function add(token: string, favorite: Omit<Favorite, "id">) {
  const user = await users.getByToken(token)
  const items = internalGet()
  if (!items[user.id]) items[user.id] = []

  const newItem = {...favorite, id: generateNewId()}
  items[user.id].unshift(newItem)

  internalSet(items)
  return newItem
}

export async function update(token: string, favorite: Favorite) {
  const user = await users.getByToken(token)
  let items = internalGet()

  if (!items[user.id]) items[user.id] = []

  items[user.id] = items[user.id].map(item => item.id === favorite.id ? favorite : item)
  internalSet(items)
  return favorite
}


export type Favorite = {
  id: string
  query: string
  title: string
  order: Order
  count: number
}


export type FavoriteDraft = Partial<Pick<Favorite, "id">> & Omit<Favorite, "id">


/* implementation */

const FAVORITES_KEY = "favorites"

type AllFavorites = Record<User["id"], Favorite[]>

function internalGet(): AllFavorites {
  const json = localStorage.getItem(FAVORITES_KEY) ?? "{}"

  return JSON.parse(json) as AllFavorites
}

function internalSet(allFavorites: AllFavorites) {

  const json = JSON.stringify(allFavorites)
  localStorage.setItem(FAVORITES_KEY, json)
}


function generateNewId() {
  return `${+new Date()}`
}
