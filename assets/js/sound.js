export class Sound {
    constructor(audio_context, frequency, duration) {
        this.frequency = frequency;
        this.duration = duration;
        this.ctx = audio_context;
        this.oscillator = this.ctx.createOscillator();
        this.playing = false;
    }

    play() {
        this.oscillator.type = 'square';
        this.oscillator.frequency.setValueAtTime(this.frequency, this.ctx.currentTime); // value in hertz
        this.oscillator.connect(this.ctx.destination);
        this.oscillator.start();
        this.playing = true;
    }

    tick() {
        this.duration -= 1;
        if (this.duration == 0) {
            this.stop();
        }
    }

    stop() {
        this.oscillator.stop();
        this.playing = false;
    }
}