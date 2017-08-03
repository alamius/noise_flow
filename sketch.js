var grid;
var h = 40; //number of rows in the Grid (turn spot_vector_show true to see the structure of the program)
var w = 40; //columns in the Grid ; see comment on diff
var canvas_init = {x:400, y:400};
var diff = {x:canvas_init.x / w, y:canvas_init.y / h}; //keeping the relatin of the width of the canvas and the amount of columns (width / w) and the same for height and h; see prep()
var P = []; //keeping all Particles
var nse_str_init = {x:0.01, y:0.005}; //keeping the relation of the position of a Spot and the noise values it is using; see Spot/update()
// var prep_first_time = true;
var looping = true;
var grid_update = false; //telling whether the grid is updated every frame or stays constant
//TODO!
var grid_simple_repelling_edge = false; //telling whether the four edges shall try to ajust so particles near them get pushed towards the center

var grid_reset_const_angles = false;

var bg_reset = false; //telling whether the background is going to be reset every frame; see draw()
//color that is used for every background reset; it could be changed by reset_randomly
// var bg_color = {r:255, g:255, b:255, a:255};
var bg_color = {r:0, g:0, b:0, a:255};

var c = 0; //keeping the progression of the program; directly congruent with frames
var c_incr = 0.0; //added to c every frame; changes the direction of loose (not Spot.const_angle) Spot's angle and other noise things that use c over time; see reset_randomly as well

var spot_vector_power = 0.3; //spot_vector_power multiplier for the force on particles over a Spot; see Spot/update
var spot_vector_stretch = 30; //len-ajustment for representation (not for "physics-engine"); see Spot/show()
var spot_vector_stroke = 128; //keeping the grey for the lines that represent the vectors
var spot_angle_mapping = -1.0; //mapping number is the angle (in redians) that the rage of the angles possible for the vectors gets expanded or reduced by; see Spot/update() where Spot.ang is set
var spot_angle_adding = 0; //added to every vector's angle when Spot/update is called;
var spot_vector_show = false; //see Spot/show

// particle_speed_factor = 1/pow(spot_vector_power,8)
var particle_show = true; //see Particle/show
var particle_spread = true; //placing a Particle at each Spot when creating a new Grid()
var particle_amount = 100; //number of Particles; is ignored when particle_spread is true
var particle_speed_factor = 0.6; //is multiplied with the velocity (Particle.vel) every frame; see Particle/update()
var particle_show_size = 0.1; //sets the size of the particles
var particle_show_shape = ['square']; //implemented: 'circle', 'square', 'line', 'ellipse', 'rect'
var particle_show_shape_flip = false; //flips height and width of particles that are represented asymatrically like ellipse, rect, line
var particle_show_stretch = {x:10, y:10}; //tells the amplification of the velocity respresentation for 'line', 'ellipse', 'rect'
var particle_show_min_sizes = {x:10, y:10}; //tells the minimum size of the previous setting
var particle_show_size_smooth_change = 0.1; //Particles save the previous size (see Particle.show) and ajust it (when smaller or bigger in the current frame) by this number; 0 for no constrains
var particle_show_size_begin_0 = false; //all particles hardcodedly start at size 0 and don't change this in the first frame, this makes them dependant to size_smooth_change; see Particle/show
var particle_show_color_fill = {r:0, g:32, b:228, a:255}; //sets the color of the particles
var particle_show_color_strk = {r:180, g:32, b:0, a:170}; //sets the color of the particles
//TODO!
var particle_show_color_fill_const_ang = {r:0, g:200, b:0, a:32}; //sets the color of the particles that float over a Spot thats const_angle property is true
var particle_show_color_ngtv_const_ang = false; //paints the particles over a Spot with const_angle in the negative color

var particle_show_only_moving = 0.0; //only shows the particles with a velocity magnitude (vetor length) greater than this var
var particle_age_color_gray = false;
var particle_age_color_base_colors = true;
var particle_age_color_negation = false;
var particle_age_color_anti_stroke = false;
var particle_age_color_anti_fill = false;
var particle_show_alpha_approaches = 0;
var particle_age_increase = true;
var particle_age_max = 100;
var particle_age_death = false;
var particle_dead_color_reset = false;
var particle_dead_respawn = true;
var particle_death_dist = 0.000;
var particle_death_percent = 0;
// var particle_death_edge = false;

var save_canvas = false;

