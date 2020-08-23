const VELOCITY = 4;
const BALL_SIZE = 10;

export class Ball {
    constructor(canvas_width, canvas_height, invincible) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.size = BALL_SIZE;
        this.invincible = invincible;
        this.reset();
    }

    reset() {
        this.x = Math.floor(this.canvas_width / 2);
        this.y = Math.floor(this.canvas_height / 3);
        this.x_veloc = VELOCITY;
        if (Math.random() > 0.5) {
            this.bounce_x();
        }
        this.y_veloc = VELOCITY;
    }

    bounce_x() {
        this.x_veloc *= -1;
    }

    bounce_y() {
        this.y_veloc *= -1;
    }

    update() {
        if (!this.is_lost()) {
            this.x += this.x_veloc;
            this.y += this.y_veloc;
        }
    }

    touches_player(player) {
        return this.x >= player.x &&
            this.x <= player.x + player.paddle_size &&
            this.y >= player.y &&
            this.y <= player.y + this.size;
    }

    y_edge_detected() {
        return (this.invincible && this.y >= this.canvas_height + this.size) || this.y <= 0;
    }

    x_edge_detected() {
        return this.x >= this.canvas_width - this.size || this.x <= 0;
    }

    is_lost() {
        // side effect is this "waits" until the ball falls a while
        // before creating a new ball.
        return this.y > this.canvas_height * 2;
    }

}