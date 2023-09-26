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

  //   function addv(pokemon) {
  //     if (typeof pokemon === "object" && pokemon !== null) {
  //       const keys = Object.keys(pokemon);
  //       const requiredKeys = ["name", "type", "height", "total"];
  //       if (keys.length === requiredKeys.length && requiredKeys.every(key => keys.includes(key))) {
  //       pokemonList.push(pokemon);
  //     } else {
  //       console.log("Error: invalid data type for Pokemon object.");
  //     }
  //   }
  // }

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
        showDetails(pokemon);
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
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
        const dialog = document.querySelector('dialog');
        dialog.showModal();
      });
    }


    return {
      add: add,
      // addv: addv,
      getAll: getAll,   
      findByName: findByName,
      addListItem: addListItem,
      showDetails: showDetails,
      addEventListenerButton: addEventListenerButton,
      loadList: loadList,
      loadDetails: loadDetails
    };
})();
// End of IIFE pokemonRepository

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



