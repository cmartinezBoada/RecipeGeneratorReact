import React from "react"
import ReactMarkdown from "react-markdown"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getRecipeFromMistral} from "../ai" // You're importing a named export, not a default export, that's why {}

export default function MainElement() {
	const [ingredients, setIngredients] = React.useState([]);
	
	const [recipe, setRecipe] = React.useState("") //Use state to keep the recipe saved
	const recipeSection = React.useRef("this is a string")
	//Create a useEffect to scroll when a new recipe appears and there is a recipeSection
	React.useEffect(() => {
		if (recipe !== "" && recipeSection.current !== null) {
			//recipeSection.current.scrollIntoView()
			const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
			window.scroll({
				top: yCoord,
				behavior: "smooth"
			})
		}
	}, [recipe])
	function addIngredient(formData) {
		const newIngredient = formData.get("ingredient")
		setIngredients(prevIngredients => [...prevIngredients, newIngredient])	 
	}

	async function getRecipe(){      //We use async because it is a promise
	
			const result = await getRecipeFromMistral(ingredients)
			setRecipe(result)
		
	}

	return (
		<main>
			<form action={addIngredient} className="add-ingredient-form">
				<input
					type="text"
					placeholder="e.g. oregano"
					aria-label="Add ingredient"
					name="ingredient"
				/>
				<button>Add ingredient</button>
			</form>
			{ingredients.length > 0 && (
				<IngredientsList   //We create the property ref to access later to it. When it is called in a custom component it is not the react ref, we are overwritten it. 
				ref={recipeSection} 
				ingredients={ingredients} 
				getRecipe={getRecipe}
				/>
			)}
			{recipe && <ClaudeRecipe recipe={recipe} />}
		</main>
	);
}
