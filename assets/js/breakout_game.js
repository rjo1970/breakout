import { Ball } from "./ball";
import { Player } from "./player";
import { Block } from "./block";

const paddle_size = 60;
const invincible = false;

/*
Music note frequencies to play, using 1, 3, 5, 7th, and octave.
*/
const A3 = 220;
const C4 = 261;
const E4 = 330;
const G4 = 392;
const B4 = 494;
const C5 = 523;
const E5 = 659;

export class BreakoutGame {
    constructor(canvas, sound_constructor) {
        this.screens_cleared = 0;
        this.scheduled_sounds = [];
        this.sound_constructor = sound_constructor;
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
        const row_frequencies = [E5, C5, B4, G4, E4];
        const colors = ['green', 'blue', 'yellow', 'red', 'orange']
        for (var row = 0; row < 4; ++row) {
            var color = colors[row];
            var y = (row + 1) * 20;
            var score_value = 100 - y;
            for (var col = 0; col < 15; ++col) {
                this.blocks.push(new Block(xs[col], y, color, score_value, row_frequencies[row]));
            }
        }
    }

    pop_scheduled_sounds() {
        const sounds = this.scheduled_sounds || [];
        this.scheduled_sounds = [];
        return sounds;
    }

    tick(input) {
        this.collision_detect();
        if (this.need_blocks()) {
            this.populate_blocks();
            this.balls += 1;
            this.screens_cleared += 1;
        }
        this.ball.update();
        this.player.update(input);
    }

    need_blocks() {
        return this.blocks.length == 0 && this.ball.y > 100;
    }

    check_screen_completion() {
        if (this.need_blocks()) {
            this.populate_blocks();
            this.balls += 1;
            this.screens_cleared += 1;
            this.player.shrink_paddle();
        }
    }

    collision_detect() {
        this.check_block_collision();
        if (this.ball.touches_player(this.player)) {
            this.schedule_sound(A3);
            this.ball.bounce_y();
            if (!(this.ball.x > this.player.x + this.player.size() / 2)) {
                this.ball.paddle_bounce_x(this.player);
            }
            return;
        }
        if (this.ball.x_edge_detected()) {
            this.schedule_sound(C4);
            this.ball.bounce_x();
        }
        if (this.ball.y_edge_detected()) {
            this.schedule_sound(C4);
            this.ball.bounce_y();
        }
        if (this.ball.is_lost()) {
            this.new_life();
        }
    }

    check_block_collision() {
        var hit_blocks = this.blocks.filter(block => block.hit_by(this.ball));
        if (hit_blocks.length > 0) {
            var target = hit_blocks[0];
            this.schedule_sound(target.sound_frequency);
            this.score += target.score_value;
            this.blocks = this.blocks.filter(block => block !== target);
            this.ball.bounce_y();
        }
    }

    game_over() {
        return this.balls == 0;
    }

    new_life() {
        if (!this.game_over()) {
            this.balls -= 1;
        }
        if (!this.game_over()) {
            this.ball.reset();
        }
    }

    schedule_sound(frequency) {
        if (this.ball.in_screen()) {
            var sound = this.sound_constructor(frequency, 10);
            this.scheduled_sounds.push(sound);
        }
    }
};
