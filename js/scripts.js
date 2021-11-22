let pokemonRepository = (function() {
//added IIFE function

let modalContainer = document.querySelector('#modal-container');
//function for modal to pop up when a pokemon is selected
function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
//creating button for modal closing
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

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
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(typeElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(imgElement);
    modal.appendChild(imgElementShiny);

    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
}
//function for modal removal
function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}
//hide modal by ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});
// hide modal when clicked away from 
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
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
    listPokemon.appendChild(button);
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

/* * This code lines implies: a function to add a specific color to each pokemon
  button, after checking the type of the pokemon.
  For 18 different pokemon types add 18 different color to the pokemon button 
  function addColor(pokemon, button) {
    let url = pokemon.detailsUrl;
    return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      let type = details.types[0].type.name;

      //call the class based on the pokemon type
      button.addClass(type + '-pokemon');
    })
    .catch(function (e) {
      console.error(e);
    });

    START: Pokemon button style based on their types*/
/* bug pokemon 
.bug-pokemon {
  border: 4px solid #43aa8b;
  transition-duration: 0.6s;
}
.bug-pokemon:hover {
  background-color: #43aa8b;
  color: white;
  transition-duration: 0.6s;
}
/* DARK pokemon 
.dark-pokemon {
  border: 4px solid #3d405b;
  transition-duration: 0.6s;
}
/* This code lines implies: an individual color styling and behavior of coler
changing by hover over each single pokemon information button 
.pokemon-color-type {
  border: 4px solid #ffca3a;
}
.pokemon-color-type:hover {
  background-color: #ffca3a;
  color: black;
}
.nav-item {
  float: right;
}
  }*/