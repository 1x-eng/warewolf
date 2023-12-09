import { EventEmitter } from 'events';
import { injectable } from "inversify";
import { IRobot } from "./IRobot";
import { Direction } from "./Direction";

@injectable()
export class Robot extends EventEmitter implements IRobot {
  private position = { x: 0, y: 0 };
  private readonly gridSize: { x: number; y: number };

  constructor(gridSizeX: number, gridSizeY: number) {
    super();
    this.gridSize = { x: gridSizeX, y: gridSizeY };
  }

  moveNorth(): void {
    this.move(Direction.North, { x: 0, y: 1 });
  }

  moveSouth(): void {
    this.move(Direction.South, { x: 0, y: -1 });
  }

  moveEast(): void {
    this.move(Direction.East, { x: 1, y: 0 });
  }

  moveWest(): void {
    this.move(Direction.West, { x: -1, y: 0 });
  }

  getPosition(): { x: number; y: number; } {
    return this.position;
  }

  private move(direction: Direction, delta: { x: number; y: number }): void {
    const newPosition = { x: this.position.x + delta.x, y: this.position.y + delta.y };
    
    if (newPosition.x >= 0 && newPosition.x < this.gridSize.x &&
        newPosition.y >= 0 && newPosition.y < this.gridSize.y) {
      this.position = newPosition;
      this.emit('moved', { direction, position: this.position });
    }
  }
}
