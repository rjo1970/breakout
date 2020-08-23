import { BreakoutGame } from "./breakout_game"

class KeyboardReader {
    constructor() {
        this.LEFT = 37;
        this.RIGHT = 39;
        this.key_state = {};

        window.onkeydown = (e) => {
            this.key_state[e.keyCode] = true;
        };

        window.onkeyup = (e) => {
            this.key_state[e.keyCode] = false;
        }
    }

    is_down(key_code) {
        return this.key_state[key_code];
    }
}

class Breakout {
    constructor(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.game = new BreakoutGame(this.canvas);
        this.keyboard_reader = new KeyboardReader();
        this.game_loop_callback = () => this.game_loop();
    }

    game_loop() {
        this.screen_refresh();
        this.draw_blocks();
        this.draw_ball();
        this.draw_player();
        this.draw_score();
        this.draw_game_over();
        this.keyboard_tick();
        requestAnimationFrame(this.game_loop_callback);
    }

    keyboard_tick() {
        if (this.keyboard_reader.is_down(this.keyboard_reader.LEFT)) {
            this.game.tick("left");
        }
        else if (this.keyboard_reader.is_down(this.keyboard_reader.RIGHT)) {
            this.game.tick("right");
        }
        else {
            this.game.tick("");
        }
    }

    draw_game_over() {
        if (this.game.balls == 0) {
            this.ctx.fillStyle = 'yellow';
            this.ctx.font = "70pt Arial";
            this.ctx.fillText("Game Over", 60, 200);
        }
    }

    screen_refresh() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, 600, 400);
    }

    draw_blocks() {
        this.game.blocks.forEach((block, index, array) => {
            this.ctx.fillStyle = block.color;
            this.ctx.fillRect(block.x, block.y, 39, 19);
        });
    }

    draw_ball() {
        var ball = this.game.ball;
        this.ctx.fillStyle = 'white';
        if (this.game.balls > 0) {
            this.ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
        }
    }

    draw_player() {
        var player = this.game.player;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(player.x, player.y, player.size(), 5);
    }

    draw_score() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = "12pt Arial";
        this.ctx.fillText(`score: ${this.game.score} balls: ${this.game.balls}`, 10, 15);
    }
};

export { Breakout }