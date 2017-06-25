module.exports = {
  edgeMapToMatrix(edgeMap) {
    let matrix = [];
    let edges = {};
    let mapKeys = Object.keys(edgeMap);

    for(let i = 0; i < mapKeys.length; i++) {
      edges[mapKeys[i]] = i;
    }

    for(let i = 0; i < mapKeys.length; i++) {
      edges[mapKeys[i]] = i;
      let matrixLine = new Array(mapKeys.length).fill(Number.POSITIVE_INFINITY);
      matrixLine[i] = 0;
      for(let edge in edgeMap[mapKeys[i]]) {
        matrixLine[this.getEdgeNumber(edges, edge)] = edgeMap[mapKeys[i]][edge];
      }

      matrix.push(matrixLine);
    }

    return {matrix, edges};
  },

  getEdgeNumber(edges, edge) {
      return edges[edge];
  },

  getEdgeName(edges, number) {
    for(let edge in edges) {
      if(edges[edge] == number)
        return edge;
    }
  },

  getNamedPath(path, edges) {
    return path.map(edgeNumber => this.getEdgeName(edges, edgeNumber))
  }
};
