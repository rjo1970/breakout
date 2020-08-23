import { Ball } from './ball';
import { Player } from './player';

var ball;
const canvas_width = 600;
const canvas_height = 400;
const paddle_size = 60;

beforeEach(() => {
    ball = new Ball(canvas_width, canvas_height);
});

test('construction', () => {
    expect(ball.x).toBe(300);
    expect(ball.y).toBe(133);
    expect(Math.abs(ball.x_veloc)).toBe(4);
    expect(ball.y_veloc).toBe(4);
    expect(ball.canvas_width).toBe(canvas_width);
    expect(ball.canvas_height).toBe(canvas_height);
    expect(ball.size).toBe(10);
});

test('reset', () => {
    ball.x = 42;
    ball.y = 42;
    ball.x_veloc = -4;
    ball.y_veloc = -4;
    ball.reset();
    expect(ball.x).toBe(300);
    expect(ball.y).toBe(133);
    expect(Math.abs(ball.x_veloc)).toBe(4);
    expect(ball.y_veloc).toBe(4);
});

test('touches ball', () => {
    var player = new Player(canvas_width, canvas_height, paddle_size);
    ball.x = player.x;
    ball.y = player.y;
    expect(ball.touches_player(player)).toBeTruthy();
});

test('does not touch player', () => {
    var player = new Player(canvas_width, canvas_height, paddle_size);
    expect(ball.touches_player(player)).toBeFalsy();
});

test('touches player on right side of paddle', () => {
    var player = new Player(canvas_width, canvas_height, paddle_size);
    ball.x = player.x + player.paddle_size;
    ball.y = player.y;

    expect(ball.touches_player(player)).toBeTruthy();
});

test('lost ball', () => {
    ball.y = 801;
    expect(ball.is_lost()).toBeTruthy();
});