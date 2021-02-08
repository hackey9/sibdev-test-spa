import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {Favorite, FavoriteDraft} from "Services/BackendAPI/Favorites"
import {logoutAsync} from "Store/Auth"
import {ThunkConfig} from "Store/index"


const initialState: FavoritesState = {
  loading: false,
}

export type FavoritesState = {
  loading: boolean
  items?: Record<string, Favorite>
}


export const loadAsync = createAsyncThunk<Favorite[], void, ThunkConfig>
("favorites/load", async (_, {extra: api, getState}) => {
  const token = getState().auth.data!.token // checked in condition: we can trust
  return await api.backend.favorites.all(token)
}, {
  condition: (arg, {getState}) => {
    const state = getState()
    if (state.favorites.loading || !state.auth.data?.token) {
      return false
    }
  },
})

export const addOrUpdateAsync = createAsyncThunk<Favorite, FavoriteDraft, ThunkConfig>
("favorites/addOrUpdate", async (arg, {extra: api, getState}) => {
  const token = getState().auth.data!.token
  if (arg.id) {
    return await api.backend.favorites.update(token, arg as Favorite)
  }
  return await api.backend.favorites.add(token, arg)
}, {
  condition: (arg, {getState}) => {
    const state = getState()
    if (!state.auth.data?.token || state.favorites.loading) {
      return false
    }
  },
})

export const removeAsync = createAsyncThunk<Pick<Favorite, "id">, Pick<Favorite, "id">, ThunkConfig>
("favorites/remove", async (arg, {extra: api, getState}) => {
  const token = getState().auth.data!.token
  await api.backend.favorites.remove(token, arg.id)
  return arg
}, {
  condition: (arg, {getState}) => {
    const state = getState()
    if (!state.auth.data?.token || state.favorites.loading) {
      return false
    }
  },
})


const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadAsync.pending, state => void (state.loading = true))
    builder.addCase(loadAsync.rejected, state => void (state.loading = false))
    builder.addCase(loadAsync.fulfilled, (state, action) => {
      state.loading = false
      state.items = Object.fromEntries(action.payload.map(item => [item.id, item]))
    })

    builder.addCase(addOrUpdateAsync.pending, state => void (state.loading = true))
    builder.addCase(addOrUpdateAsync.rejected, state => void (state.loading = false))
    builder.addCase(addOrUpdateAsync.fulfilled, (state, action) => {
      state.loading = false
      if (!state.items)
        state.items = {}
      state.items[action.payload.id] = action.payload
    })

    builder.addCase(removeAsync.pending, state => void (state.loading = true))
    builder.addCase(removeAsync.rejected, state => void (state.loading = false))
    builder.addCase(removeAsync.fulfilled, (state, action) => {
      state.loading = false
      if (state.items) {
        delete state.items[action.payload.id]
      }
    })

    // very interesting feature. we can handle actions around all store
    builder.addCase(logoutAsync.fulfilled, state => void(delete state.items))
  },
})

const favoritesReducer = favoritesSlice.reducer
export default favoritesReducer


