const ball_size = 10;
const paddle_size = 60;
const invincible = false;

class Block {
    constructor(x, y, color, score_value) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.score_value = score_value;
    }
};

export class BreakoutGame {
    constructor(canvas) {
        this.balls = 3;
        this.height = canvas.height;
        this.width = canvas.width;
        this.paddle_size = paddle_size;
        this.score = 0;
        this.blocks = [];
        this.player_x = 445;
        this.player_y = this.height * 0.95;
        this.reset_ball();
        this.populate_blocks();
    }

    reset_ball() {
        this.ball_x = this.width / 2;
        this.ball_y = this.height / 3;
        this.ball_x_veloc = 4;
        this.ball_y_veloc = 4;
    }

    player_size() {
        return paddle_size;
    }

    ball_size() {
        return ball_size;
    }

    populate_blocks() {
        // This knows about the overall geometry of the context
        // so pull it out.
        const xs = [0, 40, 80, 120, 160, 200, 240, 280,
            320, 360, 400, 440, 480, 520, 560]
        const colors = ['green', 'blue', 'yellow', 'red', 'orange']
        for (var row = 0; row < 4; ++row) {
            var color = colors[row];
            var y = row * 20;
            var score_value = 100 - y;
            for (var col = 0; col < 15; ++col) {
                this.blocks.push(new Block(xs[col], y, color, score_value));
            }
        }
    }

    tick(input) {
        // update ball
        this.update_ball();

        // update player
        this.update_player(input);
    }

    update_ball() {
        this.collision_detect();

        if (!this.ball_lost()) {
            this.ball_x += this.ball_x_veloc;
            this.ball_y += this.ball_y_veloc;
        }
    }

    collision_detect() {
        if (this.ball_touches_player()) {
            this.reverse_ball_y();
            return;
        }
        if (this.x_edge_detected()) {
            this.reverse_ball_x();
        }
        if (this.y_edge_detected()) {
            this.reverse_ball_y();
        }
        if (this.ball_lost()) {
            this.new_life();
        }
    }

    new_life() {
        if (this.balls > 0) {
            this.balls -= 1;
        }
        if (this.balls > 0) {
            this.reset_ball();
        }
    }


    reverse_ball_x() {
        this.ball_x_veloc *= -1;
    }

    reverse_ball_y() {
        this.ball_y_veloc *= -1;
    }

    ball_touches_player() {
        return this.ball_x >= this.player_x &&
            this.ball_x <= this.player_x + paddle_size &&
            this.ball_y >= this.player_y &&
            this.ball_y <= this.player_y + ball_size;
    }

    y_edge_detected() {
        return (invincible && this.ball_y >= this.height + ball_size) || this.ball_y <= 0;
    }

    x_edge_detected() {
        return this.ball_x >= this.width - ball_size || this.ball_x <= 0;
    }

    ball_lost() {
        return this.ball_y > this.height * 2;
    }

    update_player(input) {
        if (input === 'left') {
            this.move_player_left();
        }
        if (input === 'right') {
            this.move_player_right();
        }
    }

    move_player_right() {
        if (this.player_x < this.width - paddle_size) {
            this.player_x += 5;
        }
    }

    move_player_left() {
        if (this.player_x > 0) {
            this.player_x -= 5;
        }
    }
};
