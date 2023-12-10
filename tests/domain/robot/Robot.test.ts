import { Robot } from '../../../src/domain/robot/Robot';
import { IRobotConfig } from '../../../src/domain/robot/IRobot';

describe('Robot', () => {
  let robot: Robot;
  const mockConfig: IRobotConfig = { gridSizeX: 10, gridSizeY: 10 };

  beforeEach(() => {
    robot = new Robot(mockConfig);
  });

  it('should move north correctly', () => {
    robot.moveNorth();
    expect(robot.getPosition()).toEqual({ x: 0, y: 1 });
  });

  it('should move south correctly', () => {
    robot['position'] = { x: 0, y: 1 };
    robot.moveSouth();
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('should move east correctly', () => {
    robot['position'] = { x: 0, y: 0 };
    robot.moveEast();
    expect(robot.getPosition()).toEqual({ x: 1, y: 0 });
  });
  
  it('should move west correctly', () => {
    robot['position'] = { x: 1, y: 0 };
    robot.moveWest();
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
  });

  it('should not move north beyond grid boundary', () => {
    robot['position'] = { x: 0, y: mockConfig.gridSizeY - 1 };
    robot.moveNorth();
    expect(robot.getPosition()).toEqual({ x: 0, y: mockConfig.gridSizeY - 1 });
  });

  it('should emit correct details in moved event on move north', () => {
    const spyEmit = jest.spyOn(robot, 'emit');
    robot.moveNorth();
    expect(spyEmit).toHaveBeenCalledWith('moved', {
      type: 'moved',
      direction: 'north',
      oldPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 1 },
      gridSize: { x: mockConfig.gridSizeX, y: mockConfig.gridSizeY }
    });
  });
});
