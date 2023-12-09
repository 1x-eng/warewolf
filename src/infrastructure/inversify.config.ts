import { Container } from "inversify";
import "reflect-metadata";
import { IRobot } from "../domain/robot/IRobot";
import { Robot } from "../domain/robot/Robot";
import { RobotController } from "../application/robot/RobotController";

// Dependency injection container configuration.
const DIContainer = new Container();
DIContainer.bind<IRobot>(Robot).toSelf();
DIContainer.bind<RobotController>(RobotController).toSelf();

export { DIContainer };
