import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'warewolf' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.printf((info) => {
          const { timestamp, level, message, ...args } = info;
          const log = {
            timestamp, 
            level, 
            message, 
            ...args,
          };
          return `${JSON.stringify(log, null, 2)}`;
        })
      )
    })
  ]
});

export default logger;