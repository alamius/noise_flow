function Particle(x, y, i) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.col = {r:0, g:0, b:0, a:255};
    this.age = 0;
    this.age_const = false;
    this.delete = false;
    this.over_const_angle = false;
    this.prev_size = createVector();

    this.update = function() {
        if(!this.delete){
            if(particle_death_dist && frameCount > 10 || particle_death_percent){
                this.check_death();
                if(this.delete){return 0;}
            }
            this.acc = this.get_acc();
            this.pos.add(this.vel);
            // this.vel.add(this.acc);
            this.vel = this.acc;
            this.vel.mult(particle_speed_factor);

            if(particle_age_increase && !this.age_const){
                this.age++;
                if(this.age >= particle_age_max){
                    if(particle_age_death){
                        this.delete = true;
                    }else
                    if(particle_dead_color_reset){
                        this.age = 0;
                    }else{
                        this.age_const = true;
                    }
                }
            }
        }
    }

    this.show = function() {
        if (particle_show && !this.delete && this.vel.mag() > particle_show_only_moving) {
            // img_col = img.get(this.pos.x * diff.x / 3, this.pos.y * diff.y / 3);
            // fill(img_col[0], img_col[1], img_col[2], img_col[3]);
            strk = {
                r: particle_show_color_strk.r || 0,
                g: particle_show_color_strk.g || 0,
                b: particle_show_color_strk.b || 0,
                a: particle_show_color_strk.a || 255
            }
            fllc = {
                r: particle_show_color_fill.r || 0,
                g: particle_show_color_fill.g || 0,
                b: particle_show_color_fill.b || 0,
                a: particle_show_color_fill.a || 255
            }
            foca = {
                r: particle_show_color_fill_const_ang.r || 0,
                g: particle_show_color_fill_const_ang.g || 0,
                b: particle_show_color_fill_const_ang.b || 0,
                a: particle_show_color_fill_const_ang.a || 255
            }
            neg_oca = particle_show_color_ngtv_const_ang; //whether the particles over a onstant angle Spot shall be negatively colored
            oca = this.over_const_angle; //whether the current particle is over aconstant angle; see this.update
            neg_ac = particle_age_color_negation; //whether all age-depending color shall be negated
            neg_st = particle_age_color_anti_stroke; //whether the stroke shall be negated
            neg_fl = particle_age_color_anti_fill; //whether the fill shall be negated

            //color according to the age of this particle shall be gray
            if(particle_age_color_gray){
                if(xor([and([neg_oca, oca]), neg_ac])){
                    c = (1 - this.age / particle_age_max) * 255;
                }else{
                    c =      this.age / particle_age_max  * 255;
                }
                if(neg_st){   strka = (255 - c);   }else{     strka = (c);   }
                if(neg_fl){   fllca = (255 - c);   }else{     fllca = (c);   }
                stroke(strka);
                fill(fllca);
                color_mode = 'color: stroke: ' + str(strka) + '; fill: ' + str(fllca);
            }else
            //color according to the age of this particle shall be like particle_show_color_fill and *_strk tell
            if(particle_age_color_base_colors){
                //color negation due to anti stroke?
                if(xor([neg_st, neg_ac])){ strka = get_color_from_age(particle_age_max - this.age, strk);
                }else{                     strka = get_color_from_age(this.age, strk);
                }
                //color change due to constant angle?
                if(neg_oca && oca){ fllca = get_color_from_age(this.age, foca);
                }else{              fllca = get_color_from_age(this.age, fllc);
                }
                if(xor([neg_fl, neg_ac])){ fllca = negate_color(fllca);}
                stroke(strka.r, strka.g, strka.b, strka.a);
                fill(fllca.r, fllca.g, fllca.b, fllca.a);
                color_mode = 'color: stroke: ' + col_to_str(strka) + '; fill: ' + col_to_str(fllca);
            }else{
                color_mode = 'else';
                stroke(strk.r, strk.g, strk.b, strk.a);
                //color_negative in a non-grey context means that the foca is used
                if(neg_oca && oca){   fill(foca.r, foca.g, foca.b, foca.a);
                }else{                fill(fllc.r, fllc.g, fllc.b, fllc.a);
                }
                fllca = fllc;
            }
            x1 = this.pos.x * diff.x;
            y1 = this.pos.y * diff.y;
            r1 = particle_show_size;
            r2 = particle_show_size;
            x2 = this.vel.x * particle_show_stretch.x * diff.x;
            y2 = this.vel.y * particle_show_stretch.y * diff.y;
            if(particle_show_size_smooth_change > 0 && (this.prev_size.mag() > 0 || particle_show_size_begin_0)){
                // console.log('Particle/show/psssc: ', this.prev_size, particle_show_size_smooth_change, x2, y2);
                if(abs(x2 - this.prev_size.x) <  particle_show_size_smooth_change){ x2 = this.prev_size.x + particle_show_size_smooth_change;  }
                if(abs(x2 - this.prev_size.x) > -particle_show_size_smooth_change){ x2 = this.prev_size.x - particle_show_size_smooth_change;  }
                if(abs(y2 - this.prev_size.y) <  particle_show_size_smooth_change){ y2 = this.prev_size.y + particle_show_size_smooth_change;  }
                if(abs(y2 - this.prev_size.y) > -particle_show_size_smooth_change){ y2 = this.prev_size.y - particle_show_size_smooth_change;  }
            }
            x2 = (x2 >= particle_show_min_sizes.x ? x2 : particle_show_min_sizes.x);
            y2 = (y2 >= particle_show_min_sizes.y ? y2 : particle_show_min_sizes.y);
            if(particle_show_shape_flip){
                xx2 = y2;
                yy2 = x2;
            }else{
                xx2 = x2;
                yy2 = y2;
            }
            if(particle_show_shape.contains('square')){   rect(   x1, y1, r1,      r2);      }
            if(particle_show_shape.contains('rect')){     rect(   x1, y1, xx2,     yy2);      }
            if(particle_show_shape.contains('circle')){   ellipse(x1, y1, r1,      r2);      }
            if(particle_show_shape.contains('ellipse')){  ellipse(x1, y1, yy2,     xx2);      }
            if(particle_show_shape.contains('line')){
                stroke(fllca.r, fllca.g, fllca.b, fllca.a);
                                                   line(   x1, y1, x1 + xx2, y1 + yy2);
            }
            if(particle_show_size_smooth_change > 0){
                this.prev_size = createVector(x2, y2);
            }
        }
    }

    this.get_acc = function() {
        if(!this.delete){
            px = floor(this.pos.x);
            py = floor(this.pos.y);
            // console.log(px, py);
            this.over_const_angle = grid.G[px][py].const_angle;
            dir = grid.G[px][py].dir;
            if(this.over_const_angle){
                // console.log('get_acc: x:', px, ', y:', py, '; dir:', round_(dir.x, 3), ', ', round_(dir.y, 3));
            }
            return createVector(dir.x, dir.y); //making a copy so the dir of that Spot doesn't get linked but copied
        }
        return 0;
    }

    this.flow_on = function() {
        x = this.pos.x;
        y = this.pos.y;
        if(!(x < 0 || x > w || y < 0 || y > h)){
            return 0;
        }
        // if(particle_death_edge){
        //     this.delete = true;
        //     // console.log('edge-death: pos == (' + str(round_(x,3)) + ', ' + str(round_(y,3)) + ')');
        //     return 0;
        // }

        if(flow_on_redistribute == 'random'){
            while(x < 0 || x >= (w-1)){     x = random(0, w);            }
            while(y < 0 || y >= (h-1)){     y = random(0, h);            }
        }else
        if(flow_on_redistribute == 'noise'){
            while(x < 0 || x >= (w) || y < 0 || y >= (h)){
                if(flow_on_redistribute_noise == 'random'){
                    x = map(noise(random(0, 10)), 0, 1, 0, w);
                    y = map(noise(random(0, 10)), 0, 1, 0, h);
                }else{
                    x = map(noise(frameCount/flow_on_redistribute_noise),     0, 1, 0, w);
                    y = map(noise(frameCount/flow_on_redistribute_noise+100), 0, 1, 0, h);
                }
            }
        }else
        if(flow_on_redistribute == 'delete'){
            this.delete = true;
            return 0;
        }else{
            if(x < 0)       {           x = (w) + x % (w);      }else
            if(x >= (w-1))  {           x = /*0; //*/x % (w);       }
            if(y < 0)       {           y = (h) + y % (h);      }else
            if(y >= (h-1))  {           y = /*0; //*/y % (h);     }
        }

        // fill(220, 64);  noStroke();   ellipse(x * diff.x, y * diff.y, 20);
        // console.log('x, y:', x, y);

        //velocity update
        if(flow_on_stop_after){           this.vel = createVector();
        }else if(flow_on_set_new_vel){    this.vel = grid.G[floor(x)][floor(y)].dir; }
        this.pos.x = x;
        this.pos.y = y;
    }

    this.check_death = function(){
        if(this.delete){return 0; }
        if(particle_death_dist){
            for(i = this.i; i < P.length; i++){
                P_pos = P[i].pos;
                measure = dist(P_pos.x, P_pos.y, this.pos.x, this.pos.y);
                // if(random(0, 100) <= particle_death_percent && measure < particle_death_dist){
                    P[i].delete = true;
                // }
            }
        }else
        if(particle_death_percent){
            if(random(0, 100) <= particle_death_percent){
                this.delete = true;
            }
        }
        return 0;
    }
}
