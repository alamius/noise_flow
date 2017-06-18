var grid;
var h = 40;
var w = 40;
var P = [];
var particle_amount = 10000;
var particle_spread = true; // placing a Particle at each Noise_vector
var nse_str;
var c = 0;
var c_incr = 0.0;
var power = 0.6;
var slider_power;
var slowdown = 0.6;
// var slowdown = 0.1 / (power * power * power);
var slider_slwdn;
var show_vecs = false;
var show_particles = true;
var diff;
var point_size = 0.0001;
var fill_color = [0, 0, 0];
var bg_color = [255, 255, 255];
var mapping_number = -0.4;
var slider_mapnm;
var info_mode = 3;
var reset_randomly = 25; // in seconds; 0 for not at all
var reset_screen_after_reset = true;
var start_time = 0;
var curr_time = 0;
var random_bg_color = true;
var div0_0;
var div1_0;
var div2_0;
var div3_0;

var pa_p;   //particle_amount
var powr_p; //power
var slw_p;  //slowdown

var h_p;    //h
var w_p;    //w

var incr_p; //c_incr
var p_s_p;  //point_size

var str_x_p;//stretch = nse_str
var str_y_p;//stretch = nse_str
var c_p;    //c

function prld() {
  divR  = document.getElementById("divR");
  div0_0  = document.getElementById("div0_0");
  pa_p    = document.getElementById("p_a");         //particle_amount
  powr_p  = document.getElementById("powr");        //power
  slw_p   = document.getElementById("slw");        //slowdown
  mpn_p   = document.getElementById("mpn");        //mapping_number
  div1_0  = document.getElementById("div1_0");
  h_p     = document.getElementById("h");          //h
  w_p     = document.getElementById("w");          //w
  div2_0  = document.getElementById("div2_0");
  incr_p  = document.getElementById("incr");       //c_incr
  p_s_p   = document.getElementById("p_s");        //point_size
  div3_0  = document.getElementById("div3_0");
  str_x_p = document.getElementById("str_x");      //stretch = nse_str
  str_y_p = document.getElementById("str_y");      //stretch = nse_str
  c_p     = document.getElementById("c");          //c
  RES_b   = document.getElementById("RES");        //RESTART-Button
  slider_power = document.getElementById("slider_power");        //RESTART-Button
  slider_slwdn = document.getElementById("slider_slwdn");        //RESTART-Button
  slider_mapnm = document.getElementById("slider_mapnm");        //RESTART-Button
  return 0;
}

function setup() {
  createCanvas(600,600);
  prep();
  prld();
}

function prep() {
  start_time = Date.now()/1000;
  curr_time = Date.now()/1000;
  background(bg_color[0], bg_color[1], bg_color[2]);
  nse_str = createVector(0.01, 0.01);
  diff = createVector(width / w, height / h);
  grid = new Grid(h, w, nse_str);
  P=[];
  if(particle_spread){
    for(x = 0; x < w; x++){
      for(y = 0; y < h; y++){
        P.push(new Particle(x, y));
      }
    }
  }else{
    for (i = 0; i < particle_amount; i++) {
      x = floor(random(0, width) / diff.x);
      y = floor(random(0, height) / diff.y);
      P.push(new Particle(x, y));
    }
  }
  return 0;
}

function draw() {
  // background(0);
  c += c_incr;
  grid.update();
  grid.show();
  for (i = 0; i < P.length; i++) {
    print_x_x_i(i);
    P[i].flow_on();
    P[i].update();
    P[i].show();
  }
  // mapping_number = slider_mapnm.valueAsNumber;
  // slowdown = slider_slwdn.valueAsNumber;
  // power = slider_power.valueAsNumber;
  // slowdown = 0.1 / (power * power * power);
  if(reset_randomly){
    reset_rand();
  }
  info(info_mode);
}

function info(mode=2) {
  switch (mode) {
    case 3:
    add_text_node("div3_0", "c",     "c: "               + str(nfc(c, 5)));
    add_text_node("div3_0", "str_x", "noise stretch x: " + str(nse_str.x));
    add_text_node("div3_0", "str_y", "noise stretch y: " + str(nse_str.y));
    case 2:
    add_text_node("div2_0", "p_s",   "pointsize: "       + str(point_size));
    add_text_node("div2_0", "incr",  "increment of c: "  + str(c_incr));
    case 1:
    add_text_node("div1_0", "h",     "height: "          + str(h));
    add_text_node("div1_0", "w",     "width: "           + str(w));
    default:
    add_text_node("div0_0", "p_a",   "particle amount: " + str(particle_amount));
    add_text_node("div0_0", "powr",  "power / vector: "  + str(power));
    add_text_node("div0_0", "slw",   "speedfactor: "     + str(slowdown));
    add_text_node("div0_0", "mpn",   "angle mapping: "   + str(mapping_number));
    break;
  }
  return 0;
}

function add_text_node(div_id, p_id, text) {
  text = document.createTextNode(text);
  // console.log(text);
  p = document.getElementById(p_id);
  clear_HTML_Node(p);
  p.appendChild(text);
  // console.log(p);
  document.getElementById(div_id).appendChild(p);
}

function print_all_x_y_i() {
  console.log('x | y | i');
  for (i = 0; i < P.length; i++) {
    console.log(print_x_x_i());
  }
}

function print_x_x_i(i) {
  x = floor(P[i].pos.x);
  y = floor(P[i].pos.y);
  return x, ' | ', y, ' | ', i;
}

function clear_HTML_Node(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function reset(fill_color_n, c_n){
  P=[];
  if(particle_spread){
    for(x = 0; x < w; x++){
      for(y = 0; y < h; y++){
        P.push(new Particle(x, y));
      }
    }
  }else{
    for (i = 0; i < particle_amount; i++) {
      x = floor(random(0, width) / diff.x);
      y = floor(random(0, height) / diff.y);
      P.push(new Particle(x, y));
    }
  }
  c = c_n;
  fill_color = fill_color_n;
}

function reset_rand(){
  if(Date.now()/1000 - reset_randomly <= curr_time){
    return 0;
  }
  if(reset_screen_after_reset){
    if(random_bg_color){
      bg_color = [random(0, 256), random(0, 256), random(0, 256)];
    }
    background(bg_color[0], bg_color[1], bg_color[2]);
  }
  curr_time = Date.now()/1000;
  fill_color = [random(0, 256), random(0, 256), random(0, 256)];
  c += 1;
  P=[];
  if(particle_spread){
    for(x = 0; x < w; x++){
      for(y = 0; y < h; y++){
        P.push(new Particle(x, y));
      }
    }
  }else{
    for (i = 0; i < particle_amount; i++) {
      x = floor(random(0, width) / diff.x);
      y = floor(random(0, height) / diff.y);
      P.push(new Particle(x, y));
    }
  }
}
