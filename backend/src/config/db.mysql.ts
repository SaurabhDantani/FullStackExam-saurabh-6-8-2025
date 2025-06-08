import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/sql/User';
import { Order } from '../models/sql/Order';
import { OrderItem } from '../models/sql/OrderItem';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT || '3306');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


export const dataSource = new DataSource({
    type: 'mysql',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    synchronize: false,
    migrationsRun: false,
    logging: false,
    entities: [
        User,
        Order,
        OrderItem
    ],
    migrations: ["src/migration/**/*.ts"],
});