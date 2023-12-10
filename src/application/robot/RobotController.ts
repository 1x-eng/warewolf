import { inject, injectable } from "inversify";
import { IRobot } from "../../domain/robot/IRobot";
import { RobotCommand } from "../../domain/robot/Direction";
import { INV_DEPENDENCY_TYPES } from '../../sys/symbols';
import logger from "../../utils/logger";
import { RobotEventType } from "../../domain/robot/IRobotEvent";

@injectable()
export class RobotController {
  private robot: IRobot;
  private commandHandlers: Record<RobotCommand, () => void>;

  constructor(@inject(INV_DEPENDENCY_TYPES.Robot) robot: IRobot) {
    this.robot = robot;
    this.setupEventListeners();
    this.commandHandlers = {
      [RobotCommand.MoveNorth]: () => this.robot.moveNorth(),
      [RobotCommand.MoveSouth]: () => this.robot.moveSouth(),
      [RobotCommand.MoveEast]: () => this.robot.moveEast(),
      [RobotCommand.MoveWest]: () => this.robot.moveWest(),
    }
  }

  private setupEventListeners(): void {
    this.robot.on(RobotEventType.Moved, (event) => {
      logger.info("Robot moved", event);
    });
  }

  private isValidCommand(command: string): command is RobotCommand {
    return Object.values(RobotCommand).includes(command as RobotCommand);
  }

  executeCommands(commands: string[]): void {
    commands.forEach(command => {
      if (!this.isValidCommand(command)) {
        throw new Error(`Invalid command: ${command}`);
      }
      const handler = this.commandHandlers[command as RobotCommand];
      handler();
    });
  }
}
