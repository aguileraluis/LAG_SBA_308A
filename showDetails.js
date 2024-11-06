import closeRecipeDetails from "./close";
const API_KEY = "7adf03321631422faffd4edce1447956";

export async function showRecipeDetails(recipeId) {
  const recipeDetailsDiv = document.getElementById("recipe-details");
  const recipeContentDiv = document.getElementById("recipe-content");
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const recipeData = await response.json();

    let close = document.createElement("div");
    close.setAttribute("id", "statusBar");
    let span = document.createElement("span");
    let i = document.createElement("i");
    i.setAttribute("id", "close-button");
    i.addEventListener("click", closeRecipeDetails);
    i.classList.add("fas");
    i.classList.add("fa-window-close");

    span.appendChild(i);
    close.appendChild(span);
    recipeContentDiv.appendChild(close);

    let detailsDiv = document.createElement("div");
    detailsDiv.innerHTML = `
         
          <h2>${recipeData.title}</h2>
          <img src="${recipeData.image}" alt="${recipeData.title}">
          <p><strong>Ingredients:</strong> ${recipeData.extendedIngredients
            .map((ingredient) => ingredient.original)
            .join(", ")}</p>
          <p><strong>Instructions:</strong> ${recipeData.instructions}</p>
      `;

    recipeContentDiv.appendChild(detailsDiv);

    recipeDetailsDiv.style.display = "flex";
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}
