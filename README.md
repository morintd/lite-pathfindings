# Lite-Pathfindings
Simple, intuitive and lightweight pathfinding algorithms.

### Installation

```javascript
$ npm install lite-pathfindings
```

### Features
##### Algorithms
Implementeds algorithms are the following (With others soon !) :
  - Djikstra
  - Floyd-Warshall

##### Utility library
To make it easier, handle graphs with a few extra functions :
  - Transform a map of edge to its matrix representation
  - Recover your edge names from a matrix
  - Verify the content of an edgeMap

### How to use
##### Djikstra
Djikstra is a well-known algorithm aiming to find the shortest path between a given edge and every other edges, it works with ponderated graph, oriented and not oriented.
Djikstra doesn't work with negative weight.
###### API :
- init(edgeMap, sDeb) : Given an edgeMap, and an existing vertex name, create an Object "predecessor", used to get the path.
- getPath(predecessor, sDeb, sEnd) : Given the predecessor object, the vertex name used in init, and a vertex name representing the end of the path, return the vertex list of the shortest path.
- getWeight(path, edgeMap) : Given the path and the edge, return the total weight of the path.

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
var weight = Djikstra.getWeight(edgeMap, path); // Find total weight

console.log(path);
console.log("(" + weight + ")");

```
Returns :

```javascript
[ 'a', 'd', 'c', 'g', 'f', 'e' ]
(27)
```

##### Floyd-Warshall
Floyd-Warshall is an algorithm aiming to find the shortest path between every pair of edge, it works with ponderated graph, oriented and not oriented.
It works thanks to a matrix which represents every vertex (and weight) of a graph.
Floyd-Warhsall works with negative weight, with the exception of circuit with negative weight.
###### API :
- init(matrix) : Given a matrix, return an Object "next" used to easily find paths. It also modifies the given matrix by its reference.
- getPath(next, vertex1, vertex2) : Given the "next" Object and the two vertex of a path, return the list of vertex (number as it's a matrix) that make it up.
- getWeight(edgeMap, vertex1, vertex2) : Given an edgeMap and the two vertex of a path, return its total weight.
- containNegativeCycle(matrix) : Given a matrix after "init", return a boolean telling if it contains a negative cycle.

```javascript
var litepathfindings = require('lite-pathfindings');
var FloydWarshall = litepathfindings.FloydWarshall;

// Matrix which contains edge and weight
var matrixEdges = [[0, 12, 20, 9, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
[12, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 13],
[20, Number.POSITIVE_INFINITY, 0, 8, Number.POSITIVE_INFINITY, 11, 2],
[9, Number.POSITIVE_INFINITY, 8, 0, Number.POSITIVE_INFINITY, 21, Number.POSITIVE_INFINITY],
[Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0, 3, 9],
[Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 11, 21, 3, 0, 5],
[Number.POSITIVE_INFINITY, 13, 20, Number.POSITIVE_INFINITY, 9, 5, 0]];

var matrix = matrixEdges;
var next = FloydWarshall.init(matrix);

// Unless you are confident (...), you have to look for negative cycles after calling "init"
if(!FloydWarshall.containNegativeCycle(matrix)) {
  var path = FloydWarshall.getPath(next, 0, 4);
  var weight = FloydWarshall.getWeight(0, 4, matrix);
  console.log(path);
  console.log("(" + weight + ")");
}
else
  console.log("This graph contains a negative cycle");
```
Returns :

```javascript
[ 0, 3, 2, 6, 5, 4 ]
(27)
```

#### Helpers
###### As iI'd rather work with name (a, b, c, d, e, ...), an utility library is added with a few methods.
###### API :
* edgeMapToMatrix(edgeMap) : Given an edgeMap, return the corresponding matrix, and an "edges" object which links edge name to number : {matrix, edges}.
* getEdgeNumber(edges, edgeName) : Given a list of edges and a name, return the corresponding edge number.
* getEdgeName(edges, number) : Given a list of edges and a number, return the corresponding edge name.
* getNamedPath(path, edges) : Given a list of number representing a path, and the correspondance between number and edge name, return the corresponding list of edge name.

But also :
* edgeMapContainNegativeValue(edgeMap) : Given an edgeMap, return true if contain an edge with negative value, false otherwise.

As an example, it allows to work with edgeMap and Floyd-Warshall :
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
var path = FloydWarshall.getPath(getEdgeNumber(edges, "a"), getEdgeNumber(edges, "e"), next);
var weight = FloydWarshall.getWeight(getEdgeNumber(edges, "a"), getEdgeNumber(edges, "e"), matrix);

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
### License
MIT
