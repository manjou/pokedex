// Create pokemonList array

let pokemonList = [
  {index: 1, name: "Bulbasaur", type: ["GRASS", "POISON"], height: 0.7, total: 318}, 
  {index: 2, name: "Ivysaur", type: ["GRASS", "POISON"], height: 1, total: 405}, 
  {index: 3, name:"Venusaur", type: ["GRASS", "POISON"], height: 2, total: 525}, 
  {index: 4, name: "Charmander", type: ["GRASS", "POISON"], height: 0.6, total: 625}
];


// declaration of function printArrayDetails
function printArrayDetails(pokemon) {
    if (pokemon.height > 1) {
      document.write(pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big!" + "<br>");
    } else {
      document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br>");
    }
  }
  // forEach loop to print out the pokemonList array
  pokemonList.forEach(printArrayDetails);



