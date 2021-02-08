import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {User} from "Services/BackendAPI/Users"
import {ThunkConfig} from "Store/index"


export type AuthState = {
  loading: boolean
  data?: {
    token: string
    user?: User
  }
}
const initialState: AuthState = {loading: false}


export const restoreSessionAsync = createAsyncThunk<{
  // action.payload
  user: User
  token: string
}, void, ThunkConfig>("auth/restore", async (_, {extra: api, dispatch}) => {
  const token = api.token.fetch()! // checked in condition: we trust.

  dispatch(authSlice.actions.setToken(token))

  const user = await api.backend.users.getByToken(token)

  api.token.save(token)
  return {user, token}
}, {
  condition: (arg, {getState, extra: api}) => {
    if (api.token.fetch() === null) {
      return false
    }
    return !getState().auth.loading
  },
})


export const loginAsync = createAsyncThunk<{
  // action.payload
  user: User
  token: string
}, {
  // arg
  username: string
  password: string
}, ThunkConfig>("auth/login", async ({username, password}, {extra: api}) => {
  const result = await api.backend.sessions.login(username, password)
  api.token.save(result.token)
  return result
}, {
  condition: (_, {getState}) => {
    return !getState().auth.loading
  },
})

export const logoutAsync = createAsyncThunk<void, void, ThunkConfig>("auth/logout", async (arg, {extra: api}) => {
  api.token.clear()
})


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.data = {
        token: action.payload,
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(restoreSessionAsync.pending, (state) => {
      state.loading = true
      delete state.data
    })
    builder.addCase(restoreSessionAsync.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(restoreSessionAsync.rejected, (state) => {
      state.loading = false
      delete state.data
    })

    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true
      delete state.data
    })
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(loginAsync.rejected, state => {
      state.loading = false
      delete state.data
    })

    builder.addCase(logoutAsync.fulfilled, (state) => {
      delete state.data
    })
  },
})

const authReducer = authSlice.reducer
export default authReducer
