import { Container } from "inversify";
import { IRobot } from "../domain/robot/IRobot";
import { RobotController } from "../application/robot/RobotController";
import { INV_DEPENDENCY_TYPES } from '../sys/symbols';
import { Robot } from "../domain/robot/Robot";
import config from "../config";

const DIContainer = new Container();

DIContainer.bind<IRobot>(INV_DEPENDENCY_TYPES.Robot).toDynamicValue(() => new Robot(config.gridSizeX, config.gridSizeY) );
DIContainer.bind<RobotController>(RobotController).toSelf();

export { DIContainer };