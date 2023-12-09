export enum Direction {
    North = 'north',
    South = 'south',
    East = 'east',
    West = 'west'
  }
  

// Define the structure of events emitted by the Robot class.
export interface RobotEvents {
    moved: { direction: Direction; position: { x: number; y: number; } };
  }
  