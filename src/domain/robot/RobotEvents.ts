import { Direction } from "./Direction";

// Define the structure of events emitted by the Robot class.
export interface RobotEvents {
    moved: { direction: Direction; position: { x: number; y: number; } };
  }
  