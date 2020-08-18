import { BreakoutGame } from './breakout_game';

var game;

beforeEach(() => {
    game = new BreakoutGame(200, 200);
})

test('a game starts with a zero score', () => {
    expect(game.score).toBe(0);
});

test('a game has an array of blocks to knock down', () => {
    expect(game.blocks.length).toBe(64);
});
