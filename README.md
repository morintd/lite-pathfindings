## lite-djikstra
Projet d'implementation de l'algorithme Djikstra

# Exemple d'utilisation
```javascript
var Djikstra = require('lite-djikstra');

// Structure contenant les arêtes, avec leurs poids
var EdgeMap = {
  a:{b:12, c:20, d:9},
  b:{a:12, g:13},
  c:{a:20, d:8, f:11, g:2},
  d:{a:9, c:8, f:21},
  e:{g:9, f:3},
  f:{c:11, d:21, e:3, g:5},
  g:{b:13, c:2, f:5, e:9}
};

let dist = [];
let vertexMap = [];

for(let vertex in EdgeMap) {
    vertexMap.push(vertex);
}

var sDeb = "a"; // Sommet de départ
var predecesseur = Djikstra.init(EdgeMap, sDeb);
var path = Djikstra.getPath(predecesseur, sDeb, "e"); // On cherche le chemin le plus court jusqu'à "e"

// On calcul le poid total du chemin
var weight = 0;
var vertex = undefined;

path.forEach(function(v) {
  if(vertex != undefined)
      weight += EdgeMap[vertex][v];

    vertex = v;
});

console.log(path);
console.log("(" + weight + ")");

```
On considère le graph suivant pour ces exemples :
![Image of used graph](/graph.png)