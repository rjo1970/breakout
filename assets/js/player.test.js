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
    expect(player.x).toBe(270 - player.velocity());
});

test('move right with room to move', () => {
    player.move_right();
    expect(player.x).toBe(270 + player.velocity());
});

test('move left but at the wall', () => {
    const edge_x = 0 - player.size() / 2;
    player.x = edge_x;
    player.move_left();
    expect(player.x).toBe(edge_x);
});

test('move right but at the wall', () => {
    const edge_x = (canvas_width - paddle_size / 2);
    player.x = edge_x;
    player.move_right();
    expect(player.x).toBe(edge_x);
});

test('update with no direction', () => {
    const x = player.x;
    player.update('');
    expect(player.x).toBe(x);
});

test('update left', () => {
    player.update('left');
    expect(player.x).toBe(270 - player.velocity());
});

test('update right', () => {
    player.update('right');
    expect(player.x).toBe(270 + player.velocity());
});
