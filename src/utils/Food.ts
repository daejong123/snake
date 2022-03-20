export default class Food {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  changePosition() {
    const left = `${Math.round(Math.random() * 29) * 10}px`;
    const top = `${Math.round(Math.random() * 29) * 10}px`;
    this.element.style.left = left;
    this.element.style.top = top;
  }
}
