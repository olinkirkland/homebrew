import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import dotenv from 'dotenv';
import winston, { createLogger } from 'winston';

dotenv.config();
const { LOGTAIL_TOKEN } = process.env;

// Transports
const transports: winston.transport[] = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
        )
    })
];

if (LOGTAIL_TOKEN) {
    const logtail = new Logtail(LOGTAIL_TOKEN);
    transports.push(new LogtailTransport(logtail));
}

export const logger = createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: transports
});
