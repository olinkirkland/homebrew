import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import dotenv from 'dotenv';
import winston, { createLogger } from 'winston';

dotenv.config();

// Transports
const transports: winston.transport[] = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
                ({ level, message, timestamp, channel, data }) => {
                    return `${timestamp} ${level}: ${
                        channel ? `${data?.sender}@${channel}` : ''
                    } ${typeof message === 'string' ? message : JSON.stringify(message)}`;
                }
            )
        ),
    }),
    new winston.transports.File({
        filename: 'logs/logs.csv',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
                ({ level, timestamp, message, channel, data, deviceAddress }) => {
                    return `${timestamp},${level},${
                        typeof message === 'string' ? message : '[Object]'
                    },${data?.uuid || ''},${channel || ''},${data?.sender || ''},${
                        deviceAddress || ''
                    }`;
                }
            )
        ),
        maxsize: 1024 * 1024,
    })
];

if (process.env.LOGTAIL_TOKEN !== undefined) {
    const logtail = new Logtail(process.env.LOGTAIL_TOKEN ?? '');
    transports.push(new LogtailTransport(logtail));
}

export const logger = createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: transports,
});
