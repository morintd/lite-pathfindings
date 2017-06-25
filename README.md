# LITE-DJIKSTRA
### Implementation of the Djikstra algorithm

Djikstra is a well-know algorithm aiming to find the shortest path beetween a given edge and every other edges, it works with ponderated graph, oriented and not oriented.
Djikstra doesn't work with negative weight.

#### HOW TO USE
```javascript
var Djikstra = require('lite-djikstra');

// Structure which contains edge and weight
var edgeMap = {
  a:{b:12, c:20, d:9},
  b:{a:12, g:13},
  c:{a:20, d:8, f:11, g:2},
  d:{a:9, c:8, f:21},
  e:{g:9, f:3},
  f:{c:11, d:21, e:3, g:5},
  g:{b:13, c:2, f:5, e:9}
};

var sDeb = "a"; // Start edge
var predecessor = Djikstra.init(edgeMap, sDeb);
var path = Djikstra.getPath(predecessor, sDeb, "e"); // We're looking for the shorter path to e
var weight = Djikstra.getWeight(path, edgeMap); // Finding for total weight

console.log(path);
console.log("(" + weight + ")");

```
Returns :

```javascript
[ 'a', 'd', 'c', 'g', 'f', 'e' ]
(27)
```

This example is using the following graph :
![Image of used graph](/graph.png)
