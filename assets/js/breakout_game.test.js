import { BreakoutGame } from './breakout_game';

test('a game starts with a zero score', () => {
    var game = new BreakoutGame(200, 200);
    expect(game.score).toBe(0);
})