"use strict";

// --- initial variables --- //
const allPokemon = document.querySelector(".all-pokemon");

// --- fetching data from the api --- //

// first fetch request is to get the data for the 151 pokemon //
function fetchPokemonData() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // gives us array of all pokemon with name and url //
    .then((response) => response.json()) // takes data and converts it to json text //
    .then(function (allPokemon) {
      // loops through original data and gives us data for each point in array(pokemon) //
      allPokemon.results.forEach(function (pokemon) {
        fetchPokeData(pokemon);
      });
    });
}

// second fetch request is to get the specific data for each pokemon //
function fetchPokeData(pokemon) {
  let url = pokemon.url;

  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      pokemonListItem(pokeData);
    });
}
fetchPokemonData();

function pokemonListItem(pokeData) {
  let specificPokemon = document.createElement("div");
  specificPokemon.classList.add("choose-pokemon");
  specificPokemon.style.backgroundImage = `url(${pokeData.sprites.front_default})`;
  specificPokemon.style.backgroundPosition = "center";
  specificPokemon.style.backgroundRepeat = "no-repeat";
  specificPokemon.style.backgroundSize = "cover";
  allPokemon.appendChild(specificPokemon);
  console.log(pokeData);

  return specificPokemon;
}
