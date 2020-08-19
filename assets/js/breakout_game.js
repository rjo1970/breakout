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
        this.height = canvas.height;
        this.width = canvas.width;
        this.score = 0;
        this.blocks = [];
        this.ball_x = this.width / 2;
        this.ball_y = this.height / 2;
        this.ball_x_veloc = 4;
        this.ball_y_veloc = 4;
        this.player_x = 300;
        this.player_y = this.height * 0.95;
        this.populate_blocks();
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

        this.ball_x += this.ball_x_veloc;
        this.ball_y += this.ball_y_veloc;
    }

    collision_detect() {
        if (this.x_edge_detected()) {
            this.ball_x_veloc *= -1;
        }
        if (this.y_edge_detected()) {
            this.ball_y_veloc *= -1;
        }
    }

    y_edge_detected() {
        return this.ball_y >= this.height - 15 || this.ball_y <= 0;
    }

    x_edge_detected() {
        return this.ball_x >= this.width - 10 || this.ball_x <= 0;
    }

    update_player(input) {
        if (input === 'left') {
            this.player_x -= 4;
        }
        if (input === 'right') {
            this.player_x += 4;
        }
    }
};
