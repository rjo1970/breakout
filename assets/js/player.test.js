import { Player } from './player';
import { Ball } from './ball';

var player;
const canvas_width = 600;
const canvas_height = 400;
const paddle_size = 60;

beforeEach(() => {
    player = new Player(canvas_width, canvas_height, paddle_size);
});

test('construction', () => {
    expect(player.canvas_width).toBe(600);
    expect(player.canvas_height).toBe(400);
    expect(player.x).toBe(270);
    expect(player.y).toBe(380);
});

test('move left with room to move', () => {
    player.move_left();
    expect(player.x).toBe(265);
});

test('move right with room to move', () => {
    player.move_right();
    expect(player.x).toBe(275);
});

test('move left but at the wall', () => {
    player.x = 0;
    player.move_left();
    expect(player.x).toBe(0);
});

test('move right but at the wall', () => {
    const expected = (canvas_width - paddle_size);
    player.x = expected;
    player.move_right();
    expect(player.x).toBe(expected);
});

test('update with no direction', () => {
    const x = player.x;
    player.update('');
    expect(player.x).toBe(x);
});

test('update left', () => {
    player.update('left');
    expect(player.x).toBe(265);
});

test('update right', () => {
    player.update('right');
    expect(player.y).toBe(380);
});
