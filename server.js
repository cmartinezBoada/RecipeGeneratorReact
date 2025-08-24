import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { HfInference } from "@huggingface/inference";
import 'dotenv/config';
console.log("HF_ACCESS_TOKEN:", process.env.HF_ACCESS_TOKEN); // para verificar

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/getRecipe", async (req, res) => {
  const { ingredients } = req.body;
  try {
    const SYSTEM_PROMPT = `
      You are an assistant that receives a list of ingredients a user has and suggests a recipe.
    `;

    const response = await hf.chatCompletion({
      model: "HuggingFaceTB/SmolLM3-3B",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredients.join(", ")}. Please give me a recipe.` },
      ],
      max_tokens: 5000,
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
