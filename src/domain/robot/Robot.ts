import { EventEmitter } from 'events';
import { inject, injectable } from "inversify";
import { IRobot, IRobotConfig } from "./IRobot";
import { Direction } from "./Direction";
import { INV_DEPENDENCY_TYPES } from '../../sys/symbols';

type RobotEvent = 'moved'; 

@injectable()
export class Robot implements IRobot {
  private position = { x: 0, y: 0 };
  private readonly gridSize: { x: number; y: number };
  private eventEmitter = new EventEmitter();

  constructor(@inject(INV_DEPENDENCY_TYPES.RobotConfig) config: IRobotConfig) {
    this.gridSize = { x: config.gridSizeX, y: config.gridSizeY };
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

  emit(event: RobotEvent | symbol, ...args: any[]): boolean {
    return this.eventEmitter.emit(event, ...args);
  }

  on(event: RobotEvent, listener: (...args: any[]) => void): this {
    this.eventEmitter.on(event, listener);
    return this;
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
