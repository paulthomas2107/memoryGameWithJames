const pokeAPIBaseURL = 'https://pokeapi.co/api/v2/pokemon/';

const loadPokemom = async () => {
  const randomIds = new Set();

  while (randomIds.size < 8) {
    const randomNumber = Math.ceil(Math.random() * 150);
    randomIds.add(randomNumber);
  }

  console.log([...randomIds]);
  const randomIdsArr = [...randomIds]

  for (let index = 0; index < randomIdsArr.length; index++) {
    const res = await fetch(pokeAPIBaseURL + randomIdsArr[index]);
    const pokemon = await res.json();
    console.log(pokemon);
  }
};

loadPokemom();
