function Grid(w, h, nse_str) {
    //keeping all Spots in the grid; x and y are just the indices of the array, not the coordinates of the Spots
    this.G = [];
    for (gx = 0; gx < w; gx += 1) {
        this.G.push([]);
        for (gy = 0; gy < h; gy += 1) {
            this.G[gx].push(new Spot(gx, gy, nse_str));
        }
    }
    //executing the update function every Spot has and thus just a distributor
    this.update = function() {
        try{
            for (gux = 0; gux < w; gux += 1) {
                for (guy = 0; guy < h; guy += 1) {
                    this.G[gux][guy].update();
                }
            }
        }catch(TypeError){
            console.log("TypeError, grid/update!: ", gux, guy, w, h, this.G.length, this.G[0].length);
        }
    }
    //see prev. comment
    this.show = function() {
        for (gsx = 0; gsx < w; gsx += 1) {
            for (gsy = 0; gsy < h; gsy += 1) {
                this.G[gsx][gsy].show();
            }
        }
    }

    this.set_const_ang = function(g2){
        Problems = [];
        for (gcx = 0; gcx < w; gcx += 1) {
            for (gcy = 0; gcy < h; gcy += 1) {
                try{
                    if(g2.G[gcx][gcy].const_angle){
                        this.G[gcx][gcy].ang = g2.G[gcx][gcy].ang;
                        this.G[gcx][gcy].const_angle = true;
                    }
                }catch(TypeError){
                    //might occur when changing w or h without stopping the program first or calling prep() so that a to small grid g2 tries to cover a bigger new grid
                    Problems.push(createVector(gcx, gcy));
                }
            }
        }
        if(Problems.length > 0){
            console.log("new grid (w, h):", w, h, "old grid (w, h):", g2.G.length, g2.G[0].length);
            console.log("TypeErrors, grid/set_const_ang: Array[" + Problems.length + "](x, y):", Problems.toString());
        }
    }

    this.unconstantize_angles = function(){
        for(gax = 0; gax < w; gax += 1) {
            for (gay = 0; gay < h; gay += 1) {
                if(g2[gax][gay].const_angle){
                    this.G[gcx][gcy].const_angle = false;
                }
            }
        }
    }

    this.negate_constant_angles = function(){
        for(gax = 0; gax < w; gax += 1) {
            for (gay = 0; gay < h; gay += 1) {
                this.G[gax][gay].const_angle = !(this.G[gax][gay].const_angle);
            }
        }
    }
}
