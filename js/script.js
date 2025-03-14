const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const cardName = document.querySelector('.card-name');
const cardNumber = document.querySelector('.card-number');
const cardType = document.querySelector('.card-type');
const cardAbilities = document.querySelector('.card-abilities');
const pokemonCard = document.querySelector('.pokemon-card');

let searchPokemon = 1;

const typeColors = {
  fire: "tipo-fire",
  water: "tipo-water",
  grass: "tipo-grass",
  electric: "tipo-electric",
  psychic: "tipo-psychic",
  ice: "tipo-ice",
  dragon: "tipo-dragon",
  dark: "tipo-dark",
  fairy: "tipo-fairy",
  normal: "tipo-normal",
  fighting: "tipo-fighting",
  flying: "tipo-flying",
  poison: "tipo-poison",
  ground: "tipo-ground",
  rock: "tipo-rock",
  bug: "tipo-bug",
  ghost: "tipo-ghost",
  steel: "tipo-steel"
};

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    const firstType = data.types[0].type.name; 
    const abilities = data.abilities.map(ability => ability.ability.name).join(', ');

    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;

    cardName.innerHTML = data.name;
    cardNumber.innerHTML = data.id;
    cardType.innerHTML = firstType;
    cardAbilities.innerHTML = abilities;

    pokemonCard.className = "pokemon-card " + (typeColors[firstType] || "tipo-normal");
    
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';

    cardName.innerHTML = "";
    cardNumber.innerHTML = "";
    cardType.innerHTML = "";
    cardAbilities.innerHTML = "";
    pokemonCard.className = "pokemon-card";
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
