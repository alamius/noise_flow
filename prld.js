
//keeping different parts of the output as vars
var input_mapnm; //input of the mapping number; see prld() and update_mapnm and prep()
var input_sfctr; //input for the particle_speed_factor; see prld() and update_sfctr and prep()
var input_w, input_h; //input for the column and row number; see prld() and update_w and update_h and prep()
var input_prtcl; //input for the particle_amount; see prld() and update_prtcl and prep()
var input_power; //input for the spot_vector_power; see prld() and update_power and prep()
var input_nse_x; //input for the x-dimension noise stretch; see prld() and update_nse_x and prep()
var input_nse_y; //input for the y-dimension noise stretch; see prld() and update_nse_y and prep()

// var div0_0;
// var div1_0;
// var div2_0;
// var div3_0;
//
// var pa_p;   //particle_amount
// var powr_p; //spot_vector_power
// var slw_p;  //particle_speed_factor
//
// var h_p;    //h
// var w_p;    //w
//
// var incr_p; //c_incr
// var p_s_p;  //particle_show_size
//
// var str_x_p;//stretch = nse_str
// var str_y_p;//stretch = nse_str
// var c_p;    //c

function prld() {
    // divR  = document.getElementById("divR");
    // div0_0  = document.getElementById("div0_0");
    // pa_p    = document.getElementById("p_a");         //particle_amount
    // powr_p  = document.getElementById("powr");        //spot_vector_power
    // slw_p   = document.getElementById("slw");        //particle_speed_factor
    // mpn_p   = document.getElementById("mpn");        //spot_angle_mapping
    // div1_0  = document.getElementById("div1_0");
    // h_p     = document.getElementById("h");          //h
    // w_p     = document.getElementById("w");          //w
    // div2_0  = document.getElementById("div2_0");
    // incr_p  = document.getElementById("incr");       //c_incr
    // p_s_p   = document.getElementById("p_s");        //particle_show_size
    // div3_0  = document.getElementById("div3_0");
    // str_x_p = document.getElementById("str_x");      //stretch = nse_str
    // str_y_p = document.getElementById("str_y");      //stretch = nse_str
    // c_p     = document.getElementById("c");          //c
    // RES_b   = document.getElementById("RES");        //RESTART-Button
    input_prtcl = document.getElementById("input_prtcl");        //particle amount
    input_power = document.getElementById("input_power");        //power / vector (magnitude scalar)
    input_sfctr = document.getElementById("input_sfctr");        //particle_speed_factor = velocity scalar
    input_mapnm = document.getElementById("input_mapnm");        //angle mapping number (angle_range = [amn, 2 PI - amn])
    input_nse_x = document.getElementById("input_nse_x");        //nse_str.x
    input_nse_y = document.getElementById("input_nse_y");        //nse_str.y
    input_w     = document.getElementById("input_w");            //w
    input_h     = document.getElementById("input_h");            //h

    input_prtcl.value = particle_amount;
    input_power.value = spot_vector_power;
    input_sfctr.value = particle_speed_factor;
    input_mapnm.value = spot_angle_mapping;
    input_nse_x.value = nse_str_init.x;
    input_nse_y.value = nse_str_init.y;
    input_w    .value = w;
    input_h    .value = h;

    // img = loadImage(img_init);
    // image(img, 0, 0);

    return 0;
}
