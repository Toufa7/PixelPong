
import ReactDOM from 'react-dom/client';
import p5Types from "p5"; //Import this for typechecking and intellisense
import { convertTypeAcquisitionFromJson, isConstructorDeclaration } from 'typescript';
import {ball_asset, height, socket_gm, width} from '../game_flow_sketch';
// import { socket } from '../socket_setup/client-connect';
import { Paddle } from './paddle.class';
// import { socket } from '../socket_setup/client-connect';

//h----------------------------- Ball --------------------------------

    export class Ball{

        public corrd_x : number;
        public corrd_y : number;
        public diameter : number;
        public ball_speed_x : number;
        public ball_speed_y : number;
        public rt : boolean;
        public collision_front : boolean;
    
        
        public ball_ob;
        public  r : number;
    
        public pos : p5Types.Vector;

    
        public constructor(cr_x : number , cr_y : number , dia : number ,  bl : p5Types,ball_speed_x : number,ball_speed_y : number){
            this.ball_ob = bl;

            this.corrd_x = cr_x;
            this.corrd_y = cr_y;
            this.ball_speed_x = ball_speed_x;
            this.ball_speed_y = ball_speed_y;
            this.diameter  = dia;
            this.r = 0;
            this.collision_front = false;
            this.pos = this.ball_ob.createVector(cr_x,cr_y);
            this.rt = false;
        }

        public draw_the_ball(color : string){
    
            //p- ellipse parameters
    
            // this.ball_ob.fill(color);
            // this.ball_ob.strokeWeight(2);
            // this.ball_ob.ellipse(this.pos.x,this.pos.y,this.diameter,this.diameter);
    
            //p- sprite parameters
    
            this.ball_ob.image(ball_asset,this.pos.x,this.pos.y,this.diameter,this.diameter);
        }

        public get_points() : {left : number , right : number , top : number , bottom  : number} {
            return ({
                left : (this.pos.x - this.diameter / 2),
                right : (this.pos.x + this.diameter / 2),
                top : (this.pos.y - this.diameter /2) , 
                bottom : (this.pos.y + this.diameter / 2)
            });
        }

        public check_collision(paddle : Paddle,ai_paddle : Paddle) : boolean{
            this.rt = this.check_collision_of_ball_pd(paddle,ai_paddle);
    
            let by = this.ball_ob.constrain(this.pos.y,0,height - 5);
    
            if(this.get_points().top < 0){
                this.pos.y = by;
                this.pos.x = this.pos.x + 8;
                this.ball_speed_y = -this.ball_speed_y;
            }
            if (this.get_points().bottom > height){
                this.pos.y = by;
                this.pos.x = this.pos.x - 8;
                this.ball_speed_y = -this.ball_speed_y;
            }
    
            return (this.rt);
        }

    
        public check_collision_core(radius : number , pos : p5Types.Vector , 
        pos_ai : p5Types.Vector, ph : number , ph_ai : number , pw : number, pw_ai : number) : boolean{
    
        for(let i = 0; i < 16 ; i++){
            let degree = (i * 22.5) * (this.ball_ob.PI / 180);

            let x_ball = radius * (this.ball_ob.cos(this.pos.x + degree)) + this.pos.x;
            let y_ball = radius * (this.ball_ob.sin(this.pos.y + degree)) + this.pos.y;
    
            if (((x_ball > pos.x && x_ball < pos.x + pw && y_ball > pos.y && y_ball < pos.y + ph) 
            || (x_ball > pos_ai.x && x_ball < pos_ai.x + pw_ai && y_ball > pos_ai.y && y_ball < pos_ai.y + ph_ai))){
                if (x_ball < width / 2){
                    console.log("hit left half")
                    if(y_ball > (pos.y + 15) && y_ball < (pos.y + ph - 11)){
                        console.log("hit mid !!");
                        this.pos.x = this.pos.x + 8;
                        this.ball_speed_x = -this.ball_speed_x;
                        // this.collision_front = true;
                        return(true);
                    }
                    else{
                        console.log("hit corner !!");
                        console.log(pos.y);
                        this.pos.x = this.pos.x + 8;
                        this.ball_speed_x = -this.ball_speed_x;
    
                        this.r = this.ball_ob.random(0,2);
                        console.log("r--->" + this.r);
                        // if (Math.floor(this.r))
                        //     this.ball_speed_y = -this.ball_speed_y;
                        // this.collision_front = true;
                        return(true);
                    }
                }
                else{
                    console.log("right half");
                    if(y_ball > (pos_ai.y + 15) && y_ball < (pos_ai.y + ph_ai - 11)){
                        this.pos.x = this.pos.x - 8;
                      // this.collision_happend = true;
                        this.ball_speed_x = -this.ball_speed_x;
                        console.log("---hit mid !!");
                        // this.collision_front = true;
                        return(false);
                    }
                    else{
                      // this.collision_happend = true;
                        this.pos.x = this.pos.x - 8;
                        console.log("---hit corner !!");
                        this.ball_speed_x = -this.ball_speed_x;
    
                        this.r = this.ball_ob.random(0,2);
                        console.log("r--->" + this.r);
                        // if (Math.floor(this.r))
                        //     this.ball_speed_y = -this.ball_speed_y;
                        // this.collision_front = true;
                        return(false);
                    }
    
                    }
                }
            }
            return (false);
        }
    
        public check_collision_of_ball_pd(paddle : Paddle,ai_paddle : Paddle){
            let pos = paddle.pos;
            let pw = paddle.paddle_width;
            let ph = paddle.paddle_height;
    
            let pos_ai = ai_paddle.pos;
            let pw_ai = ai_paddle.paddle_width;
            let ph_ai = ai_paddle.paddle_height;
            let radius = this.diameter / 2;

            return (this.check_collision_core(radius,pos,pos_ai,ph,ph_ai,pw,pw_ai));
        }
    
        public update_pos(Player_id :string ,P1 : any , P2 : any,width : number, height : number, Ball1_diameter : number , Ball2_diameter : number,Player1_paddle : Paddle , Player2_paddle : Paddle){
            if (Player_id != P2.id){
                console.log("Im Player 1 emitting no Player 2");

                socket_gm?.emit("Ball_movement",{Scaled_width : width , Scaled_height : height, Ball_P1_diameter : Ball1_diameter , Ball_P2_diameter : Ball2_diameter,
                    P1_paddle_x : Player1_paddle.pos.x , P1_paddle_y : Player1_paddle.pos.y , P1_paddle_width : Player1_paddle.paddle_width , P1_paddle_height : Player1_paddle.paddle_height,
                    P2_paddle_x : Player2_paddle.pos.x , P2_paddle_y : Player2_paddle.pos.y , P2_paddle_width : Player2_paddle.paddle_width , P2_paddle_height : Player2_paddle.paddle_height});
            }

            this.draw_the_ball("#e9ed09");
        }
    
    }
