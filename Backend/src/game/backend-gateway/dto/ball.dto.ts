export class BallDto{
    ball_speed_x : number;
    ball_speed_y : number;
    diameter : number;
    x : number;
    y : number;

    constructor(ball_speed_x : number, ball_speed_y, diameter : number, x : number , y : number){
        this.ball_speed_x = ball_speed_x;
        this.ball_speed_y = ball_speed_y;
        this.diameter = diameter;
        this.x = x;
        this.y = y;
    }
}