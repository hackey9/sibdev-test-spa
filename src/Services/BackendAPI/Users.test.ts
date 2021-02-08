import fakeUsers from "Services/BackendAPI/fakeUsers"
import API from "Services/index"


describe("test users api", () => {

  it("should find user by token", async () => {
    const [id, username] = Object.entries(fakeUsers)[0]
    const token = `${id}___${username}___10923810293`

    const user = await API.backend.users.getByToken(token)

    expect([typeof id, typeof username]).toEqual(["string", "string"])
    expect(typeof user).toBe("object")
    expect(user.id).toBe(id)
    expect(user.username).toBe(username)
  })

  it("should throw because user not found", async () => {
    const token = "90as0df___not-exists___029834234"

    async function test() {
      await API.backend.users.getByToken(token)
    }

    await expect(test).rejects.toThrowError()
  })

})
