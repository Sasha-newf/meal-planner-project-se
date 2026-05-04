const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");

async function getUserIdOrFallback(req) {
  let userId = null;
  if (req && req.user && req.user.userId) {
    userId = req.user.userId;
  }

  let user = null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  if (!user) {
    // Ensure the fallback user exists
    const hashedPassword = await bcrypt.hash("demo", 10);
    user = await prisma.user.upsert({
      where: { id: "demo-user" },
      update: {},
      create: {
        id: "demo-user",
        email: "demo@example.com",
        password: hashedPassword,
      },
    });
  }

  return user.id;
}

module.exports = {
  getUserIdOrFallback,
};