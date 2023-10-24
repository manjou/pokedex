// IIFE to create a pokemonRepository variable that is not global and can be accessed publicly
// with functions add, addv, getAll, and findByName
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  
  
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

// Function declaration for getAll 
    function getAll() {
      return pokemonList;
    }

// Function declaration for loadDetails
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities.map(function (ability) {
          return ability.ability.name;
        }).join(', ');
        item.buttonImage = details.sprites.front_default;
        item.types = details.types.map(function (type) {
          return type.type.name;
        }).join(', ');
      }).catch(function (e) {
        console.error(e);
      });
    }

// Function declaration for addListItem
// Creating a list of pokemon    
    function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      let pokemonImage = document.createElement("img");
      pokemonImage.classList.add("button_pokemon_image");
      button.classList.add("button-class", "btn", "btn-primary");
      button.setAttribute("data-target", "#exampleModal");
      button.setAttribute("data-toggle", "modal");
      button.setAttribute("type", "button");
      // fetch the pokemon detail and get the image url
      fetch(pokemon.detailsUrl)
        .then((response) => response.json())
        .then((data) => {
          button.innerHTML = `<span>${pokemon.name}</span><img src="${data.sprites.front_shiny}"/>`;
        })
        .catch((err) => console.log("Err: ", err));

      listpokemon.appendChild(button);
      button.appendChild(pokemonImage);
      // pokemonImage.setAttribute("src", pokemon.buttonImage);
      pokemonImage.setAttribute("alt", "Image of " + pokemon.name);
      pokemonList.appendChild(listpokemon);
      addEventListenerButton(button, pokemon);
    }

  // Function declaration for addEventListenerButton
  // Adding an event listener to the button that opens the modal
    function addEventListenerButton(button, pokemon) {
      button.addEventListener("click", function() {
        loadDetails(pokemon)
        .then(function() {
        showModal(pokemon);
        });
      });
    }



// Function declaration for loadList    
// getting data from the API
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


// Declaration of showDetails Function
    function showDetails(pokemon) {
      // loadDetails(pokemon).then(function () {
        console.log(pokemon);
        const dialog = document.querySelector('dialog');
        dialog.showModal(pokemon);
    }

// Declaration of showModal Function
// Bootstrap modal
function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");

  // clear existing content of the modal
  modalTitle.empty();
  modalBody.empty();

  //creating element for name in modal content
  let nameElement = $("<h1>" + pokemon.name + "</h1>");
  // creating img in modal content
  let imageElement = $('<img class="modal-img mx-auto d-block" style="height:400px" "width:400px">');
  imageElement.attr("src", pokemon.imageUrl);
  // creating element for height in modal container
  let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
  // creating element for weight in modal container
  let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
  // creating element for type in modal container
  let typesElement = $("<p>" + "types : " + pokemon.types + " " + "</p>");
  // creating element for abilities in modal container
  let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + " " + "</p>")

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);
  modalBody.append(abilitiesElement);
};



// implementing Search Functionality
// Function declaration for findByName
    document.getElementById("searchBar").addEventListener("input", function() {

      let = query = this.value.toLowerCase();
      // clear the current list
      let pokemonListElement = document.querySelector(".pokemon-list");
      pokemonListElement.innerHTML = "";

      // if the query is empty, show all pokemon
      if(query==""){
        pokemonRepository.getAll().forEach(function(pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      }
      else {
      let matchingPokemon = pokemonRepository.findByName(query);
      matchingPokemon.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    }
  });

  function findByName(name) {
    let matchingPokemon = pokemonList.filter(function(pokemon) {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });
    return matchingPokemon;
  }


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
      // hideModal: hideModal
    };
})();
// End of IIFE pokemonRepository

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});





