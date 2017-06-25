# LITE-PATHFINDINGS
### Implementation of pathfinding algorithms
##### Djikstra
Djikstra is a well-know algorithm aiming to find the shortest path beetween a given edge and every other edges, it works with ponderated graph, oriented and not oriented.
Djikstra doesn't work with negative weight.
##### Floyd-Warshall
Floyd-Warshall is an algorithm aiming to find the shortest path beetween every pair of edge, it works with ponderated graph, orented and not oriented.
It works thanks to a matrix which represent every vertex (and weight) of a graph.
Floyd-Warhsall works with negative weight.

### HOW TO USE
#### Djikstra

```javascript
var litepathfindings = require('lite-pathfindings');
var Djikstra = litepathfindings.Djikstra;
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
var path = Djikstra.getPath(predecessor, sDeb, "e"); // We're looking for the shortest path to e
var weight = Djikstra.getWeight(path, edgeMap); // Find total weight

console.log(path);
console.log("(" + weight + ")");

```
Returns :

```javascript
[ 'a', 'd', 'c', 'g', 'f', 'e' ]
(27)
```

#### Floyd-Warshall
###### As Floyd-Warshall use a matrix, finding weight and path is done with number
```javascript
var litepathfindings = require('lite-pathfindings');
var FloydWarshall = litepathfindings.FloydWarshall;

// Matrix which contains edge and weight
var matrixEdges = [ [ 0, 12, 17, 9, 27, 24, 19 ],
  [ 12, 0, 15, 21, 21, 18, 13 ],
  [ 17, 15, 0, 8, 10, 7, 2 ],
  [ 9, 21, 8, 0, 18, 15, 10 ],
  [ 27, 21, 10, 18, 0, 3, 8 ],
  [ 24, 18, 7, 15, 3, 0, 5 ],
  [ 19, 13, 2, 10, 8, 5, 0 ] ];

var matrix = matrixEdges.matrix;
var next = FloydWarshall.init(matrix);
var path = FloydWarshall.getPath(0, 4, next);
var weight = FloydWarshall.getWeight(0, 4, matrix);

console.log(path);
console.log("(" + weight + ")");

```
Returns :

```javascript
[ 0, 3, 2, 6, 5, 4 ]
(27)
```

#### Helpers
###### As i'd rather work with name (a, b, c, d, e, ...), an utility library is added with methods :
* edgeMapToMatrix(edgeMap) : given an edgeMap, return the corresponding matrix, and an "edges" object which link edge name to number : {matrix, edges}.
* getEdgeNumber(edges, edgeName) : given a list of edges and a name, return the corresponding edge number
* getEdgeName(edges, number) : given a list of edges and a number, return the corresponding edge name
* getNamedPath(path, edges) : given a list of number representing a path, and the correspondance beetween number and edge name, return the corresponding list of edge name

As an example, edgeMapToMatrix and getNamedPath can be used to work with edgeMap and Floyd-Warshall :
```javascript
var litepathfindings = require('lite-pathfindings');
var FloydWarshall = litepathfindings.FloydWarshall;
var Helpers = litepathfindings.Helpers;

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

var matrixEdges = Helpers.edgeMapToMatrix(edgeMap);
var matrix = matrixEdges.matrix;
var edges = matrixEdges.edges;
var next = FloydWarshall.init(matrix);
var path = FloydWarshall.getPath(0, 4, next);
var weight = FloydWarshall.getWeight(0, 4, matrix);

console.log(matrix);
console.log(edges);
console.log(path);
console.log(weight);
console.log(Helpers.getNamedPath(path, edges));
```
Returns :

```javascript
[[ 0, 12, 17, 9, 27, 24, 19 ],
[ 12, 0, 15, 21, 21, 18, 13 ],
[ 17, 15, 0, 8, 10, 7, 2 ],
[ 9, 21, 8, 0, 18, 15, 10 ],
[ 27, 21, 10, 18, 0, 3, 8 ],
[ 24, 18, 7, 15, 3, 0, 5 ],
[ 19, 13, 2, 10, 8, 5, 0 ]]

{ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6 }

[ 0, 3, 2, 6, 5, 4 ]

(27)

[ 'a', 'd', 'c', 'g', 'f', 'e' ]
```

Examples are using the following graph :
![Image of used graph](/graph.png)
