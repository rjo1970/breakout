import { BreakoutGame } from "./breakout_game"

var breakout = {
    start: function (canvas_id) {
        var canvas = document.getElementById(canvas_id)
        var ctx = canvas.getContext("2d")
        var game = new BreakoutGame(200, 200);
        this.setup(canvas, ctx, game);
        this.game_loop(canvas, ctx, game);
    },

    setup: function (canvas, ctx, game) {
    },

    draw_board: function (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 600, 400);

        // This is the first logic to get pushed down into Game: blocks get initiated
        // just like this, but not applied with a context.
        // {color: color, pos: [x, y], size: [39, 19] (const), score: 100 - row * 20}
        const xs = [0, 40, 80, 120, 160, 200, 240, 280,
            320, 360, 400, 440, 480, 520, 560]
        const colors = ['green', 'blue', 'yellow', 'red', 'orange']
        for (var row = 0; row < 4; ++row) {
            var color = colors[row];
            ctx.fillStyle = color;
            for (var col = 0; col < 16; ++col) {
                ctx.fillRect(xs[col], row * 20, 39, 19);
            }
        }

        ctx.fillStyle = 'white';
        ctx.fillRect(260, 260, 10, 10);

        ctx.fillRect(360, 370, 40, 5);
    },

    game_loop: function (canvas, ctx, game) {
        this.draw_board(ctx);
    }
}

export { breakout }