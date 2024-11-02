document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipeForm");
    const recipesContainer = document.getElementById("recipesContainer");
    const message = document.getElementById("message");
    const recipes = []; // Array to store recipes
  
    // Display all recipes on page load
    displayAllRecipes();
  
    // Handle recipe form submission
    recipeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const recipeName = document.getElementById("recipeName").value.trim();
      const description = document.getElementById("description").value.trim();
      const imageUpload = document.getElementById("imageUpload").files[0];
  
      // Input validation
      if (!recipeName || !description || !imageUpload) {
        displayMessage("All fields are required.", "error");
        return;
      }
  
      // Create recipe object and add to array
      const recipe = { name: recipeName, description, imageFile: imageUpload };
      recipes.push(recipe);
      
      addRecipe(recipe);
      displayMessage("Recipe added successfully!", "success");
  
      // Clear form inputs
      recipeForm.reset();
    });
  
    // Function to display all recipes from the array
    function displayAllRecipes() {
      recipesContainer.innerHTML = ""; // Clear existing recipes on display
      recipes.forEach((recipe) => addRecipe(recipe));
    }
  
    // Function to add a recipe card
    function addRecipe(recipe) {
      const reader = new FileReader();
      reader.onload = () => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
  
        recipeCard.innerHTML = `
          <h3>${recipe.name}</h3>
          <p>${recipe.description}</p>
          <img src="${reader.result}" alt="${recipe.name}">
          <button class="delete-btn">Delete Recipe</button>
        `;
  
        recipeCard.querySelector(".delete-btn").addEventListener("click", () => {
          const index = recipes.indexOf(recipe);
          if (index > -1) {
            recipes.splice(index, 1); // Remove recipe from array
          }
          recipeCard.remove();
          displayMessage("Recipe deleted successfully!", "success");
        });
  
        recipesContainer.appendChild(recipeCard);
      };
      reader.readAsDataURL(recipe.imageFile);
    }
  
    // Function to display messages
    function displayMessage(msg, type) {
      message.textContent = msg;
      message.className = type;
  
      switch (type) {
        case "success":
          message.style.color = "green";
          break;
        case "error":
          message.style.color = "red";
          break;
        default:
          message.style.color = "black";
          break;
      }
    }
  
    // Add "Clear All Recipes" button
    const clearAllBtn = document.createElement("button");
    clearAllBtn.textContent = "Clear All Recipes";
    clearAllBtn.addEventListener("click", () => {
      recipes.length = 0; // Clear all recipes from the array
      recipesContainer.innerHTML = ""; // Clear display
      displayMessage("All recipes have been cleared!", "success");
    });
    document.body.appendChild(clearAllBtn);
  });