import 'dotenv/config';
import mysql from 'mysql2/promise';

const database = process.env.DB_NAME;

if (!database || !/^[A-Za-z0-9_]+$/.test(database)) {
  throw new Error('DB_NAME debe contener únicamente letras, números y guiones bajos.');
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

try {
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  console.log(`Base de datos "${database}" creada o ya existente.`);
} finally {
  await connection.end();
}
