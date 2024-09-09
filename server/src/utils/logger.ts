import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import winston, { createLogger } from 'winston';
import { LOGTAIL_TOKEN } from './config';

// Define a format to print metadata in a gray color with indentation
const formatWithMetadata = winston.format.printf(
    ({ timestamp, level, message, ...metadata }) => {
        return `${timestamp} [${level}] ${message}${metadata ? formatMetadata(metadata) : ''}`;
    }
);

// Transports
const transports: winston.transport[] = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            formatWithMetadata
        )
    })
];

if (LOGTAIL_TOKEN) {
    const logtail = new Logtail(LOGTAIL_TOKEN);
    transports.push(new LogtailTransport(logtail));
}

export const logger = createLogger({
    level: 'silly',
    format: winston.format.json(),
    transports: transports
});

function formatMetadata(metadata: Record<string, any>, indent = ''): string {
    if (!Object.keys(metadata).length) return '';

    const lines: string[] = [];
    for (const [key, value] of Object.entries(metadata)) {
        if (typeof value === 'object' && value !== null) {
            lines.push(`${indent}├─ ${key}`);
            lines.push(formatMetadata(value, `${indent}│  `));
        } else {
            lines.push(`${indent}├─ ${key}: ${value}`);
        }
    }

    // Format for the last item
    if (lines.length) {
        lines[lines.length - 1] = lines[lines.length - 1].replace('├─', '└─');
    }

    const spaces = ' '.repeat(4);
    lines.forEach((line, index) => {
        lines[index] = `${spaces}${line}`;
    });

    return `\n\x1b[90m${lines.join('\n')}\x1b[0m`; // gray color
}
