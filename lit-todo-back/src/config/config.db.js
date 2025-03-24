export const config = {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'admin',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_DATABASE ?? 'database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};