
//keeping different parts of the output as vars
//please consider looking into index.html in div0_0 or following <div>s
var input_mapnm; //input of the mapping number; see prld() and update_mapnm and prep()
var input_sfctr; //input for the particle_speed_factor; see prld() and update_sfctr and prep()
var input_w, input_h; //input for the column and row number; see prld() and prep()
var input_prtcl; //input for the particle_amount; see prld() and prep()
var input_power; //input for the spot_vector_power; see prld() and update_power and prep()
var input_nse_x; //input for the x-dimension noise stretch; see prld() and update_nse_x and prep()
var input_nse_y; //input for the y-dimension noise stretch; see prld() and update_nse_y and prep()

function prld() {
    input_prtcl = document.getElementById("input_prtcl");        //particle amount
    input_power = document.getElementById("input_power");        //power / vector (magnitude scalar)
    input_sfctr = document.getElementById("input_sfctr");        //particle_speed_factor = velocity scalar
    input_mapnm = document.getElementById("input_mapnm");        //angle mapping number (angle_range = [amn, 2 PI - amn])
    input_nse_x = document.getElementById("input_nse_x");        //nse_str.x
    input_nse_y = document.getElementById("input_nse_y");        //nse_str.y
    input_w     = document.getElementById("input_w");            //w
    input_h     = document.getElementById("input_h");            //h
    return 0;
}
