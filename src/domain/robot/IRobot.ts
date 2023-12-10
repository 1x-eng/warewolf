import { RobotEvent, RobotEventType } from "./IRobotEvent";

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

    /**
     * Registers an event listener for the specified event.
     *
     * @param {RobotEventType} event - The type of event to listen for.
     * @param {(event: RobotEvent) => void} listener - The function to be called when the event occurs.
     * @returns {this} - The current instance of the class.
     */
    on(event: RobotEventType, listener: (event: RobotEvent) => void): this;
}

export interface IRobotConfig {
    gridSizeX: number;
    gridSizeY: number;
}