import { BreakoutGame } from "./breakout_game"
import { KeyboardReader } from "./keyboard_reader"
import { Sound } from "./sound";

export class Breakout {
    constructor(canvas_id) {
        this.setup_canvas(canvas_id);
        this.create_audio_context();
        this.setup_sound();
        this.game = new BreakoutGame(this.canvas, this.sound_ctor);
        this.game.balls = 0;
        this.keyboard_reader = new KeyboardReader();
        this.game_loop_callback = () => this.game_loop();
    }

    create_audio_context() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audio_context = new AudioContext();
    }

    setup_sound() {
        this.sound_ctor = (frequency, duration) => new Sound(this.audio_context, frequency, duration);
        this.sounds = [];
    }

    setup_canvas(canvas_id) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d")
    }

    game_loop() {
        this.draw_screen();
        this.keyboard_tick();
        this.play_sounds();
        requestAnimationFrame(this.game_loop_callback);
    }

    draw_screen() {
        this.screen_refresh();
        this.draw_blocks();
        this.draw_ball();
        this.draw_player();
        this.draw_score();
        this.draw_game_over();
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
            this.ctx.font = "64pt Orbitron";
            this.ctx.fillText("Game Over", 35, 200);
        }
    }

    screen_refresh() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, 600, 400);
    }

    draw_blocks() {
        this.game.blocks.forEach((block) => {
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
        this.ctx.font = "12pt Orbitron";
        this.ctx.fillText(`score: ${this.game.score}  balls: ${this.game.balls}  cleared screens: ${this.game.screens_cleared}`, 10, 15);
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