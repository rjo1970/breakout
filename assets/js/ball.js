const VELOCITY = 3;
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

    paddle_bounce_x(player) {
        const half_paddle = player.size() / 2;
        const step_size = player.size() / 8;
        const ideal_x = player.x + half_paddle;
        const accuracy_score = Math.floor(Math.abs(this.x - ideal_x) / step_size);
        const veloc = 6 + accuracy_score;
        if (this.x_veloc > 0) {
            this.x_veloc = veloc;
        } else {
            this.x_veloc = -1 * veloc;
        }
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
            this.y <= player.y + this.size &&
            this.y_veloc > 0;
    }

    y_edge_detected() {
        return (this.invincible && this.y >= this.canvas_height - this.size) || (this.y <= 0 && this.y_veloc < 0);
    }

    x_edge_detected() {
        if (this.x < 0 && this.x_veloc <= 0) {
            return true;
        }
        if (this.x > this.canvas_width - this.width && this.x_veloc >= 0) {
            return true;
        }

        const bounce_left = (this.x >= this.canvas_width - this.size);
        const bounce_right = (this.x <= 0);
        return bounce_left || bounce_right;
    }

    is_lost() {
        // side effect is this "waits" until the ball falls a while
        // before creating a new ball.
        return this.y > this.canvas_height * 2;
    }

    in_screen() {
        return this.x <= this.canvas_width &&
            this.x >= this.size * -1 &&
            this.y <= this.canvas_height &&
            this.y >= 0;
    }

}