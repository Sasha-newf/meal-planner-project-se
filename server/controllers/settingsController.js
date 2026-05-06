const prisma = require("../prismaClient");

exports.getSettings = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: {
      email: true,
      nickname: true,
      avatarUrl: true,
      preferredUnits: true,
      preferredIngredients: true,
      avoidedIngredients: true,
    },
  });

  res.json(user);
};

exports.updateSettings = async (req, res) => {
  const {
    nickname,
    avatarUrl,
    preferredUnits,
    preferredIngredients,
    avoidedIngredients,
  } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.userId },
    data: {
      nickname,
      avatarUrl,
      preferredUnits,
      preferredIngredients,
      avoidedIngredients,
    },
    select: {
      email: true,
      nickname: true,
      avatarUrl: true,
      preferredUnits: true,
      avoidedIngredients: true,
      preferredIngredients: true,
    },
  });

  res.json(user);
};