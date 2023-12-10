import { Robot } from '../../../src/domain/robot/Robot';
import { IRobotConfig } from '../../../src/domain/robot/IRobot';
import logger from '../../../src/utils/logger';

describe('Robot', () => {
  let robot: Robot;
  const mockConfig: IRobotConfig = { gridSizeX: 10, gridSizeY: 10 };
  const spyLogger = jest.spyOn(logger, 'info');

  beforeEach(() => {
    robot = new Robot(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    expect(spyLogger).toHaveBeenCalledWith(
      expect.stringContaining("Move ignored")
    );
  });

  it('should not move south beyond grid boundary', () => {
    robot['position'] = { x: 0, y: 0 };
    robot.moveSouth();
    expect(robot.getPosition()).toEqual({ x: 0, y: 0 });
    expect(spyLogger).toHaveBeenCalledWith(expect.stringContaining("Move ignored"));
  });

  it('should not move north or east beyond grid boundaries at the northeast corner', () => {
    robot['position'] = { x: mockConfig.gridSizeX - 1, y: mockConfig.gridSizeY - 1 };
    robot.moveNorth();
    robot.moveEast();
    expect(robot.getPosition()).toEqual({ x: mockConfig.gridSizeX - 1, y: mockConfig.gridSizeY - 1 });
    expect(spyLogger).toHaveBeenCalledTimes(2);
    expect(spyLogger).toHaveBeenCalledWith(
      expect.stringContaining("Move ignored")
    );
  });

  it('should update its position correctly after a sequence of moves', () => {
    robot.moveNorth();
    robot.moveEast();  
    expect(robot.getPosition()).toEqual({ x: 1, y: 1 });
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

  it('should emit correct details in moved event on move south', () => {
    const spyEmit = jest.spyOn(robot, 'emit');
    robot.moveNorth();
    robot.moveSouth();
    expect(spyEmit).toHaveBeenCalledWith('moved', {
      type: 'moved',
      direction: 'south',
      oldPosition: { x: 0, y: 1 },
      currentPosition: { x: 0, y: 0 },
      gridSize: { x: mockConfig.gridSizeX, y: mockConfig.gridSizeY }
    });
  });

  it('should emit correct details in moved event on move east', () => {
    const spyEmit = jest.spyOn(robot, 'emit');
    robot.moveEast();
    expect(spyEmit).toHaveBeenCalledWith('moved', {
      type: 'moved',
      direction: 'east',
      oldPosition: { x: 0, y: 0 },
      currentPosition: { x: 1, y: 0 },
      gridSize: { x: mockConfig.gridSizeX, y: mockConfig.gridSizeY }
    });
  });

  it('should emit correct details in moved event on move west', () => {
    const spyEmit = jest.spyOn(robot, 'emit');
    robot.moveEast();
    robot.moveWest();
    expect(spyEmit).toHaveBeenCalledWith('moved', {
      type: 'moved',
      direction: 'west',
      oldPosition: { x: 1, y: 0 },
      currentPosition: { x: 0, y: 0 },
      gridSize: { x: mockConfig.gridSizeX, y: mockConfig.gridSizeY }
    });
  });
});
