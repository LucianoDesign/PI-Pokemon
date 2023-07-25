const { NUMBER } = require("sequelize");
const { Type } = require("../../src/db.js");

describe("Type model", () => {
  let type;

  beforeEach(() => {
    type = new Type({
      name: "Dark-matter",
    });
  });

  afterEach(async () => {
    await Type.destroy({ where: { name: type.name } });
  });

  it("should create a new Type", async () => {
    await type.save();
    expect(type).toBeDefined();
    expect(type.name).toBe("Dark-matter");
  });

  it("should not allow a Type with a number as name", async () => {
    try {
      const invalidType = new Type({
        name: NUMBER(4141),
      });

      await invalidType.save();
      throw new Error("It should not have saved, was expected to fail.");
    } catch (error) {
      expect(error.message).toContain(error.message);
    }
  });
});