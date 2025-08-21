// api/getRecipe.js
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
	You are an assistant that receives a list of ingredients that a user has and suggests a recipe.
	`;

	const response = await hf.chatCompletion({
	  model: "HuggingFaceTB/SmolLM3-3B",
	  messages: [
		{ role: "system", content: SYSTEM_PROMPT },
		{ role: "user", content: `I have ${ingredients.join(", ")}. Please give me a recipe.` },
	  ],
	  max_tokens: 512,
	});

	res.status(200).json({ recipe: response.choices[0].message.content });
  } catch (err) {
	console.error(err);
	res.status(500).json({ error: 'Something went wrong' });
  }
}
