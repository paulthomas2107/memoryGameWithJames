const log = console.log;

const pokeAPIBaseURL = 'https://pokeapi.co/api/v2/pokemon/';
const game = document.getElementById('game');

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const loadPokemom = async () => {
  const randomIds = new Set();

  while (randomIds.size < 8) {
    const randomNumber = Math.ceil(Math.random() * 150);
    randomIds.add(randomNumber);
  }

  const pokePromises = [...randomIds].map((id) => fetch(pokeAPIBaseURL + id));
  const responses = await Promise.all(pokePromises);

  return await Promise.all(responses.map((res) => res.json()));
};

const displayPokemon = (pokemon) => {
  pokemon.sort((_) => Math.random() - 0.5);
  const pokemonHTML = pokemon
    .map((pokemon) => {
      const type = pokemon.types[0]?.type?.name || 'normal';
      const color = colors[type];
      return `
    <div class='card' style='background-color: ${color};' onclick='clickCard(event)' data-pokename='${pokemon.name}'>
      <div class='front'>
      </div>
      <div class='back rotated' style='background-color: ${color};'>
         <img src='${pokemon.sprites.front_default}' alt='${pokemon.name}'>
         <h2>${pokemon.name}</h2>
      </div>
    </div>
    `;
    })
    .join('');

  game.innerHTML = pokemonHTML;
};

const clickCard = (event) => {
  const pokemonCard = event.currentTarget;



}

const getFrontAndBackFromCard = (card) => {
  const front = card.querySelector(".front");
  const back = card.querySelector(".back");
  return [front, back]
}

const rotateElements = (elements) => {
  if(typeof elements !== 'object' || !elements.length) return;
  elements.forEach(element => element.classList.toggle('rotated'));
}


const resetGame = async () => {
  const pokemon = await loadPokemom();
  displayPokemon([...pokemon, ...pokemon]);
};

resetGame();
