export class PaddleBallCollisionHandler {
  constructor(game, paddle, ball) {
    this.game = game;
    this.paddle = paddle;
    this.ball = ball;
  }

  handle() {
    const centerDifference = (this.ball.x - this.paddle.x);

    // between -0.5 and 0.5
    const differenceFactor = centerDifference / this.paddle.width;

    // between -1 and 1
    const normalizedDifferenceFactor = differenceFactor * 2;

    const normalizedDifferenceFactorMagnitude = Math.abs(normalizedDifferenceFactor);

    if ((this.ball.body.velocity.x < 0 && differenceFactor < 0) || (this.ball.body.velocity.x > 0 && differenceFactor > 0)) {
      this.ball.body.velocity.x *= normalizedDifferenceFactorMagnitude * 2;
    } else {
      this.ball.body.velocity.x *= -1;
      this.ball.body.velocity.x *= normalizedDifferenceFactorMagnitude;
    }

    if (this.ball.body.velocity.x < 0) {
      this.ball.body.velocity.x = this.game.math.clamp(this.ball.body.velocity.x, -250, -100);
    } else {
      this.ball.body.velocity.x = this.game.math.clamp(this.ball.body.velocity.x, 100, 250);
    }

  }
}
