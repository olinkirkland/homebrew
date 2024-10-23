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

function formatMetadata(metadata: Record<string, any>): string {
    if (!Object.keys(metadata).length) return '';

    const pathsAndValues = extractPathsAndValues(metadata);
    return `\u001b[90m${renderTree(pathsAndValues)}\u001b[39m`;
}

function extractPathsAndValues(obj: any, parentKeys: string[] = []): { keys: string[], value: any }[] {
    let result: { keys: string[], value: any }[] = [];

    Object.keys(obj).forEach((key) => {
        const currentKeys = [...parentKeys, key];
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                // For arrays, include the index in the key path
                result.push({ keys: currentKeys, value: null });
                value.forEach((item, index) => {
                    const arrayKeys = [...currentKeys, String(index)];
                    if (typeof item === "object" && item !== null) {
                        result.push({ keys: arrayKeys, value: null });
                        result = result.concat(extractPathsAndValues(item, arrayKeys));
                    } else {
                        result.push({ keys: arrayKeys, value: item });
                    }
                });
            } else {
                // If it's a nested object, store null for its value and recurse
                result.push({ keys: currentKeys, value: null });
                result = result.concat(extractPathsAndValues(value, currentKeys));
            }
        } else {
            // For primitive values, just store the full path and value
            result.push({ keys: currentKeys, value });
        }
    });

    return result;
}

function renderTree(pathsAndValues: { keys: string[], value: any }[]): string {
    return pathsAndValues.map(({ keys, value }) => {
        const indent = '  '.repeat(keys.length);
        const key = `[${keys[keys.length - 1]}]`;
        const printedValue = value ? ` ${value}` : ' ↓';

        return indent + key + printedValue;
    }).join('\n');
}