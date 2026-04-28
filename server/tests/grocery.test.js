const request = require("supertest");
const app = require("../index");

jest.mock("../prismaClient", () => ({
  mealPlanItem: {
    findMany: jest.fn(),
  },
}));

jest.mock("../services/userService", () => ({
  getUserIdOrFallback: jest.fn().mockResolvedValue("user_1"),
}));

const prisma = require("../prismaClient");

describe("GET /grocery - aggregation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("combines same ingredient from two recipes", async () => {
    prisma.mealPlanItem.findMany.mockResolvedValue([
      {
        recipe: {
          ingredients: [
            { name: "flour", quantity: 200, unit: "g" },
          ],
        },
      },
      {
        recipe: {
          ingredients: [
            { name: "flour", quantity: 100, unit: "g" },
          ],
        },
      },
    ]);

    const res = await request(app).get("/grocery");
    expect(res.statusCode).toBe(200);

    const flour = res.body.find((i) => i.name === "flour");
    expect(flour).toBeDefined();
    expect(flour.quantity).toBe(300);
    expect(flour.unit).toBe("g");
  });

  test("keeps different units separate", async () => {
    prisma.mealPlanItem.findMany.mockResolvedValue([
      {
        recipe: {
          ingredients: [
            { name: "milk", quantity: 200, unit: "ml" },
            { name: "milk", quantity: 1, unit: "cup" },
          ],
        },
      },
    ]);

    const res = await request(app).get("/grocery");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test("handles missing quantity gracefully", async () => {
    prisma.mealPlanItem.findMany.mockResolvedValue([
      {
        recipe: {
          ingredients: [
            { name: "salt", quantity: null, unit: null },
          ],
        },
      },
    ]);

    const res = await request(app).get("/grocery");
    expect(res.statusCode).toBe(200);

    const salt = res.body.find((i) => i.name === "salt");
    expect(salt).toBeDefined();
    expect(salt.quantity).toBe(0);
  });

  test("filters by date range", async () => {
    prisma.mealPlanItem.findMany.mockResolvedValue([]);

    const res = await request(app)
      .get("/grocery")
      .query({ from: "2026-04-01", to: "2026-04-30" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("returns empty list when no plan items", async () => {
    prisma.mealPlanItem.findMany.mockResolvedValue([]);

    const res = await request(app).get("/grocery");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});