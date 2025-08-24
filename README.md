# 🍳 AI Recipe Generator (Local Express Version)

This branch is a **local development version** of the AI-powered recipe generator using **Express** for the backend.  
It allows testing the AI recipe generation locally, without affecting the deployed version on Vercel.

---

## 📌 Features
- Add ingredients one by one.  
- Button to generate a recipe appears once **4 ingredients** are added.  
- AI suggests a recipe based on the provided ingredients.  
- Smooth scrolling to the recipe section.  
- Local Express server to handle API requests securely.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite  
- **Backend:** Express, Node.js  
- **Styling:** CSS  
- **AI Integration:** HuggingFace API  
- **Environment Variables:** `.env` (not included in GitHub)

---

## ⚙️ Setup & Installation

1. Clone the repo and switch to this branch:

```bash
git clone https://github.com/cmartinezBoada/RecipeGeneratorReact.git
cd RecipeGeneratorReact
git checkout RecipeGenerator-express-local

## Setup & Run Locally

npm install

Create a `.env` file in the root directory with your HuggingFace API key:

HF_ACCESS_TOKEN=your_huggingface_api_key_here

⚠️ Important: Do not commit your `.env` file to GitHub.
You can include a `.env.example` file with the variable name as a placeholder.

Start the local server:

node server.js

Start the frontend:

npm run dev

Open your browser at http://localhost:5173 (or the port Vite shows) and test the recipe generator locally.
