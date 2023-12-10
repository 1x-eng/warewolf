# Warewolf | A warehouse robot control system

This project implements a Robot Control System that manages the movements of a robot within a predefined grid. The system is designed to handle commands for moving the robot in different directions (North, South, East, West) and ensures that the robot does not move outside the specified grid boundaries.

## Features
- Event-Driven Architecture: The system leverages an event-oriented approach to handle robot movements and interactions.

- Dependency Injection with InversifyJS: Utilizing InversifyJS, the system adopts a DI pattern.

- Domain-Driven Design (DDD): The application is structured following DDD principles, promoting a clear separation of concerns.

## Getting started
```bash
git clone https://github.com/1x-eng/warewolf
cd warewolf
yarn install
yarn build
yarn start 'N S E W' // or yarn start --help for instructions.
```

## Local development
```bash
yarn dev
```

## Running tests
```bash
yarn test
```

#### (when I find time) What's next - Potentially, mount this on a PI, and lets make a toy robot
- Maybe a robot chassis from a Jaycar?
- A Pi 3; with GPIO (maybe node-red?)
- Motor controller & a battery pack
- Maybe use whisper APIs to issue instructions and use STT and TTS?
