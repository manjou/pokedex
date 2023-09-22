// IIFE to create a pokemonRepository variable that is not global and can be accessed publicly
// with functions add, addv, getAll, and findByName
let pokemonRepository = (function () {
  let pokemonList = [
    {name: "Bulbasaur", type: ["GRASS", "POISON"], height: 0.7, total: 318}, 
    {name: "Ivysaur", type: ["GRASS", "POISON"], height: 1, total: 405}, 
    {name:"Venusaur", type: ["GRASS", "POISON"], height: 2, total: 525}, 
    {name: "Charmander", type: ["GRASS", "POISON"], height: 0.6, total: 625}
  ];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function addv(pokemon) {
      if (typeof pokemon === "object" && pokemon !== null) {
        const keys = Object.keys(pokemon);
        const requiredKeys = ["name", "type", "height", "total"];
        if (keys.length === requiredKeys.length && requiredKeys.every(key => keys.includes(key))) {
        pokemonList.push(pokemon);
      } else {
        console.log("Error: invalid data type for Pokemon object.");
      }
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
      // button.addEventListener("click", function() {
      //   showDetails(pokemon);
      // });
      addEventListenerButton(button, pokemon);
    }

    function addEventListenerButton(button, pokemon) {
      button.addEventListener("click", function() {
        showDetails(pokemon);
      });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
      add: add,
      addv: addv,
      getAll: getAll,
      findByName: findByName,
      addListItem: addListItem,
      showDetails: showDetails,
      addEventListenerButton: addEventListenerButton
    };
  
})();
// End of IIFE pokemonRepository

// forEach loop to print out the pokemonList array
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });



