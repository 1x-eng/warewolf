import { inject, injectable } from "inversify";
import { IRobot } from "../../domain/robot/IRobot";
import { Robot } from "../../domain/robot/Robot";
import { RobotCommand } from "../../domain/robot/Direction";

@injectable()
export class RobotController {
  private robot: IRobot;
  private commandHandlers: Record<RobotCommand, () => void>;

  constructor(@inject(Robot) robot: IRobot) {
    this.robot = robot;
    this.commandHandlers = {
      [RobotCommand.MoveNorth]: () => this.robot.moveNorth(),
      [RobotCommand.MoveSouth]: () => this.robot.moveSouth(),
      [RobotCommand.MoveEast]: () => this.robot.moveEast(),
      [RobotCommand.MoveWest]: () => this.robot.moveWest(),
    };
  }

  executeCommands(commands: RobotCommand[]): void {
    commands.forEach(command => {
      const handler = this.commandHandlers[command];
      if (handler) {
        handler();
        console.log(`Robot moved ${command}, position: ${this.robot.getPosition()}`);
      } else {
        throw new Error(`Invalid command: ${command}`);
      }
    });
  }
}
