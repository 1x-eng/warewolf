import "reflect-metadata";
import { program } from 'commander';
import { DIContainer } from './sys/inversify.config';
import { RobotController } from './application/robot/RobotController';
import logger from './utils/logger';


program
  .name("warewolf")
  .description("Control the Warewolf robot")
  .argument('<commandSequence>', 'Command sequence to move the robot. eg. N S E W')
  .usage('[options] <commandSequence>')
  .on('--help', () => {
    console.log('\nExample call:\n  $ yarn start \'N S E W\'')
  })
  .action((commandSequence) => {
    const controller = DIContainer.get<RobotController>(RobotController);
    try {
      const commands = commandSequence.split(/\s+/);
      controller.executeCommands(commands);
      logger.info("Hey, Warewolf here and I've moved as per your instructions.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      logger.error(`Error: ${errorMessage}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