//TODO!
var reset_rand_time = 25; // in seconds; 0 for not at all; telling the time difference between two random_resets
var reset_rand_bg_reset = true; //telling whether the canvas may be reset after a random_reset occured
var reset_rand_time_start = 0; //keeping the initial time of the starting of the program
var reset_rand_curr_time = 0; //keeping the time when the last random_reset occured
var reset_rand_random_bg_color = true; // telling whether the background gets a random color (when there is no bg_color set)

var mouse_active = true; //telling whether the mouse has an impoact on the grid when it is over the canvas and pressed (or 'M' is pressed)
var mouse_prev_pos; //see next comment
var mouse_curr_pos; //current variable that gets used to detect the difference (mouse_dir) beween previous and current mouse position
var mouse_min_dir_mag = 0.01; //see next comment
var mouse_max_dir_mag = 5; //distance to the previous (detected) mouse position where the vectors near the revious position do not ajust
var mouse_paint_dist = 1.5; //range of the circle inside that the vectors get ajusted for mouse_active / mouse_check

var flow_on_redistribute = 'notrandom'; //places particles from outside the canvas at a random position instead of the opposite side
                                     //'random' or 'noise' or 'delete' or false
var flow_on_redistribute_noise = 20; //'random' means to use noise(random(0, 10)); everything else means to use noise(frameCount / flow_on_redistribute_noise)
var flow_on_stop_after = false;
var flow_on_set_new_vel = false;

// var img;
// var img_init = 'images/testing/test_img_flow.jpg';
// var img_bright_as_dir = false;

function setup() {
    createCanvas(canvas_init.x, canvas_init.y);
    // frameRate(1);
    // noLoop();
    prld();
    prep();
}

function prep() {
    background(bg_color.r, bg_color.g, bg_color.g, bg_color.a);
    nse_str         = createVector(
        (typeof nse_str) !== "undefined" ? nse_str.x : nse_str_init.x,
        (typeof nse_str) !== "undefined" ? nse_str.y : nse_str_init.y
    );
    diff            = createVector(canvas_init.x / w, canvas_init.y / h); //keeping the relation of the width of the canvas and the amount of columns (width / w) and the same for height and h;
    mouse_prev_pos  = createVector();
    mouse_curr_pos  = createVector();
    background(bg_color.r, bg_color.g, bg_color.g, bg_color.a);
    particle_fill();
    if(!(grid_reset_const_angles || typeof grid === "undefined")){
        g2 = grid;
        grid = new Grid();
        grid.set_const_ang(g2);
    }else{
        grid = new Grid(/*w, h, nse_str*/);
    }
    loop();
    looping = true;
    return 0;
}

function reset(){
    background(bg_color.r, bg_color.g, bg_color.g, bg_color.a);
    particle_fill();
    grid.update();
    looping = true;
    // grid.unconstantize_angles();
}

function draw() {
    if(mouse_active && (keyIsDown(77) || mouseIsPressed)){
        mouse_check();
    }
    if(grid_update){        grid.update();  }
    if(spot_vector_show){   grid.show();    }
    if(!looping){return 0;}
    c += c_incr;
    if(bg_reset){
        background(bg_color.r, bg_color.g, bg_color.g, bg_color.a);
    }
    if(particle_show){
        for(i1 = 0; i1 < P.length; i1++) {
            P[i1].flow_on();
            P[i1].update();
            P[i1].show();
            P[i1].i = i1;
        }
    }
    check_dead_particles();
    info();
    // if(!looping){
    //     noLoop();
    // }
    if(save_canvas && P.length > 0){
        saveCanvas('canvas' + str(frameCount), 'jpg');
    }
    if(P.length == 0){
        looping = false;
        console.log('looping ceased without any Particles!');
    }
}

function particle_fill(){
    P=[];
    if(particle_spread && particle_amount > w * h){
        for(i = w * h; i < particle_amount; i++){
            x = random(0, w);
            y = random(0, h);
            P[i] = new Particle(x, y, i);
        }
    }else
    if(!particle_spread){
        for(i = 0; i < particle_amount; i++){
            x = random(0, w);
            y = random(0, h);
            P[i] = new Particle(x, y, i);
        }
    }else
    if(particle_spread){
        for(x = 0; x < w; x++){
            for(y = 0; y < h; y++){
                 P.push(new Particle(x, y, x*w+y));
            }
        }
    }
}
function check_dead_particles(){
    if(particle_dead_respawn && !flow_on_redistribute == 'delete'){
        for(i = 0; i < P.length; i++){
            if(P[i].delete){
                x = random(0, w);
                y = random(0, h);
                P[i] = new Particle(x, y, i);
            }
        }
    }else{
        for(i = 0; i < P.length; i++){
            if(P[i].delete){
                P.splice(i, 1);
            }
        }
    }
}

