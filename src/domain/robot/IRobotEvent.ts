import { Direction } from "./Direction";

export enum RobotEventType {
  Moved = 'moved',
}

interface IRobotEvent {
    type: RobotEventType
}

interface IRobotMovedEvent extends IRobotEvent {
  type: RobotEventType.Moved;
  direction: Direction;
  oldPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  gridSize: { x: number; y: number };
}

export type RobotEvent = IRobotMovedEvent;