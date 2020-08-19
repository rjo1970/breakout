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

test('tick reverses movement of the ball if it hits the x edge', () => {
    game.ball_x = 600
    game.ball_y = 100
    game.tick('');
    expect(game.ball_x_veloc).toBe(-4);
    expect(game.ball_y_veloc).toBe(4);
    expect(game.ball_x).toBe(596);
});

test('tick reverses movement of the ball if it hits the y edge, player not involved.', () => {
    game.player_x = 0;
    game.ball_x = 200;
    game.ball_y = 410;
    game.tick('');
    expect(game.ball_x_veloc).toBe(4);
    expect(game.ball_y_veloc).toBe(-4);
    expect(game.ball_y).toBe(406);
});

test('bounces off the player paddle (left edge)', () => {
    game.ball_x = game.player_x;
    game.ball_y = game.player_y;
    game.tick('');
    expect(game.ball_x_veloc).toBe(4);
    expect(game.ball_y_veloc).toBe(-4);
    expect(game.ball_y).toBe(376);
});

test('bounces off the player paddle (right edge)', () => {
    game.ball_x = game.player_x + 39;
    game.ball_y = game.player_y;
    game.tick('');
    expect(game.ball_x_veloc).toBe(4);
    expect(game.ball_y_veloc).toBe(-4);
    expect(game.ball_y).toBe(376);
});


test('does not bounce left of the paddle', () => {
    game.ball_x = game.player_x - 20;
    game.ball_y = game.player_y;
    game.tick('');
    expect(game.ball_x_veloc).toBe(4);
    expect(game.ball_y_veloc).toBe(4);
    expect(game.ball_y).toBe(384);
});

test('does not bounce just right of the paddle', () => {
    game.ball_x = game.player_x + 41;
    game.ball_y = game.player_y;
    game.tick('');
    expect(game.ball_x_veloc).toBe(4);
    expect(game.ball_y_veloc).toBe(4);
    expect(game.ball_y).toBe(384);
});