"use strict";

// --- initial variables --- //
const allPokemon = document.querySelector(".all-pokemon");
const pokemonName = document.querySelector(".pokemon-name");
const pokeName = document.querySelector(".name");
const pokemonPicture = document.querySelector(".pokemon-picture");
const characteristics = document.querySelector(".characteristics");
const actualStats = document.querySelector(".actual-stats");
let pokemanPicture =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png";

async function fetchPokemonData() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => {
      return response.json();
    })
    .then(function (allPokemon) {
      return allPokemon;
    });
}

async function fetchPokeData(pokemon) {
  let url = pokemon.url;

  return fetch(url)
    .then((response) => response.json())
    .then(function (pokemon) {
      return pokemon;
    });
}

async function fillArray(data) {
  let pokemonArray = [];

  await Promise.all(
    data.results.map(async (pokemon) => {
      try {
        let insertedResponse = await fetchPokeData(pokemon);
        pokemonArray.push(insertedResponse);
      } catch {
        console.error("error" + error);
      }
    })
  );
  console.log("complete all");
  return pokemonArray;
}

function sortById(listOfPokemon) {
  return listOfPokemon.sort((a, b) => a.id - b.id);
}

async function startProgram() {
  let allPokemon = await fetchPokemonData();

  let listOfDetails = await fillArray(allPokemon);

  let sortedDetails = sortById(listOfDetails);

  createHtml(sortedDetails);
}
startProgram();

function createHtml(sortedDetails) {
  for (const data of sortedDetails) {
    pokemonListItem(data);
  }
}

function backgroundImage(pokeData) {
  let paddedNumber = pokeData.id.toString().padStart(3, 0);
  let background = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedNumber}.png`;
  return background;
}

function pokemonListItem(pokeData) {
  let specificPokemon = document.createElement("div");
  specificPokemon.classList.add("choose-pokemon");
  specificPokemon.style.backgroundImage = `url(${backgroundImage(pokeData)})`;
  specificPokemon.style.backgroundPosition = "center";
  specificPokemon.style.backgroundRepeat = "no-repeat";
  specificPokemon.style.backgroundSize = "cover";
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

function displayPokemonName(pokeData) {
  pokeName.textContent = `${pokeData.name}`;
}

function displayPokemonPicture(pokeData) {
  pokemonPicture.style.backgroundImage = `url(${backgroundImage(pokeData)})`;
  pokemonPicture.style.backgroundPosition = "center";
  pokemonPicture.style.backgroundRepeat = "no-repeat";
  pokemonPicture.style.backgroundSize = "cover";
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
