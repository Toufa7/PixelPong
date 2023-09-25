
import ReactDOM from 'react-dom/client';
import p5Types from "p5"; //Import this for typechecking and intellisense
import { convertTypeAcquisitionFromJson, isConstructorDeclaration } from 'typescript';
import { screen_height , screen_width } from '../game_flow_sketch';
import { socket } from '../socket_setup/client-connect';


type coordinates ={
  x : number;
  y : number;
}


export class Paddle {

    public  dy : number = 10;
    public  ms_y : number = 0;


    public paddle_obj;
  
    public paddle_width : number;
    public paddle_height : number;
    public  radius_top_left = 6;
    public radius_top_right = 6;
    public color = "";
    // public palyer_system : player_System;
  
    public pos : p5Types.Vector;
    
    
      public constructor(c_x : number , pd_w : number , pd_h : number , c_y : number , p5_ob : p5Types, /*health_sys : player_System*/){
          this.paddle_obj = p5_ob;

          // this.corrd_x = c_x;
          // this.corrd_y = c_y;

          this.paddle_width = pd_w;
          this.paddle_height = pd_h;
          this.pos = this.paddle_obj.createVector(c_x,c_y);
        //   this.palyer_system = health_sys;
      }

    //   public calculate_index(health_points : number) : number{
    //         let clone_dig : string =  String(health_points)[0];
    //         let nb = Number(clone_dig[0]);
    //         return (nb);
    //   }
  
      public draw_paddle(color : string){

        // let ac_y = this.paddle_obj.constrain(cr_y,0,screen_height - this.paddle_height);
        // this.corrd_x = cr_x;
        // this.corrd_y = cr_y;

        if (this.pos.y < 0){
          this.pos.y = 0;
        }
        if (this.pos.y > screen_height - this.paddle_height){
            this.pos.y = screen_height - this.paddle_height;
        }

        //p- rect parameters

        this.paddle_obj.fill(color);
        this.paddle_obj.rect(this.pos.x,this.pos.y,this.paddle_width,this.paddle_height,this.radius_top_left,this.radius_top_left);

        //p- sprite parameters
        
        // this.paddle_obj.image(paddle_sprite,this.pos.x,this.pos.y,this.paddle_width,this.paddle_height);
      }
  
      public get_points() : {left : number , right : number , top : number , bottom  : number} {
        return ({
          left : this.pos.x - this.paddle_width / 2,
          right : this.pos.x + this.paddle_width / 2,
          top : this.pos.y - this.paddle_height / 2,
          bottom : this.pos.y + this.paddle_height / 2
      });
    }

    public generate_coordinates_emit(){
      let data : coordinates = {
        x : this.pos.x,
        y : this.pos.y
      }
      socket?.emit("coordinates",data);
    }
  
      public  update_paddle(canvas:any){
  
        if (this.paddle_obj.keyIsPressed){
          if (this.paddle_obj.keyCode === (this.paddle_obj.DOWN_ARROW)){
                this.pos.y += this.dy;
          }
          else if (this.paddle_obj.keyCode === (this.paddle_obj.UP_ARROW)){
            this.pos.y -= this.dy;
          }
        }
        canvas.mouseMoved((event : any) => {
          this.ms_y = event.layerY;
          this.pos.y = this.ms_y;
        })
        
        // console.log("[ x : " + this.pos.x + " , " + " y : " + this.pos.y + " ] ");

        this.draw_paddle(this.color);
      }
      
  }