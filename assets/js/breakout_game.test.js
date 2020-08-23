import { BreakoutGame } from './breakout_game';

var game;

beforeEach(() => {
    const canvas = { width: 600, height: 400 };
    game = new BreakoutGame(canvas);
});

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
    const starting_pos = [game.ball.x, game.ball.y];
    game.tick('');
    expect(starting_pos[0]).not.toBe(game.ball.x);
    expect(starting_pos[1]).not.toBe(game.ball.y);
});

test('tick reverses movement of the ball if it hits the x edge', () => {
    game.ball.x = 600
    game.ball.y = 100
    game.ball.x_veloc = 4;
    game.tick('');
    expect(game.ball.y_veloc).toBe(4);
    expect(game.ball.x_veloc).toBe(-4);
    expect(game.ball.x).toBe(596);
});

test('tick reverses movement of the ball if it hits the y edge, player not involved.', () => {
    game.ball.y_veloc = -4;
    game.ball.x = 200;
    game.ball.y = 0;
    game.tick('');
    expect(game.ball.y_veloc).toBe(4);
    expect(game.ball.y).toBe(4);
});

test('bounces off the player paddle (left edge)', () => {
    game.ball.x = game.player.x;
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(-4);
    expect(game.ball.y).toBe(376);
});

test('bounces off the player paddle (right edge)', () => {
    game.ball.x = game.player.x + game.player.size();
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(-4);
    expect(game.ball.y).toBe(376);
});


test('does not bounce left of the paddle', () => {
    game.ball.x = game.player.x - 20;
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(4);
    expect(game.ball.y).toBe(384);
});

test('does not bounce just right of the paddle', () => {
    game.ball.x = game.player.x + game.player.size() + 1;
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(4);
    expect(game.ball.y).toBe(384);
});

test('losing a life', () => {
    game.new_life();
    expect(game.balls).toBe(2);
    expect(game.ball.x).toBe(300);
    expect(Math.floor(game.ball.y)).toBe(133);
    expect(game.ball.y_veloc).toBe(4);
});

test('losing the last life', () => {
    game.balls = 1;
    game.new_life();
    expect(game.balls).toBe(0);
});