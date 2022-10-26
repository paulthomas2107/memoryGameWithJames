const log = console.log;

const pokeAPIBaseURL = 'https://pokeapi.co/api/v2/pokemon/';
const game = document.getElementById('game')

const loadPokemom = async () => {
  const randomIds = new Set();

  while (randomIds.size < 8) {
    const randomNumber = Math.ceil(Math.random() * 150);
    randomIds.add(randomNumber);
  }

  const pokePromises = [...randomIds].map(id => fetch(pokeAPIBaseURL + id))
  const responses = await Promise.all(pokePromises)

  return await Promise.all(responses.map(res => res.json()))
};


const displayPokemon = (pokemon) => {
  pokemon.sort(_ => Math.random() - 0.5)
  const pokemonHTML = pokemon.map(pokemon => {
    return `
    <div class='card'>
      <h2>${pokemon.name}</h2>
    </div>
    `
  }).join('');

  game.innerHTML = pokemonHTML;

  

}

const resetGame = async () => {
  const pokemon = await loadPokemom()
  displayPokemon([...pokemon, ...pokemon])

}

resetGame();
