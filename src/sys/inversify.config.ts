import { Container } from "inversify";
import { IRobot, IRobotConfig } from "../domain/robot/IRobot";
import { RobotController } from "../application/robot/RobotController";
import { INV_DEPENDENCY_TYPES } from '../sys/symbols';
import { Robot } from "../domain/robot/Robot";
import robotConfig from "../config";

const DIContainer = new Container();

DIContainer.bind<IRobotConfig>(INV_DEPENDENCY_TYPES.RobotConfig).toConstantValue(robotConfig);
DIContainer.bind<IRobot>(INV_DEPENDENCY_TYPES.Robot).to(Robot);
DIContainer.bind<RobotController>(RobotController).toSelf();

export { DIContainer };