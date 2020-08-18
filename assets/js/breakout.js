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
        this.setup();
    }

    setup() {

    }

    game_loop() {
        this.screen_refresh();
        this.draw_blocks();
        this.draw_ball();
        this.draw_player();
        if (this.keyboard_reader.is_down(this.keyboard_reader.LEFT)) {
            this.game.tick("left");
        } else if (this.keyboard_reader.is_down(this.keyboard_reader.RIGHT)) {
            this.game.tick("right");
        } else {
            this.game.tick("");
        }

        // re-schedule yourself.
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
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.game.ball_x, this.game.ball_y, 10, 10);
    }

    draw_player() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.game.player_x, this.game.player_y, 40, 5);
    }
};

export { Breakout }