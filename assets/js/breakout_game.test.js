import { BreakoutGame } from './breakout_game';
import { Block } from './block';

var game;

beforeEach(() => {
    const canvas = { width: 600, height: 400 };
    const fake_sound_ctor = (frequency, duration) => { };
    game = new BreakoutGame(canvas, fake_sound_ctor);
});

test('a game starts with a zero score', () => {
    expect(game.score).toBe(0);
});

test('a game has an array of blocks to knock down', () => {
    expect(game.blocks).toHaveLength(60);
});

test('a ball below the targets and no targets results in a new screen', () => {
    game.blocks = [];
    game.ball.y = 120;
    game.tick('');

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
    expect(game.blocks[0].score_value).toBe(80);
});

test('tick moves the ball', () => {
    const starting_pos = [game.ball.x, game.ball.y];
    game.tick('');
    expect(starting_pos[0]).not.toBe(game.ball.x);
    expect(starting_pos[1]).not.toBe(game.ball.y);
});

test('tick reverses movement of the ball if it hits the x edge', () => {
    game.ball.x = 600
    game.ball.y = 120
    game.ball.x_veloc = 4;
    game.tick('');
    expect(game.ball.y_veloc).toBe(3);
    expect(game.ball.x_veloc).toBe(-4);
    expect(game.ball.x).toBe(596);
    expect(game.pop_scheduled_sounds()).toHaveLength(1);
});

test('tick reverses movement of the ball if it hits the y edge, player not involved.', () => {
    game.ball.y_veloc = -4;
    game.ball.x = 200;
    game.ball.y = 0;
    game.blocks = [];
    game.tick('');
    expect(game.ball.y_veloc).toBe(4.04);
    expect(game.ball.y).toBe(4.04);
    expect(game.pop_scheduled_sounds()).toHaveLength(1);
});

test('bounces off the player paddle (left edge)', () => {
    game.ball.x = game.player.x;
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(-3.0300000000000002);
    expect(game.ball.y).toBe(376.97);
    expect(game.pop_scheduled_sounds()).toHaveLength(1);
});

test('bounces off the player paddle (right edge)', () => {
    game.ball.x = game.player.x + game.player.size();
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(-3.0300000000000002);
    expect(game.ball.y).toBe(376.97);
    expect(game.pop_scheduled_sounds()).toHaveLength(1);
});


test('does not bounce left of the paddle', () => {
    game.ball.x = game.player.x - 20;
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(3);
    expect(game.ball.y).toBe(383);
    expect(game.pop_scheduled_sounds()).toHaveLength(0);
});

test('does not bounce just right of the paddle', () => {
    game.ball.x = game.player.x + game.player.size() + 1;
    game.ball.y = game.player.y;
    game.tick('');
    expect(game.ball.y_veloc).toBe(3);
    expect(game.ball.y).toBe(383);
    expect(game.pop_scheduled_sounds()).toHaveLength(0);
});

test('losing a life', () => {
    game.new_life();
    expect(game.balls).toBe(2);
    expect(game.ball.x).toBe(300);
    expect(Math.floor(game.ball.y)).toBe(133);
    expect(game.ball.y_veloc).toBe(3);
});

test('losing the last life', () => {
    game.balls = 1;
    game.new_life();
    expect(game.balls).toBe(0);
});

test('hitting the last block', () => {
    game.blocks = [new Block(40, 60, 'yellow', 123)];
    game.ball.x = 45;
    game.ball.y = 65;
    game.ball.x_veloc = 4;
    game.ball.y_veloc = -4;

    game.tick('');

    expect(game.score).toBe(123);
    expect(game.blocks).toHaveLength(0);
    expect(game.ball.x_veloc).toBe(4);
    expect(game.ball.y_veloc).toBe(4.04);
    expect(game.pop_scheduled_sounds()).toHaveLength(1);
});

test('if you clear the board, you get a new board, new life, and bump the cleared screens!', () => {
    game.blocks = [];
    game.ball.y = 200;
    game.ball.x_veloc = 4;
    game.ball.y_veloc = -4;

    game.tick('');

    expect(game.blocks).toHaveLength(60);
    expect(game.balls).toBe(4);
    expect(game.screens_cleared).toBe(1);
    expect(game.player.size()).toBe(60);
});

test('the evil on-one-side-bounce-thing', () => {
    game.ball.x = 595;
    game.ball.x_veloc = -7;
    game.ball.y = 370;
    game.ball.y_veloc = -3;
    game.tick('');
    game.tick('');
    game.tick('');
    game.tick('');
    expect(game.ball.x).toBe(567);
    expect(game.ball.y).toBe(358);
    expect(game.ball.x_veloc).toBe(-7);
    expect(game.ball.y_veloc).toBe(-3);
});
