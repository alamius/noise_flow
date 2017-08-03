Array.prototype.contains = function(obj){
    var i = this.length;
    while (i--){
        if (this[i] === obj){
            return true;
        }
    }
    return false;
}

Array.prototype.apply_to_all = function(applying, returning = false){
    if(returning){
        RESULTS = new Array();
    }
    for(i = 0; i < this.length; i++){
        if(returning){
            RESULTS[i] = applying(this[i]);
        }else{
            applying(this[i]);
        }
    }
    if(returning){
        return RESULTS;
    }
}

Array.prototype.to_string = function(sep){
    result = '';
    for(i = 0; i < this.length; i++){
        result += str(this[i]) + sep;
    }
    return result;
}

String.prototype.contains = function(obj){
    var i = this.length;
    while (i--){
        if (this[i] === obj){
            return true;
        }
    }
    return false;
}

p5.Vector.prototype.copy_sub = function (x, y, z) {
    V = createVector(this.x, this.y, this.z);
    if (x instanceof p5.Vector) {    V.x -= x.x || 0;       V.y -= x.y || 0;        V.z -= x.z || 0;        return V;    }
    if (x instanceof Array) {        V.x -= x[0] || 0;      V.y -= x[1] || 0;       V.z -= x[2] || 0;       return V;    }
                                     V.x -= x || 0;         V.y -= y || 0;          V.z -= z || 0;          return V;
};

p5.Vector.prototype.copy_add = function (x, y, z) {
    V = createVector(this.x, this.y, this.z);
    if (x instanceof p5.Vector) {       V.x += x.x || 0;         V.y += x.y || 0;        V.z += x.z || 0;        return V;    }
    if (x instanceof Array) {           V.x += x[0] || 0;        V.y += x[1] || 0;       V.z += x[2] || 0;       return V;    }
                                        V.x += x || 0;           V.y += y || 0;          V.z += z || 0;          return V;
};

function arguments_to_arr(arg){
    result = new Array();
    ai = 0;
    while(arg[ai]){
        result[ai] = arg[ai];
        ai++;
    }
    return result;
}
function ata(arg){
    return arguments_to_arr(arg);
}

function not(arr){ return !(or(arr)); }
function or(arr){
    if(arr.length == 0){
        return false;
    }else if(arr.length == 1){
        return arr[0];
    }else{
        return (arr[0] || or(arr.slice(1, arr.length - 1)));
    }
}
function and(arr){
    if(arr.length == 0){
        return false;
    }else if(arr.length == 1){
        return boolean(arr[0]);
    }else{
        return boolean(arr[0] && and(arr.slice(1)));
    }
}
function xor(arr){
    if(arr.length == 0){
        return false;
    }else if(arr.length == 1){
        return arr[0];
    }else{
        sum = 0;
        for(bi = 0; bi < arr.length; bi++){
            if(arr[bi]){ sum++; }
            if(sum > 1){
                return false;
            }
        }
        if(sum === 1){
            return true;
        }
        return false;
    }
}
function bool_sum(arr){
    sum = 0;
    for(bi = 0; bi < arr.length; bi++){
        if(arr[i]){ sum++; }
    }
    return sum;
}

function get_color_from_age(age, base_col){
    col = {r:0, g:0, b:0, a:255};
    col.r = map(age, 0, particle_age_max, base_col.r, 255);
    col.g = map(age, 0, particle_age_max, base_col.g, 255);
    col.b = map(age, 0, particle_age_max, base_col.b, 255);
    col.a = map(age, 0, particle_age_max, base_col.a, (particle_show_alpha_approaches == 0 ? 0 : 255));
    return col;
}
function negate_color(coli){
    col = {r:0, g:0, b:0, a:255};
    col.r = 255 - coli.r;
    col.g = 255 - coli.g;
    col.b = 255 - coli.b;
    col.a = 255 - coli.a;
    return col;
}
function col_to_str(col){
    col.r = round_(col.r, 3) || 0;
    col.g = round_(col.g, 3) || 0;
    col.b = round_(col.b, 3) || 0;
    col.a = round_(col.a, 3) || 0;
    cs = ''
    if(col.r == col.g && col.g == col.b){
        cs += str(col.r);
        cs += (col.a != 255
            ? (', alpha: ' + str(col.a))
            : ''
        );
        return cs;
    }
    cs += str(col.r)  + ', ' + str(col.g) + ', ' + col.b;
    cs += (col.a != 255
        ? (', alpha: ' + str(col.a))
        : ''
    );
    return cs;
}

function min_index(array){
    minimum = Infinity;
    minim_i = -1;
    for(i = 0; i < array.length; i++){
        if(array[i] < minimum){
            minimum = array[i];
            minim_i = i;
        }
    }
    return minim_i;
}

function round_(n, digits){
    d = digits || 0;
    return round(n * pow(10, d)) / pow(10, d);
}

function info() {
    add_text_node("div0_0", "p_a",   "particle amount: " + str(P.length));
    add_text_node("div0_0", "powr",  "power / vector: "  + str(spot_vector_power));
    add_text_node("div0_0", "slw",   "speedfactor: "     + str(particle_speed_factor));
    add_text_node("div0_0", "mpn",   "angle mapping: "   + str(spot_angle_mapping));
    add_text_node("div1_0", "h",     "height: "          + str(h));
    add_text_node("div1_0", "w",     "width: "           + str(w));
    add_text_node("div1_0", "str_x", "noise stretch x: " + str(nse_str.x));
    add_text_node("div1_0", "str_y", "noise stretch y: " + str(nse_str.y));
    add_text_node("div2_0", "c",     "c: "               + str(nfc(c, 5)));
    add_text_node("div2_0", "p_s",   "pointsize: "       + str(particle_show_size));
    add_text_node("div2_0", "incr",  "increment of c: "  + str(c_incr));
    return 0;
}

function add_text_node(div_id, p_id, t) {
    t = document.createTextNode(t);
    p = document.getElementById(p_id);
    d = document.getElementById(div_id);
    clear_HTML_Node(p);
    p.appendChild(t);
    d.appendChild(p);
}

function clear_HTML_Node(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
