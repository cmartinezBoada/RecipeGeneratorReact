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
	  You are a helpful cooking assistant. 
	  Your task is to provide **only a recipe** using the ingredients provided. 
	  Do NOT include reasoning, internal thoughts, options, or explanations. 
	  Return the recipe as plain text ready to show to the user.
	`;

	const response = await hf.chatCompletion({
	  model: "HuggingFaceTB/SmolLM3-3B",
	  messages: [
		{ role: "system", content: SYSTEM_PROMPT },
		{ role: "user", content: `I have ${ingredients.join(", ")}. Give me only a recipe using these ingredients.` },
	  ],
	  max_tokens: 512,
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