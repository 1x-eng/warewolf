import "reflect-metadata";
import { DIContainer } from "./sys/inversify.config";
import { RobotController } from "./application/robot/RobotController";
import { RobotCommand } from "./domain/robot/Direction";

const controller = DIContainer.get<RobotController>(RobotController);

const commands: RobotCommand[] = [
  RobotCommand.MoveNorth,
  RobotCommand.MoveEast,
  RobotCommand.MoveSouth,
  RobotCommand.MoveWest
];

try {
  controller.executeCommands(commands);
} catch (error) {
  console.error(error);
}
