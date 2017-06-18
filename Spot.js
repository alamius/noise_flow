function Spot(x, y, nse_str) {
  //keeping one "spot" of the grid and thus one static point, that has a noisely orbiting dot
  this.pos = createVector(x, y);
  this.pss = createVector(x * diff.x, y * diff.y); //making as many Points as nessessary (according w * h)
  //call of this.update() is done (but in another line, after its declaration)
  this.dot; //the position of the end of the vector (absolute)
  this.dir; //the position of the end of the vector (realtive)
  if(particle_spread){
    P.push(new Particle(x, y));
  }

  this.update = function() {
    this.len = power;
    //length of a spots line according to the absolute position (x, y, (c as a timekeeper)) times the settings for stretching x and y so the noise is getting projected onto the coordinates bigger or smaller
    // this.len = noise(
    //   this.pss.x * sett.nse_str.x,
    //   this.pss.y * sett.nse_str.y,
    //   c
    // ) * power;
    //the length gets ajusted by power
    //for the angle, it works the same (coordinates and projection) except that it uses another part of the noise field
    //  (100 ahead from the lengths (meaning that every noise(x,y,c) used by the lengths will be used by the angles later, but thats not a problem))
    this.ang = map(
      noise(
        this.pss.x * nse_str.x,
        this.pss.y * nse_str.y,
        c + 100
      ), 0, 1,
      mapping_number,
      TWO_PI - mapping_number
    );
    //this tells how many times it will take a full turn (360°) while going from 'noise(x,y,c+100) = 0' to 'noise(x,y,c+100) = 1'
    //computing the position of the point that the line (start: this.pss, length: this.len, angle: this.ang) ends at
    this.dot = createVector(
      this.pss.x + cos(this.ang) * this.len,
      this.pss.y + sin(this.ang) * this.len
    );
    this.dir = createVector(
      cos(this.ang) * this.len,
      sin(this.ang) * this.len
    );
  }
  this.update();

  this.show = function() {
    //if the settings "sett" tell to use lines; using the line/stroke color from the colorsettings "clrs" and the positions of begin and end of the line (from this.pss to this.dot)
    if (show_vecs) {
      stroke(0);
      line(this.pss.x, this.pss.y, this.dot.x, this.dot.y);
    }
  }
}
