function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.update = function() {
    this.acc = this.get_acc(this.pos);
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.vel.mult(slowdown);
  }

  this.show = function() {
    //if the settings "sett" tell to use lines; using the line/stroke color from the colorsettings "clrs" and the positions of begin and end of the line (from this.pss to this.dot)
    if (show_particles) {
      stroke(fill_color[0], fill_color[1], fill_color[2]);
      fill(fill_color[0], fill_color[1], fill_color[2]);
      rect(this.pos.x * diff.x, this.pos.y * diff.y, point_size, point_size);
    }
  }

  this.get_acc = function() {
    x = floor(this.pos.x);
    y = floor(this.pos.y);
    return grid.G[x][y].dir;
  }

  this.flow_on = function() {
    if (this.pos.x < 0) {
      this.pos.x = w + this.pos.x % w;
    } else if (this.pos.x >= w) {
      this.pos.x = this.pos.x % w;
    }
    if (this.pos.y < 0) {
      this.pos.y = h + this.pos.y % h;
    } else if (this.pos.y >= h) {
      this.pos.y = this.pos.y % h;
    }
  }
}
