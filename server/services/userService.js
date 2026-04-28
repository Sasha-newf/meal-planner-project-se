const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");

async function getUserIdOrFallback(req) {
  if (req && req.user && req.user.userId) {
    return req.user.userId;
  }

  let firstUser = await prisma.user.findFirst();

  if (!firstUser) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    firstUser = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: hashedPassword,
      },
    });
  }

  return firstUser.id;
}

module.exports = {
  getUserIdOrFallback,
};