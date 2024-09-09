import dotenv from 'dotenv';

dotenv.config();

// Server
export const PORT = process.env.PORT || 3000;

// Database
export const DB_URI = process.env.DB_URI;

// Tokens
export const REFRESH_TOKEN_SECRET =
    process.env.REFRESH_TOKEN_SECRET || 'some-secret-refresh-token';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'some-secret-access-token';
export const REFRESH_TOKEN_EXPIRATION =
    process.env.REFRESH_TOKEN_EXPIRATION || '1d';
export const ACCESS_TOKEN_EXPIRATION =
    process.env.ACCESS_TOKEN_EXPIRATION || '15m';

// Logging
export const LOGTAIL_TOKEN = process.env.LOGTAIL_TOKEN;