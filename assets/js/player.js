const VELOCITY = 8;

export class Player {
    constructor(canvas_width, canvas_height, paddle_size) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.paddle_size = paddle_size;
        this.x = (canvas_width / 2) - (paddle_size / 2);
        this.y = Math.floor(this.canvas_height * 0.95);
    }

    size() {
        return this.paddle_size;
    }

    velocity() {
        return VELOCITY;
    }

    update(input) {
        if (input === 'left') {
            this.move_left();
        }
        if (input === 'right') {
            this.move_right();
        }
    }

    move_right() {
        if (this.x < (this.canvas_width - this.paddle_size / 2)) {
            this.x += VELOCITY;
        }
    }

    move_left() {
        if (this.x > 0 - this.paddle_size / 2) {
            this.x -= VELOCITY;
        }
    }
}
