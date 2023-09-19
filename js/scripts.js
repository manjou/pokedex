// Used to store the pokemonList array

let pokemonList = [];
pokemonList = [
  {index: 1, name: "Bulbasaur", type: ["GRASS", "POISON"], height: 0.7, total: 318}, 
  {index: 2, name: "Ivysaur", type: ["GRASS", "POISON"], height: 1, total: 405}, 
  {index: 3, name:"Venusaur", type: ["GRASS", "POISON"], height: 2, total: 525}, 
  {index: 4, name: "Charmander", type: ["GRASS", "POISON"], height: 0.6, total: 625}
];

// for loop to iterate over the pokemonList array and print the name and height of each pokemon. 
// it also checks if the pokemon is over 1m.


// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 1) {
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
//   }else {
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>");
//   }
// }


// declaration of function printArrayDetails
function printArrayDetails(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].height > 1) {
      document.write(list[i].name + " (height: " + list[i].height + ") - Wow, that's big!" + "<br>");
    }else {
      document.write(list[i].name + " (height: " + list[i].height + ")" + "<br>");
    }
  }
}



