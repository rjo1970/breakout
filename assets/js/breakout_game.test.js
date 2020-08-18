import { BreakoutGame } from './breakout_game';

var game;

beforeEach(() => {
    const canvas = { width: 600, height: 400 };
    game = new BreakoutGame(canvas);
})

test('a game starts with a zero score', () => {
    expect(game.score).toBe(0);
});

test('a game has an array of blocks to knock down', () => {
    expect(game.blocks).toHaveLength(60);
});

test('all blocks have their x, y, and color defined', () => {
    game.blocks.forEach((block, index, array) => {
        expect(block.x).toBeDefined();
        expect(block.y).toBeDefined();
        expect(block.color).toBeDefined();
    });
});

test('blocks have a score', () => {
    expect(game.blocks[0].score_value).toBe(100);
});

test('tick moves the ball', () => {
    const starting_pos = [game.ball_x, game.ball_y];
    game.tick('');
    expect(starting_pos[0]).not.toBe(game.ball_x);
    expect(starting_pos[1]).not.toBe(game.ball_y);
});


