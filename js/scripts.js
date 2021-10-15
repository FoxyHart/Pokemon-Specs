let pokemonRepository = (function() {
//added IIFE function
let pokemonList = [ 
    { name: "Chespin", type: [ 'Grass' ], height : "1", weight: "20" },
    { name: "Quilladin", type: ['Grass' ], height: "2", weight: "64" },
    { name: "Chesnaught", type: ['Grass' , 'Fighting'], height: "5", weight: "199"},
    { name: "Fennekin", type: ['Fire'], height: "1", weight: "20"},
    { name: "Braixen", type: ['Fire'], height: "3", weight: "32"},
    { name: "Delphox", type: ['Fire' , 'Psychic'], height: "5", weight: "86"},
    { name: "Froakie", type: ['Water'], height: "1", weight: "15"},
    { name: "Frogadier", type: ['Water'], height: "2", weight: "24"},
    { name: "Greninja", type: ['Water' , 'Dark'], height: "6", weight: "88"},
    { name: "Bunnelby", type: ['Normal'], height: "1", weight: "11"},
    { name: "Diggersby", type: ['Normal' , 'Ground'], height: "3", weight: "93"},
    { name: "Zigzagoon", type: ['Normal'], height: "1", weight: "39"},
    { name: "Linoone", type: ['Normal'], height: "1", weight: "72"}
];

//for adding to pokedex entry { name: '', type: ['' , ''], height: , weight: }, or { name: '', type: [''], height: , weight: }, 
function add(pokemon) {
    pokemonList.push(pokemon);
}
function getAll() {
    return pokemonList
}
// funtion to update 
function addListItem(pokemon) {
    let pokemonContainer = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name; 
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonContainer.appendChild(listPokemon);

    button.addEventListener('Here', function() {
        showDetails(pokemon)
    })
}

function showDetails(pokemon) {
    console.log(pokemon.name)
  }

return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
};
})();


pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});