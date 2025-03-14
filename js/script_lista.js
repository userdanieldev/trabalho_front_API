document.addEventListener("DOMContentLoaded", function () {
  const pokemonListElement = document.querySelector(".pokemon-list");
  let currentPage = 1;
  const pokemonsPerPage = 12;

  async function fetchPokemonList(page) {
      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${(page - 1) * pokemonsPerPage}`);
          const data = await response.json();

          const pokemonList = data.results;
          pokemonListElement.innerHTML = pokemonList
              .map(pokemon => `
                  <div class="pokemon-card">
                      <h2>${pokemon.name}</h2>
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}" />
                  </div>
              `)
              .join('');
      } catch (error) {
          console.error("Erro ao carregar a lista de Pokémons:", error);
      }
  }

  fetchPokemonList(currentPage);

  const buttonPrev = document.querySelector(".button-prev");
  const buttonNext = document.querySelector(".button-next");

  buttonPrev.addEventListener("click", () => {
      if (currentPage > 1) {
          currentPage--;
          fetchPokemonList(currentPage);
      }
  });

  buttonNext.addEventListener("click", () => {
      currentPage++;
      fetchPokemonList(currentPage);
  });
});
