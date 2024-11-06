import axios from 'axios'; 
const API_KEY = "7adf03321631422faffd4edce1447956";
let create = document.getElementById('create-button'); 
create.addEventListener('click', createRecipe); 

export default function createRecipe() {
  const recipeDetailsDiv = document.getElementById("results");
  let form = document.getElementById('new-post-form');
  let searchBar = document.getElementById('search-form');
  const searchQuery = document.getElementById('search-form');

  form.reset(); 

  recipeDetailsDiv.style.display = "none";

  let createDiv = document.getElementById("recipeForm");

  createDiv.addEventListener('submit', handleSubmit); 

  createDiv.style.display = "flex"; 
  
  async function handleSubmit(e) {
      e.preventDefault(); 
      
      let title = document.getElementById('title').value;
      let ingredients = document.getElementById('ingredients').value; 
      let instructions = document.getElementById('instructions').value; 
      let readyMins = document.getElementById('readyInMinutes').value; 
      let servings = document.getElementById('servings').value; 
      let backgroundImg = document.getElementById('background').value; 
      let imageUrl = document.getElementById('image-url').value; 


      if (title && ingredients && instructions && readyMins && servings && backgroundImg && imageUrl) {
          try {
              let rawBody = new FormData ();
              rawBody.append("title", title);
              rawBody.append("ingredients", ingredients);
              rawBody.append("instructions", instructions);
              rawBody.append("readyInMinutes", readyMins);
              rawBody.append("mask", 'starMask');
              rawBody.append("author", 'user123');
              rawBody.append("servings", servings);
              rawBody.append("backgroundImg", backgroundImg);
              rawBody.append("fontColor", '#000');
              rawBody.append("imageUrl", imageUrl);
              rawBody.append("source", 'www.spoonacular.com');

              const response = await axios({
                  url: `https://api.spoonacular.com/recipes/visualizeRecipe?apiKey=${API_KEY}`,
                  method: 'POST', 
                  data: rawBody,
              }, {
                  headers: {
                           "content-type": "multipart/form-data"
                          }, 
              });

              const recipeData = await response.data;

              // I was trying to push them to the array to show all the cards
            //   recipeCards.push(recipeData); 

              let results = document.getElementById('results'); 
              let recipeCardItem = document.createElement('img'); 
              recipeCardItem.setAttribute('src', recipeData.url);

              recipeDetailsDiv.style.display = "flex";

              results.appendChild(recipeCardItem); 

              // I was adding the functionality to save all the recipeCards
            //   localStorage.setItem('recipes', recipeCards); 

              return recipeData;
      
          } catch (error) {
              console.error("Error fetching recipe details:", error.message);
          }
      } else {
          alert('Please fill out all of the input fields!'); 
      }
     
  }

  form.reset(); 
}