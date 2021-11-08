let pokemonRepository = (function() {
//added IIFE function

let modalContainer = document.querySelector('#modal-container');
//function for modal to pop up when a pokemon is selected
function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

// header for name
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
//
    let typeElement = document.createElement('p');
    typeElement.innerText = 'Type: '  + pokemon.types[0].type.name;
 
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    let imgElement = document.createElement('img')
    imgElement.src = pokemon.imageUrl

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(typeElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(imgElement);

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
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
// API for Pokemon and their stats

function add(pokemon) {
        pokemonList.push(pokemon);
}
function getAll() {
    return pokemonList;
}
// function to update 
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
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(item) {
    loadDetails(item).then(function () {
        console.log(item);
      });
  }
function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
}
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});