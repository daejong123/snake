import Snake from "./Snake";
import Food from "./Food";

enum DirectionEnum {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  NotFound,
}

const OFFSET = 10;

export default class GameControl {
  private food: Food;
  private snake: Snake;
  private direction: DirectionEnum = DirectionEnum.NotFound;
  // 难度等级
  private _level: number = 1;
  private isGameOver = false;

  // 吃到食物的回调
  private eatFoodCb: (() => void) | undefined;

  // 游戏结束的回调
  private gameOverCb: (() => void) | undefined;

  constructor(foodElement: HTMLElement, snakeElement: HTMLElement) {
    this.snake = new Snake(snakeElement);
    this.food = new Food(foodElement);
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
  }

  set level(level) {
    if (!Number.isInteger(level)) {
      throw new Error("难度等级必须设置为 1-10 的整数类型");
    }
    if (level < 1 || level > 10) {
      throw new Error("难度等级设置有误，可设置范围是 1-10");
    }
    this._level = level;
  }

  get level() {
    return this._level;
  }

  keyDownHandler(event: KeyboardEvent) {
    let dir: DirectionEnum;
    switch (event.key) {
      case "ArrowLeft":
        dir = DirectionEnum.ArrowLeft;
        break;
      case "ArrowDown":
        dir = DirectionEnum.ArrowDown;
        break;
      case "ArrowRight":
        dir = DirectionEnum.ArrowRight;
        break;
      case "ArrowUp":
        dir = DirectionEnum.ArrowUp;
        break;
      default:
        dir = DirectionEnum.NotFound;
        return;
    }
    this.direction = dir;
  }

  run() {
    try {
      switch (this.direction) {
        case DirectionEnum.ArrowLeft:
          this.snake.X -= OFFSET;
          break;
        case DirectionEnum.ArrowDown:
          this.snake.Y += OFFSET;
          break;
        case DirectionEnum.ArrowRight:
          this.snake.X += OFFSET;
          break;
        case DirectionEnum.ArrowUp:
          this.snake.Y -= OFFSET;
          break;
        default:
          console.log("请先初始化方向！");
      }
    } catch (error) {
      this.isGameOver = true;
      console.error("游戏结束");
      this.gameOverCb?.();
    }

    if (this.isGameOver) return;

    if (this.checkEatFood()) {
      this.food.changePosition();
      this.eatFoodCb?.();
      this.snake.addSnake();
    }
    setTimeout(this.run.bind(this), 300 - (this._level - 1) * 20);
  }

  addEatFoodListener(cb: () => void) {
    this.eatFoodCb = cb;
  }

  addGameOverListener(cb: () => void) {
    this.gameOverCb = cb;
  }

  checkEatFood() {
    const { X: snakeX, Y: snakeY } = this.snake;
    const { X: foodX, Y: foodY } = this.food;
    return snakeX === foodX && snakeY === foodY;
  }

  start() {
    this.isGameOver = false;
    this.snake.reset();
    this.snake.X = 0;
    this.snake.Y = 0;
    this.food.changePosition();
    this.direction = DirectionEnum.ArrowRight;
    this.run();
  }
}
