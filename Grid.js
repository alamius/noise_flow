function Grid(h, w, nse_str) {
  //keeping all Spots in the grid; x and y are just the indices of the array, not the coordinates of the Spots
  this.G = [];
  for (x = 0; x < w; x += 1) {
    this.G[x] = [];
    for (y = 0; y < h; y += 1) {
      this.G[x][y] = new Noise_vector(x, y, nse_str); //remind to global sett
    }
  }
  //executing the update function every Spot inherits and thus just a distributor
  this.update = function() {
    for (x = 0; x < w; x += 1) {
      for (y = 0; y < h; y += 1) {
        this.G[x][y].update(); //remind to global sett
      }
    }
  }
  //see prev. comment
  this.show = function() {
    for (x = 0; x < w; x += 1) {
      for (y = 0; y < h; y += 1) {
        this.G[x][y].show(); //remind to global sett
      }
    }
  }
}
