export async function getRecipeFromServer(ingredients) {
  const res = await fetch("http://localhost:3000/api/getRecipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });

  const data = await res.json();
  let recipe = data.recipe;

  // Remove everything inside <think>...</think>
  recipe = recipe.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  return recipe;
}
