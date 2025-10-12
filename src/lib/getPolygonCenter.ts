// Functions copied from https://gist.github.com/seyuf/ab9c980776e4c2cb350a2d1e70976517

import type { Polygon } from "geojson";

  export function area(poly: Polygon){
    var s = 0.0;
    var ring = poly.coordinates[0];
    for(var i= 0; i < (ring.length-1); i++){
      s += (ring[i][0] * ring[i+1][1] - ring[i+1][0] * ring[i][1]);
    }
    return 0.5 *s;
  }

  export function centroid(poly: Polygon){
    var c = [0,0];
    var ring = poly.coordinates[0];
    for(var i= 0; i < (ring.length-1); i++){
      c[0] += (ring[i][0] + ring[i+1][0]) * (ring[i][0]*ring[i+1][1] - ring[i+1][0]*ring[i][1]);
      c[1] += (ring[i][1] + ring[i+1][1]) * (ring[i][0]*ring[i+1][1] - ring[i+1][0]*ring[i][1]);
    }
    var a = area(poly);
    c[0] /= a *6;
    c[1] /= a*6;
    return c;
  }