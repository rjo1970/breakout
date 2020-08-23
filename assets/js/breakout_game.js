import { Ball } from "./ball";
import { Player } from "./player";

const paddle_size = 60;
const invincible = true;

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
        this.score = 0;
        this.blocks = [];
        this.populate_blocks();
        this.ball = new Ball(canvas.width, canvas.height, invincible);
        this.player = new Player(canvas.width, canvas.height, paddle_size);
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
        this.collision_detect();
        this.ball.update();
        this.player.update(input);
    }

    collision_detect() {
        if (this.ball.touches_player(this.player)) {
            this.ball.bounce_y();
            return;
        }
        if (this.ball.x_edge_detected()) {
            this.ball.bounce_x();
        }
        if (this.ball.y_edge_detected()) {
            this.ball.bounce_y();
        }
        if (this.ball.is_lost()) {
            this.new_life();
        }
    }

    new_life() {
        if (this.balls > 0) {
            this.balls -= 1;
        }
        if (this.balls > 0) {
            this.ball.reset();
        }
    }
};
