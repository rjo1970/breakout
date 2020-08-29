const width = 40;
const height = 20;

export class Block {
    constructor(x, y, color, score_value, sound_frequency) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.sound_frequency = sound_frequency;
        this.score_value = score_value;
    }

    hit_by(ball) {
        return ball.x >= this.x &&
            ball.x <= this.x + width &&
            ball.y >= this.y &&
            ball.y <= this.y + height;
    }
}