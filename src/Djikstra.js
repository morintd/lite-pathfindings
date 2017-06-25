/*
  L'algorithme de Djikstra permet de calculer les plus court chemins entre un sommet défini et tous les autres sommets, orienté ou non et pondéré
*/

module.exports = {
  init(EdgeMap, sDeb) {
    let A = EdgeMap;

    let S = [];
    for(let vertex in A) {
        S.push(vertex);
    }

    let d = [];
    S.forEach((s) => {
      d[s] = Number.POSITIVE_INFINITY;
    });

    d[sDeb] = 0;

    let Q = S.concat();
    let predecesseur = [];

    while(Q.length > 0) {
      let mini = Number.POSITIVE_INFINITY;
      let s1 = -1;

      Q.forEach((s) => {
        if(s1 == -1 || d[s] < mini) {
          mini = d[s];
          s1 = s;
        }
      });

      Q.splice(Q.indexOf(s1), 1);

      for(let s2 in A[s1]) {
        if(d[s2] > d[s1] + A[s1][s2]) {
          d[s2] = d[s1] + A[s1][s2];
          predecesseur[s2] = s1;
        }
      }
    }

    return predecesseur;
  },

  getPath(predecesseur, sDeb, sFin) {
    let A = [];
    let s = sFin;

    while(s != sDeb)
    {
      A.push(s);
      s = predecesseur[s];
    }

    A.push(sDeb)
    return A.reverse();
  },

  getWeight(path, edgeMap) {
    var weight = 0;
    var vertex = undefined;

    path.forEach(function(v) {
      if(vertex != undefined)
          weight += edgeMap[vertex][v];
      vertex = v;
    });

    return weight;
  }
}
