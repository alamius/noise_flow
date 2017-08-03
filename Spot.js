function Spot(x, y, nse_str) {
    //keeping one "spot" of the grid and thus one static point, that has a noisely orbiting dot
    this.pos = createVector(x, y);
    this.pss = createVector(x * diff.x, y * diff.y); //making as many Points as nessessary (according w * h)
    //call of this.update() is done (but in another line, after its declaration)
    this.dot; //the position of the end of the vector (absolute)
    this.dir; //the position of the end of the vector (realtive)
    this.edge = -1;
    if(x == w-1){
        this.edge = 0;
    }else
    if(y == 0){
        this.edge = 1;
    }else
    if(x == 0){
        this.edge = 2;
    }else
    if(y == h-1){
        this.edge = 3;
    }
    // direction_center = createVector(x - w/2, y - h/2);
    // this.edge_tilt = createVector();
    // a = direction_center.mag();
    // b = w * 0.2;
    // d = 0;
    // this.edge_tilt.x = map(direction_center.x, a, 0, b, d);
    // this.edge_tilt.y = map(direction_center.y, a, 0, b, d);
    this.const_angle = false;


    this.update = function(){
        this.len = spot_vector_power;
        //length of a spots line according to the absolute position (x, y, (c as a timekeeper)) times the settings for stretching x and y so the noise is getting projected onto the coordinates bigger or smaller
        // this.len = noise(
        //   this.pss.x * sett.nse_str.x,
        //   this.pss.y * sett.nse_str.y,
        //   c
        // ) * power;
        //the length gets ajusted by power
        //for the angle, it works the same (coordinates and projection) except that it uses another part of the noise field
        //  (100 ahead from the lengths (meaning that every noise(x,y,c) used by the lengths will be used by the angles later, but thats not a problem))
        if(!this.const_angle){

            // this.ang = map(
            //   noise(
            //     this.pss.x * nse_str.x + this.edge_tilt.x,
            //     this.pss.y * nse_str.y + this.edge_tilt.y,
            //     c + 100
            //   ), 0, 1,
            //   mapping_number,
            //   TWO_PI - mapping_number
            // );
            if(
                grid_simple_repelling_edge &&
                this.edge >= 0 &&
                sre_edges[this.edge])
            {
                this.ang = HALF_PI * this.edge;
                this.len = sre_power;
            }else{
                this.ang = map(
                    noise(
                        this.pss.x * nse_str.x,
                        this.pss.y * nse_str.y,
                        c + 100
                    ), 0, 1,
                    spot_angle_mapping,
                    TWO_PI - spot_angle_mapping
                ) + spot_angle_adding;
            }
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
    }
    this.update();

    // necessary updating for mouse_check (mouse_active == true), because the this.update ignores the change in ang for dir and dot, when mouse_check has set the this.const_angle
    this.update_dd = function(){
        this.dot = createVector(
            this.pss.x + cos(this.ang) * this.len,
            this.pss.y + sin(this.ang) * this.len
        );
        this.dir = createVector(
            cos(this.ang) * this.len,
            sin(this.ang) * this.len
        );
    }

    this.show = function() {
        //if the settings "sett" tell to use lines; using the line/stroke color from the colorsettings "clrs" and the positions of begin and end of the line (from this.pss to this.dot)
        stroke(spot_vector_stroke);
        stretched_dot = createVector(
            this.pss.x + cos(this.ang) * this.len * spot_vector_stretch,
            this.pss.y + sin(this.ang) * this.len * spot_vector_stretch
        );
        line(this.pss.x, this.pss.y, stretched_dot.x, stretched_dot.y);
    }
}
