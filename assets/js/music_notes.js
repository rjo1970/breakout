export class MusicNotes {
    /*
        Music note frequencies to play, using 1, 3, 5, 7th, and octave.
    */
    constructor() {
        this.A3 = 220;
        this.C4 = 261;
        this.E4 = 330;
        this.G4 = 392;
        this.B4 = 494;
        this.C5 = 523;
        this.E5 = 659;
        this.row_frequencies = [this.E5, this.C5, this.B4, this.G4, this.E4];
    }
}