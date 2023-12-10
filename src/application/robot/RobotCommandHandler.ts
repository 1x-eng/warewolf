import { DIContainer } from '../../sys/inversify.config';
import logger from '../../utils/logger';
import { RobotController } from './RobotController';

export class RobotCommandHandler {
  static executeCommandSequence(commandSequence: string[]): void {
    const controller = DIContainer.get<RobotController>(RobotController);

    controller.executeCommands(commandSequence);
    logger.info("Hey, Warewolf here and I've moved as per your instructions.");
  }
}
