import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Contact } from './src/contacts/contact.entity';
import { config } from 'dotenv';

config(); // Carrega variáveis de ambiente do .env

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Contact],
  migrations: ['src/migration/**/*.ts'],
  synchronize: false, // Deve ser false em produção
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
