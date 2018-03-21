export class Queue {
  constructor() {
    this.queue = [];
  }
  isEmpty() {
    return this.queue.length == 0;
  }
  deQueue() {
    if (!this.isEmpty()) {
      return this.queue.splice(0, 1)[0];
    } else {
      throw new Error("Queue is empty!");
    }
  }
  enQueue(element) {
    this.queue.push(element);
  }
}
