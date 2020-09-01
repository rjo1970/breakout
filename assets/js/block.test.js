import { Block } from './block';
import { Ball } from './ball';

var block;
var ball;

beforeEach(() => {
    ball = new Ball(600, 400);
    block = new Block(40, 60, 'yellow', 40);
});

test('ball total miss', () => {
    ball.x = 0;
    ball.y = 0;

    expect(block.hit_by(ball)).toBeFalsy();
});

test('ball wrong x', () => {
    ball.x = 0;
    ball.y = 60;

    expect(block.hit_by(ball)).toBeFalsy();
});

test('ball wrong y', () => {
    ball.x = 40;
    ball.y = 0;

    expect(block.hit_by(ball)).toBeFalsy();
});

test('hit the block with the ball exactly', () => {
    ball.x = 40;
    ball.y = 60;

    expect(block.hit_by(ball)).toBeTruthy();
});

test('hit the block with the ball but not exact x', () => {
    ball.x = 45;
    ball.y = 60;

    expect(block.hit_by(ball)).toBeTruthy();
});

test('hit the block with the ball but not exact y', () => {
    ball.x = 40;
    ball.y = 65;

    expect(block.hit_by(ball)).toBeTruthy();
});

test('detects bounce off the side of a block', () => {
    ball.x = 41;
    ball.y = 60;

    expect(block.hit_x_edge(ball)).toBe(true);
});

