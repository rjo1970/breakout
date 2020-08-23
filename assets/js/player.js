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

    update(input) {
        if (input === 'left') {
            this.move_left();
        }
        if (input === 'right') {
            this.move_right();
        }
    }

    move_right() {
        if (this.x < (this.canvas_width - this.paddle_size)) {
            this.x += 5;
        }
    }

    move_left() {
        if (this.x > 0) {
            this.x -= 5;
        }
    }
}
