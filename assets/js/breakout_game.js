class Block {
    constructor(x, y, color, score_value) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.score_value = score_value;
    }
};

export class BreakoutGame {
    constructor(ball_x, ball_y) {
        this.score = 0;
        this.blocks = [];
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.ball_x_accel = 0.1;
        this.ball_y_accel = 0.1;
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
            for (var col = 0; col < 16; ++col) {
                this.blocks.push(new Block(xs[col], y, color, score_value));
            }
        }
    }
};
