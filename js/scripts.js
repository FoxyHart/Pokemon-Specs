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
//document.write ("Chespin-" + " Type: Grass," + " Height: 1," + " Weight: 20");
//for adding to pokedex entry { name: '', type: ['' , ''], height: , weight: }, or { name: '', type: [''], height: , weight: }, 
function getAll() {
    return pokemonList;
};
function add(item) {
    return pokemonList.push(item);
};
 
return {
    getAll: getAll,
    add: add,
};
}());
// forEach function to write out pokemon type, height and weight, listing one pokemon as larger
 pokemonRepository.getAll().forEach(function(pokemon) {
    //varibles for pokemons names, height, weight and type
    let pokemonName = pokemon.name;
    let pokemonType = pokemon.type;
    let pokemonHeight = pokemon.height;
    let pokemonWeight = pokemon.weight;

   if (pokemonHeight >= 6) {
     document.write(
      '<p>' + 
      pokemonName +
      ' ' +
      '(Type: ' +
      pokemonType +
      ')' +
      '(Height: ' +
       pokemonHeight +
      ')' + 
      " Wow, that's HUGE" + 
      '(Weight: ' +
      pokemonWeight +
      ')' +
      '</p>'
      ); 
    } 
    else { 
    document.write( 
        '<p>' +
        pokemonName +
        ' ' + 
        '(Type: ' +
        pokemonType +
        ')' +
     '(Height: ' +
      pokemonHeight +
       ')' +
       '(Weight: ' +
      pokemonWeight +
      ')' +
       '</p>'
       );
    }
})

