# 🍳 AI Recipe Generator

This project is a simple **AI-powered recipe generator** where users can enter ingredients and receive a recipe suggestion.  
It is built with **React**, deployed on **Vercel**, and integrates with an AI API to generate cooking ideas.

---

## 🚀 Live Demo
👉 [View on Vercel](https://recipe-generator-react-nu.vercel.app))  

---

## 📌 Features
- Add ingredients one by one.  
- Button to generate a recipe appears once **4 ingredients** are added.  
- AI suggests a recipe based on the provided ingredients.  
- Smooth scrolling to the recipe section.  
- Fully deployed on **Vercel** with GitHub integration.  

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite  
- **Styling:** CSS  
- **Deployment:** Vercel (CI/CD from GitHub)  
- **AI Integration:** API call (HuggingFace AI model)  

---

## ⚙️ Setup & Installation

1. Clone the repo:
   ```bash
   git clone [https://github.com/cmartinezBoada/RecipeGeneratorReact.git]
   cd recipe-generator

This project uses an API key stored in a `.env` file.  
Since the key is private, local testing is not available by default.  

If you want to run it locally, you would need to:  
1. Create a `.env` file in the root directory.  
2. Add your own API key, for example:  

VITE_API_KEY=your_api_key_here

3. Run the development server:  

```bash
npm install
npm run dev