function update_w    (){ w                      = input_w    .valueAsNumber; /*prep();*/}
function update_h    (){ h                      = input_h    .valueAsNumber; /*prep();*/}
function update_mapnm(){ spot_angle_mapping     = input_mapnm.valueAsNumber; }
function update_sfctr(){ particle_speed_factor  = input_sfctr.valueAsNumber; }
function update_power(){ spot_vector_power      = input_power.valueAsNumber; }
function update_prtcl(){ particle_amount        = input_prtcl.valueAsNumber; /*prep();*/}
function update_nse_x(){ nse_str.x              = input_nse_x.valueAsNumber; }
function update_nse_y(){ nse_str.y              = input_nse_y.valueAsNumber; }

function keyPressed(){
    if(keyCode == 82){ // 'R'
        prep();
    }else
    if(keyCode == 76){
        loopToggle();
    }
}
function loopToggle(){
    // if(looping){
    //     noLoop();
    // }else{
    //     loop();
    // }

    looping = !looping;
    console.log('loopToggle:', looping);
}

function mouse_check(){
    mouse_prev_pos = mouse_curr_pos;
    mouse_curr_pos = createVector(mouseX / diff.x, mouseY / diff.y);
    if(mouse_curr_pos.x < 0 || mouse_curr_pos.y < 0 || mouse_curr_pos.x > w || mouse_curr_pos.y > h){
        return 0;
    }
    if(mouse_prev_pos.x == 0 && mouse_prev_pos.y == 0){
        return 0;
    }else{
        // console.log('mouse_check! ');
        mouse_dir = mouse_curr_pos.copy_sub(mouse_prev_pos);
        mouse_dir_mag = mouse_dir.mag()
        if(mouse_dir_mag > mouse_min_dir_mag && mouse_dir_mag < mouse_max_dir_mag){
            all_vectors_in_dist(mouse_prev_pos, mouse_paint_dist)
                .apply_to_all(
                function(OBJ){
                    OBJ.ang = mouse_dir.heading();
                    OBJ.const_angle = true;
                    // console.log('mouse_check: x:', OBJ.pos.x, '; y:', OBJ.pos.y);
                    OBJ.update_dd();
                }
            );
        }
        if(spot_vector_show){
            grid.show();
        }
    }
}

function all_vectors_in_dist(pos, dist){
    all_vectors = [];
    min_i = floor(pos.x - dist);
    max_i =  ceil(pos.x + dist);
    min_j = floor(pos.y - dist);
    max_j =  ceil(pos.y + dist);
    min_i = (min_i <  0 ? 0   : min_i);
    max_i = (max_i >= w ? w-1 : max_i);
    min_j = (min_j <  0 ? 0   : min_j);
    max_j = (max_j >= h ? h-1 : max_j);
    for(i = min_i; i <= max_i; i++){
        for(j = min_j; j <= max_j; j++){
            measure = pos.copy_sub([i, j]).mag();
            if(measure <= dist){
                all_vectors.push(grid.G[i][j]);
            }
        }
    }
    return all_vectors;
}

function average_in_dist(pos, dist){
    return 0;
    sum = 0;
    num = 0;
    min_i = floor(pos.x - dist);
    max_i =  ceil(pos.x + dist);
    min_j = floor(pos.y - dist);
    max_j =  ceil(pos.y + dist);
    min_i = (min_i <  0 ? 0   : min_i);
    max_i = (max_i >= w ? w-1 : max_i);
    min_j = (min_j <  0 ? 0   : min_j);
    max_j = (max_j >= h ? h-1 : max_j);
    for(i = min_i; i <= max_i; i++){
        for(j = min_j; j <= max_j; j++){
            measure = pos.copy_sub([i, j]).mag();
            if(measure <= dist){
                col = img.get(i * diff.x, j * diff.y);
                sum += col[0] + col[1] + col[2];
                num ++;
            }
        }
    }
    return sum / num / 3;
}

function all_pixels_in_rect(array, pos, dist){
    return [];
    result = [];
    min_i = floor(pos.x - dist);
    max_i =  ceil(pos.x + dist);
    min_j = floor(pos.y - dist);
    max_j =  ceil(pos.y + dist);
    min_i = (min_i <  0 ? 0   : min_i);
    max_i = (max_i >= w ? w-1 : max_i);
    min_j = (min_j <  0 ? 0   : min_j);
    max_j = (max_j >= h ? h-1 : max_j);
    for(i = min_i; i <= max_i; i++){
        for(j = min_j; j <= max_j; j++){
            result.push(array[i][j]);
        }
    }
    return result;
}
