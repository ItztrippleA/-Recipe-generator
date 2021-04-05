import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js";
import "regenerator-runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  //Loading Recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderASpinner();

    //Loading Recipe
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    //Rendering recipe
  } catch (err) {
    alert(err);
  }
};

[`hashchange`, `load`].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
