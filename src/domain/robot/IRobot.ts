export interface IRobot {
    /**
     * Moves the robot north. Emits a 'moved' event if the movement is successful.
     */
    moveNorth(): void;
  
    /**
     * Moves the robot south. Emits a 'moved' event if the movement is successful.
     */
    moveSouth(): void;
  
    /**
     * Moves the robot east. Emits a 'moved' event if the movement is successful.
     */
    moveEast(): void;
  
    /**
     * Moves the robot west. Emits a 'moved' event if the movement is successful.
     */
    moveWest(): void;
  
    /**
     * Gets the current position of the robot.
     * @returns The current position as { x: number; y: number; }
     */
    getPosition(): { x: number; y: number; };
}

export interface IRobotConfig {
    gridSizeX: number;
    gridSizeY: number;
}