import { inject, injectable } from "inversify";
import { IRobot } from "../../domain/robot/IRobot";
import { RobotCommand } from "../../domain/robot/Direction";
import { INV_DEPENDENCY_TYPES } from '../../sys/symbols';

@injectable()
export class RobotController {
  private robot: IRobot;
  private commandHandlers: Record<RobotCommand, () => void>;

  constructor(@inject(INV_DEPENDENCY_TYPES.Robot) robot: IRobot) {
    this.robot = robot;
    this.commandHandlers = {
      [RobotCommand.MoveNorth]: () => this.robot.moveNorth(),
      [RobotCommand.MoveSouth]: () => this.robot.moveSouth(),
      [RobotCommand.MoveEast]: () => this.robot.moveEast(),
      [RobotCommand.MoveWest]: () => this.robot.moveWest(),
    };
  }

  private isValidCommand(command: string): command is RobotCommand {
    return Object.values(RobotCommand).includes(command as RobotCommand);
  }

  executeCommands(commandString: string): void {
    const commands = commandString.split(' ')

    commands.forEach(command => {

      if (!this.isValidCommand(command)) {
        throw new Error(`Invalid command: ${command}`);
      }

      const handler = this.commandHandlers[command as RobotCommand];
      handler();
      console.log(`Robot moved ${command}, position: ${JSON.stringify(this.robot.getPosition())}`);
    });
  }
}
