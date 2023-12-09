import "reflect-metadata";
import { DIContainer } from "./sys/inversify.config";
import { RobotController } from "./application/robot/RobotController";

function parseCommandSequence(args: string[]): string {
  if (args.length === 0) {
    throw new Error("No command sequence provided. Please provide a sequence of commands.");
  }
  return args.join(' ');
}

function main() {
  try {
    const controller = DIContainer.get<RobotController>(RobotController);

    const commandSequence = parseCommandSequence(process.argv.slice(2));
    controller.executeCommands(commandSequence);

    console.log("Hey, Warewolf here and I've moved as per your instructions.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`Error: ${errorMessage}`);
    process.exit(1);
  }
}

main();
