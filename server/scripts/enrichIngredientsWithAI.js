require("dotenv").config();

const OpenAI = require("openai");
const prisma = require("../prismaClient");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function enrichRecipe(recipe) {
  const ingredients = recipe.ingredients.map((i) => i.name);

  const prompt = `
Estimate realistic ingredient quantities for this recipe.

Recipe title: ${recipe.post.title}
Servings: ${recipe.servings || 4}

Ingredients:
${ingredients.map((name, index) => `${index + 1}. ${name}`).join("\n")}

Steps:
${recipe.steps.map((s) => `${s.order}. ${s.text}`).join("\n")}

Return only JSON:
{
  "ingredients": [
    { "name": "ingredient name", "quantity": 100, "unit": "g" }
  ]
}

Rules:
- Keep ingredient names exactly the same as provided.
- Use common cooking units: g, ml, tsp, tbsp, pcs, cups.
- Quantity must be a number.
- Estimate for the given servings.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a recipe data normalization assistant. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}

async function main() {
  const recipes = await prisma.recipe.findMany({
    include: {
      post: true,
      ingredients: true,
      steps: true,
    },
  });

  console.log(`Found ${recipes.length} recipes`);

  for (const recipe of recipes) {
    const needsUpdate = recipe.ingredients.some(
      (ingredient) => ingredient.quantity === null || !ingredient.unit
    );

    if (!needsUpdate) {
      console.log(`Skipped: ${recipe.post.title}`);
      continue;
    }

    console.log(`Enriching: ${recipe.post.title}`);

    const result = await enrichRecipe(recipe);

    for (const enriched of result.ingredients) {
      const original = recipe.ingredients.find(
        (ingredient) => ingredient.name === enriched.name
      );

      if (!original) continue;

      await prisma.ingredient.update({
        where: {
          id: original.id,
        },
        data: {
          quantity: Number(enriched.quantity),
          unit: enriched.unit,
        },
      });
    }

    console.log(`Updated: ${recipe.post.title}`);
  }

  console.log("Done! Ingredients enriched with AI estimates.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });