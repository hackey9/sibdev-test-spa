import API from "Services/index"


describe("test /search", () => {

  it("request 50 items", async () => {
    const count = 50
    const q = "чем кормить кота"

    const items = await API.youtube.search(q, count)

    expect(typeof items.count).toBe("number")
  }, 3000)

  it("request 100k items", async () => {
    const count = 100000
    const q = "чем кормить кота"

    const promise = API.youtube.search(q, count)

    await expect(promise).rejects.toThrowError()

  }, 3000)

  it("request 1 item", async () => {
    const count = 1
    const q = "чем кормить кота"

    const items = await API.youtube.search(q, count)

    expect(items.count).toBe(count)
  }, 3000)

  it("request 0", async () => {
    const count = 0
    const q = "чем кормить кота"

    const items = await API.youtube.search(q, count)

    expect(items.count).toBe(0)
  }, 100)

  it("request empty string", async () => {
    const count = 25
    const q = String()

    await expect(API.youtube.search(q, count)).rejects.toThrowError()
  })

})

describe("test /search+videos", () => {

  it("get 50 videos", async () => {
    const q = "чем кормить кота"
    const count = 50

    const items = await API.youtube.search(q, count)
    const videos = await API.youtube.video(items.ids)

    expect(typeof videos.videos[25].viewCount).toBe("number")
  })

  it("find with order by view count", async () => {
    const q = "чем кормить кота"
    const count = 50
    const order = "viewCount"

    const items = await API.youtube.search(q, count, order)
    const videos = await API.youtube.video(items.ids)

    expect(videos.count).toBe(50)
    expect(videos.videos[0].viewCount).toBeGreaterThanOrEqual(videos.videos[1].viewCount)
    expect(videos.videos[20].viewCount).toBeGreaterThanOrEqual(videos.videos[30].viewCount)
  })
})
