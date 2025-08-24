import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  console.log("ENV VAR", process.env.HF_ACCESS_TOKEN ? "OK" : "MISSING");

  if (req.method !== 'POST') {
	return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
	const { ingredients } = req.body;

	const SYSTEM_PROMPT = `
	  You are an assistant that receives a list of ingredients a user has and suggests a recipe.
	  Do NOT include any internal thoughts.
	  Give a complete recipe with:
	  
	  - Ingredients list
	  - Step-by-step instructions
	`;

	const response = await hf.chatCompletion({
	  model: "HuggingFaceTB/SmolLM3-3B",
	  messages: [
		{ role: "system", content: SYSTEM_PROMPT },
		{ role: "user", content: `I have ${ingredients.join(", ")}. Give me only a recipe using these ingredients.` },
	  ],
	  max_tokens: 1024,
	});

	// Extraer solo el contenido final
	let recipe = response.choices[0]?.message?.content || "No recipe generated";

	// Opcional: eliminar cualquier resto de <think> que el modelo pudiera generar
	recipe = recipe.replace(/<think>.*?<\/think>/gs, '').trim();

	res.status(200).json({ recipe });
  } catch (err) {
	console.error(err);
	res.status(500).json({ error: 'Something went wrong' });
  }
}