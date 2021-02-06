import API from "Services/YouTubeAPI/index"


describe("test /search", () => {

  it("request 50 items", async () => {
    const count = 50
    const q = "чем кормить кота"

    const items = await API.search(q, count)

    expect(typeof items.count).toBe("number")
  }, 3000)

  it("request 100k items", async () => {
    const count = 100000
    const q = "чем кормить кота"

    const promise = API.search(q, count)

    await expect(promise).rejects.toThrowError()

  }, 3000)

  it("request 1 item", async () => {
    const count = 1
    const q = "чем кормить кота"

    const items = await API.search(q, count)

    expect(items.count).toBe(count)
  }, 3000)

  it("request 0", async () => {
    const count = 0
    const q = "чем кормить кота"

    const items = await API.search(q, count)

    expect(items.count).toBe(0)
  }, 100)

  it("request empty string", async () => {
    const count = 25
    const q = String()

    await expect(API.search(q, count)).rejects.toThrowError()
  })

})

describe("test /search+videos", () => {

  it("get 50 videos", async () => {
    const q = "чем кормить кота"
    const count = 50

    const items = await API.search(q, count)
    const videos = await API.video(items.ids)

    expect(typeof videos.videos[25].viewCount).toBe("number")
  })
})
