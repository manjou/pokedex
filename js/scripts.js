// IIFE to create a pokemonRepository variable that is not global and can be accessed publicly
// with functions add, addv, getAll, and findByName
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon 
      ) {
      pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }


    function getAll() {
      return pokemonList;
    }

    function findByName(name) {
      let query = document.getElementById("searchBar").value.toLowerCase();
      let matchingPokemon = pokemonList.filter(function(pokemon) {
        return pokemon.name.toLowerCase() === name.toLowerCase();
      });
      return matchingPokemon;
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      addEventListenerButton(button, pokemon);
    }

    function addEventListenerButton(button, pokemon) {
      button.addEventListener("click", function() {
        loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
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
        item.types = details.types.map(function (type) {
          return type.type.name;
        });
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(pokemon) {
      // loadDetails(pokemon).then(function () {
        console.log(pokemon);
        const dialog = document.querySelector('dialog');
        dialog.showModal(pokemon);
    }

    function showModal(pokemon) {
      let modalContainer = document.querySelector('#modal-container');
      // Clear all existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerHTML = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.classList.add('pokemon_name');
      titleElement.innerText = pokemon.name;

      let imageElement = document.createElement('img');
      imageElement.classList.add('pokemon_image');
      imageElement.src = pokemon.imageUrl;
      imageElement.setAttribute('alt', 'Image of ' + pokemon.name);
      imageElement.setAttribute('height', '300px');
      imageElement.setAttribute('width', '300px');

      let heightElement = document.createElement('p');
      heightElement.classList.add('pokemon_height');
      heightElement.innerText = 'Height: ' + pokemon.height;

      let typesElement = document.createElement('p');
      typesElement.classList.add('pokemon_types');
      typesElement.innerText = 'Types: ' + pokemon.types;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      modal.appendChild(typesElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });



    return {
      add: add,
      getAll: getAll,   
      findByName: findByName,
      addListItem: addListItem,
      showDetails: showDetails,
      addEventListenerButton: addEventListenerButton,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
      hideModal: hideModal
    };
})();
// End of IIFE pokemonRepository

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

console.log(pokemonRepository.loadDetails());
console.log(pokemonRepository.showModal());



