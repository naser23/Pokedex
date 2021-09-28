"use strict";

// --- initial variables --- //
const allPokemon = document.querySelector(".all-pokemon");

// --- fetching data from the api --- //
const apiURL = "https://pokeapi.co/api/v2/";

const testPokemon = {
  url: "https://pokeapi.co/api/v2/",
  type: "pokemon",
  id: "1",
};

const { url, type, id } = testPokemon;
const testURL = `${url}${type}/${id}`;
console.log(testURL);

fetch(testURL)
  .then((data) => data.json())
  .then((pokemon) => pokemonListItem(pokemon));

for (const key in data) {
  console.log(`${key}`);
}

function pokemonListItem(data) {
  let specificPokemon = document.createElement("div");
  specificPokemon.classList.add("choose-pokemon");
  specificPokemon.style.backgroundImage = `url(${data.sprites.front_default})`;
  specificPokemon.style.backgroundPosition = "center";
  specificPokemon.style.backgroundRepeat = "no-repeat";
  specificPokemon.style.backgroundSize = "cover";
  allPokemon.appendChild(specificPokemon);
  console.log(specificPokemon, data);
  return specificPokemon;
}
