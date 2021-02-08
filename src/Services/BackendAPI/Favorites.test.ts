import API from "Services/index"


describe("favorites test", function () {

  let token: string

  beforeAll(async () => {
    const result = await API.backend.sessions.login("test", "test")
    token = result.token
  })

  beforeEach(async () => {
    localStorage.removeItem("favorites")
  })

  it("token is valid", function () {
    expect(typeof token).toBe("string")
    expect(token.length).toBeGreaterThan(10)
  })

  it("localStorage is available", function () {
    expect(typeof localStorage).toBe("object")
  })

  it("should return empty array", async () => {
    const items = await API.backend.favorites.all(token)

    expect(items).toEqual([])
  })

  it("add one item and check", async () => {
    const order = "rating"
    const title = "чем кормить кота"
    const count = 40

    await API.backend.favorites.add(token, {count, order, title})
    const items = await API.backend.favorites.all(token)

    expect(items.length).toBe(1)
    expect(items[0].title).toBe(title)
    expect(items[0].count).toBe(count)
    expect(items[0].order).toBe(order)
    expect(typeof items[0].id).toBe("string")
  })
})
