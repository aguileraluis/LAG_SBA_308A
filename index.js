const API_KEY = "7adf03321631422faffd4edce1447956";
import { showRecipeDetails } from "./showDetails";

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchRecipes);

let viewRecipeCards = document.getElementById("view-button");
viewRecipeCards.addEventListener("click", viewRecipes);

export async function searchRecipes() {
  const results = document.getElementById("results");
  results.style.display = "none" ? "flex" : "none";
  const form = document.getElementById("recipeForm");
  form.style.display = "none";
  let searchQuery = document.getElementById("query").value;
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}`
    );
    const data = await response.json();
    const recipeList = document.getElementById("results");
    recipeList.innerHTML = "";
    if (data.results.length === 0) {
      recipeList.innerHTML = "No recipes found.";
    } else {
      data.results.forEach((recipe) => {
        const recipeItem = document.createElement("div");
        recipeItem.className = "recipe-item";
        const recipeTitle = document.createElement("h3");
        recipeTitle.textContent = recipe.title;
        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;
        const recipeLink = document.createElement("a");
        recipeLink.href = "#";
        recipeLink.textContent = "View Recipe";
        recipeLink.onclick = async function () {
          await showRecipeDetails(recipe.id);
        };
        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeTitle);
        recipeItem.appendChild(recipeLink);
        recipeList.appendChild(recipeItem);
      });
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

export { searchButton, viewRecipeCards };

// I was trying to save the data in an array and then show it when the user clicks on the view Recipes but I ran out of requests to the API
// function viewRecipes() {
//     const recipeDetailsDiv = document.getElementById("cards");

//     let allRecipes = localStorage.getItem('recipes');
//     console.log(allRecipes);
//     // recipeCards.forEach((card) => {
//     //     console.log(card);
//     // })

//     recipeDetailsDiv.style.display = "flex";
// }
