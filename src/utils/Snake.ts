const MAX_OFFSET = 290;

export default class Snake {
  private snakeContainer: HTMLElement;
  private head: HTMLElement;

  private lastSnakePosition: Array<{ x: number; y: number }> = [];

  constructor(snakeContainerElement: HTMLElement) {
    this.snakeContainer = snakeContainerElement;
    this.head = snakeContainerElement.querySelector("div") as HTMLElement;
  }

  get X() {
    return this.head.offsetLeft;
  }

  set X(x: number) {
    if (x === this.X) return;
    if (x < 0 || x > MAX_OFFSET) {
      throw new Error("撞墙了！");
    }
    this.recordLastSnakePosition();
    this.head.style.left = `${x}px`;
    this.moveSnake();
  }

  get Y() {
    return this.head.offsetTop;
  }

  set Y(y: number) {
    if (y === this.Y) return;
    if (y < 0 || y > MAX_OFFSET) {
      throw new Error("撞墙了！");
    }
    this.recordLastSnakePosition();
    this.head.style.top = `${y}px`;
    this.moveSnake();
  }

  recordLastSnakePosition() {
    this.lastSnakePosition = [];
    const allSnakes = this.snakeContainer.querySelectorAll("div");
    for (let i = 0; i < allSnakes.length; i++) {
      const { offsetLeft, offsetTop } = allSnakes[i];
      this.lastSnakePosition.push({ x: offsetLeft, y: offsetTop });
    }
  }

  addSnake() {
    this.recordLastSnakePosition();
    const newSnake = this.head.cloneNode();
    this.snakeContainer.appendChild(newSnake);
    this.moveSnake();
  }

  moveSnake() {
    const allSnakes = this.snakeContainer.querySelectorAll("div");
    if (allSnakes.length === 1) return;
    for (let i = 1; i < allSnakes.length; i++) {
      const preNode = this.lastSnakePosition[i - 1];
      allSnakes[i].style.left = preNode.x + "px";
      allSnakes[i].style.top = preNode.y + "px";
    }
  }

  reset() {
    const allSnakes = this.snakeContainer.querySelectorAll("div");
    for (let i = 1; i < allSnakes.length; i++) {
      allSnakes[i].remove();
    }
  }
}
