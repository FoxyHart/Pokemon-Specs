let pokemonRepository = (function() {
//added IIFE function

//function for modal to pop up when a pokemon is selected
function showModal(pokemon) {

let modalTitle = document.querySelector(".modal-header");
let modalBody = document.querySelector(".modal-body");
// clearing modal of content
modalTitle.innerHTML = '';
modalBody.innerHTML = '';
// header for name for modal
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    titleElement.style.textTransform = 'capitalize';
// creating type element for modal
    let typeElement = document.createElement('p');
    typeElement.innerText = pokemon.types[0].type.name;
    typeElement.style.textTransform = 'capitalize';
 // creating height element for modal
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;
// creating weight element for modal
    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;
// creating img element for modal
    let imgElement = document.createElement('img')
    imgElement.src = pokemon.imageUrl
// creating shiny img element for modal
    let imgElementShiny = document.createElement('img')    
    imgElementShiny.src = pokemon.imageUrlShiny
// adding modal

    modalTitle.appendChild(titleElement);
    modalBody.appendChild(typeElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(imgElement);
    modalBody.appendChild(imgElementShiny);
}
//end of modal

// empty array for pokemon 
let pokemonList = [];
// API for Pokemon and their stats
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// adds pokemon to empty array
function add(pokemon) {
        pokemonList.push(pokemon);
}
// returns the pokemon list array
function getAll() {
    return pokemonList;
}
// function for displaying pokemon as buttons
function addListItem(pokemon) {
    let pokemonContainer = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name; 
    button.classList.add('button-class');
    listPokemon.classList.add('group-list-item');
    listPokemon.appendChild(button);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    pokemonContainer.appendChild(listPokemon);
    button.addEventListener('click', function() {
        showDetails(pokemon)
    });
}
// function for loading the pokemon list from API
 function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  //function to retreive details about each pokemon to display
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.imageUrlShiny = details.sprites.front_shiny;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
     // item.imgOfficial = details.sprites.other.official-artwork.front_default;
    }).catch(function (e) {
      console.error(e);
    });
  } 
  // search bar function
  function searchPokemon() {
    let input = document.getElementById('searchbar').value
    input= input.toLowerCase();
    let list = document.getElementsByClassName('list-pokemon');
      
    for (i = 0; i < x.length; i++) { 
        if (!list[i].innerHTML.toLowerCase().includes(input)) {
            list[i].style.display="No pokemon found";
        }
        else {
            list[i].style.display="list-item";                 
        }
    }
}
  // to show pokemon in modal and console log
function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
}

// returns all functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
// outside of IIFE showing all contents of IIFE
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});