import API from "Services"
import {restoreSessionAsync} from "Store/Auth"
import createStore, {AppStore, RootState} from "Store/index"


describe("auth store tests", function () {

  let store: AppStore

  beforeEach(() => {
    store = createStore(API) // use real api (with fake users) xD
  })
  afterEach(() => {
    store = null!
  })

  it("expect empty store", () => {
    const state = store.getState().auth

    expect(state).toEqual({loading: false})
  })

  it("should dispatch 'restoreAsync'; load user data; persists auth token", async () => {
    const username = "admin"
    const password = "admin"
    const {token, user} = await API.backend.sessions.login(username, password)
    expect(typeof token).toBe("string")

    API.token.save(token)
    expect(API.token.fetch()).toBe(token)

    const stateBefore = store.getState()
    const task = store.dispatch(restoreSessionAsync())
    const stateWhile = await new Promise<RootState>(resolve => setTimeout(() => resolve(store.getState())))
    await task
    const stateAfter = store.getState()

    expect(stateBefore.auth).toEqual({loading: false})
    expect(stateWhile.auth).toEqual({loading: true, data: {token}})
    expect(stateAfter.auth).toEqual({loading: false, data: {token, user: {username, id: user.id}}})
  })

})
