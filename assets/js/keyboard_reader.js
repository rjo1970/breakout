export class KeyboardReader {
    constructor() {
        this.LEFT = 37;
        this.RIGHT = 39;
        this.SPACE = 32;
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
