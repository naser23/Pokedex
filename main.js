"use strict";

// --- initial variables --- //
const allPokemon = document.querySelector(".all-pokemon");
const pokemonName = document.querySelector(".pokemon-name");
const pokeName = document.querySelector(".name");
const pokemonPicture = document.querySelector(".pokemon-picture");
const characteristics = document.querySelector(".characteristics");
const actualStats = document.querySelector(".actual-stats");

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
      createHtml(pokeData);
    });
}
fetchPokemonData();

function createHtml(pokedata) {
  pokemonListItem(pokedata);
}

// CREATING POKEMON ITEMS ON LEFT SIDE TO CLICK ON //
function pokemonListItem(pokeData) {
  let specificPokemon = document.createElement("div");
  specificPokemon.classList.add("choose-pokemon");
  specificPokemon.style.backgroundImage = `url(${pokeData.sprites.front_default})`;
  specificPokemon.style.backgroundPosition = "center";
  specificPokemon.style.backgroundRepeat = "no-repeat";
  specificPokemon.style.backgroundSize = "cover";
  specificPokemon.setAttribute("loading", "lazy");
  specificPokemon.onclick = () => displayAllInfo(pokeData);

  allPokemon.appendChild(specificPokemon);
  return specificPokemon;
}

function displayAllInfo(pokeData) {
  displayPokemonName(pokeData);
  displayPokemonPicture(pokeData);
  characteristicsLi(pokeData);
  statsLi(pokeData);
}

// displays pokemon name //
function displayPokemonName(pokeData) {
  pokeName.textContent = `${pokeData.name}`;
  console.log(pokeData.stats);
}

function displayPokemonPicture(pokeData) {
  pokemonPicture.style.backgroundImage = `url(${pokeData.sprites.front_default})`;
  pokemonPicture.style.backgroundPosition = "center";
  pokemonPicture.style.backgroundRepeat = "no-repeat";
  pokemonPicture.style.backgroundSize = "cover";
  console.log(pokeData);
}

// changes text content of each characteristic //
function characteristicsLi(pokeData) {
  let height = document.getElementById("height");
  let weight = document.getElementById("weight");
  let id = document.getElementById("id");
  let baseXp = document.getElementById("base-xp");

  height.textContent = `Height: ${pokeData.height}`;
  weight.textContent = `Weight: ${pokeData.weight}`;
  id.textContent = `Id: ${pokeData.id}`;
  baseXp.textContent = `Base-Experience: ${pokeData.base_experience}`;
}

// changes text content of each stat //
function statsLi(pokeData) {
  let hp = document.getElementById("hp");
  let attack = document.getElementById("attack");
  let defense = document.getElementById("defense");
  let specialAttack = document.getElementById("special-attack");
  let specialDefense = document.getElementById("special-defense");
  let speed = document.getElementById("speed");

  hp.textContent = `${pokeData.stats[0].stat.name}: ${pokeData.stats[0].base_stat}`;
  attack.textContent = `${pokeData.stats[1].stat.name}: ${pokeData.stats[1].base_stat}`;
  defense.textContent = `${pokeData.stats[2].stat.name}: ${pokeData.stats[2].base_stat}`;
  specialAttack.textContent = `${pokeData.stats[3].stat.name}: ${pokeData.stats[3].base_stat}`;
  specialDefense.textContent = `${pokeData.stats[4].stat.name}: ${pokeData.stats[4].base_stat}`;
  speed.textContent = `${pokeData.stats[5].stat.name}: ${pokeData.stats[5].base_stat}`;
}
