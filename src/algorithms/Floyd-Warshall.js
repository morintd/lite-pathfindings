module.exports = {
  init(dist) {
      let v = dist.length
      let next = initNext(dist);

      for(let k=0; k < v; k++)
        for(let i=0; i < v; i++)
          for(let j=0; j < v; j++)
            if(dist[i][j] > dist[i][k] + dist[k][j]) {
              dist[i][j] = dist[i][k] + dist[k][j]
              next[i][j] = next[i][k];
            }

      return next;
  },

  getPath(u, v, next) {
    if(next[u][v] == undefined)
      return [];

      let path = [u];

      while(u != v) {
        u = next[u][v];
        path.push(u);
      }

      return path;
  },

  getWeight(edge1, edge2, matrix) {
    return matrix[edge1][edge2];
  },

  containNegativeCycle(matrix) {
    let length = matrix.length;
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length; j++) {
          if(matrix[i][j] < 0)
            return true;
      }
    }
    return false;
  }
};

let initNext = (dist) => {
  let v = dist.length;
  let next = new Array(v);

  for(let i = 0; i < v; i++) {
    next[i] = new Array(v);

    for(let j = 0; j < v; j++)
      if(isFinite(dist[i][j]) && dist[i][j] != 0)
        next[i][j] = j;
  }

  return next;
};
