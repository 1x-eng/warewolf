import { EventEmitter } from 'events';
import { inject, injectable } from "inversify";
import { IRobot, IRobotConfig } from "./IRobot";
import { Direction } from "./Direction";
import { INV_DEPENDENCY_TYPES } from '../../sys/symbols';
import { RobotEvent, RobotEventType } from './IRobotEvent';
import logger from '../../utils/logger';

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

  emit(event: RobotEventType, data: RobotEvent): boolean {
    return this.eventEmitter.emit(event, data);
  }

  on(event: RobotEventType, listener: (event: RobotEvent) => void): this {
    this.eventEmitter.on(event, listener);
    return this;
  }

  private move(direction: Direction, delta: { x: number; y: number }): void {
    const oldPosition = { ...this.position };
    const newPosition = { x: this.position.x + delta.x, y: this.position.y + delta.y };
    
    if (newPosition.x >= 0 && newPosition.x < this.gridSize.x &&
        newPosition.y >= 0 && newPosition.y < this.gridSize.y) {
      this.position = newPosition;
      this.emit(RobotEventType.Moved, { type: RobotEventType.Moved, direction, oldPosition, currentPosition: this.position, gridSize: this.gridSize });
    } else {
      logger.info(`Move ignored: Attempted to move ${direction} from (${oldPosition.x}, ${oldPosition.y}) to (${newPosition.x}, ${newPosition.y}), which is outside the grid boundaries.`);
    }
  }
}
