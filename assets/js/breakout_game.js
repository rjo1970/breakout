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

        this.score = 0;
        this.blocks = [];
        this.ball_x = canvas.width / 2;
        this.ball_y = canvas.height / 2;
        this.ball_x_veloc = 1;
        this.ball_y_veloc = 1;
        this.player_x = 300;
        this.player_y = canvas.height * 0.95;
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
        this.ball_x += this.ball_x_veloc;
        this.ball_y += this.ball_y_veloc;
    }

    update_player(input) {
        if (input === 'left') {
            this.player_x -= 2;
        }
        if (input === 'right') {
            this.player_x += 2;
        }
    }
};
