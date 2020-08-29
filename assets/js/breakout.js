import { BreakoutGame } from "./breakout_game"
import { KeyboardReader } from "./keyboard_reader"
import { Sound } from "./sound";

class Breakout {
    constructor(canvas_id) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audio_context = new AudioContext();
        this.sound_ctor = (frequency, duration) => new Sound(this.audio_context, frequency, duration);
        this.sounds = [];
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.game = new BreakoutGame(this.canvas, this.sound_ctor);
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
        this.play_sounds();
        requestAnimationFrame(this.game_loop_callback);
    }

    keyboard_tick() {
        if (this.keyboard_reader.is_down(this.keyboard_reader.LEFT)) {
            this.game.tick("left");
        }
        else if (this.keyboard_reader.is_down(this.keyboard_reader.RIGHT)) {
            this.game.tick("right");
        }
        else if (this.keyboard_reader.is_down(this.keyboard_reader.SPACE) && this.game.game_over()) {
            this.game = new BreakoutGame(this.canvas, this.sound_ctor);
        }
        else {
            this.game.tick("");
        }
    }

    draw_game_over() {
        if (this.game.game_over()) {
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
        if (!this.game.game_over()) {
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

    play_sounds() {
        this.sounds.forEach((sound) => {
            sound.tick();
        });

        this.sounds.filter(sound => sound.playing);

        const new_sounds = this.game.pop_scheduled_sounds();
        new_sounds.forEach((sound) => {
            this.sounds.push(sound);
            sound.play();
        });
    }
};

export { Breakout }