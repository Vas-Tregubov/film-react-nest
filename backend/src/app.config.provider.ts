import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменнные среды
    database: {
      driver: process.env.DATABASE_DRIVER?.trim() || 'postgres',
      url: process.env.DATABASE_URL?.trim() || '',
      type: (process.env.DATABASE_DRIVER?.trim() as 'postgres') || 'postgres',
      host: process.env.DATABASE_HOST?.trim() || 'localhost',
      port: parseInt(process.env.DATABASE_PORT?.trim() || '5432'),
      username: process.env.DATABASE_USERNAME?.trim() || 'developer',
      password: process.env.DATABASE_PASSWORD?.trim() || 'developer',
      database: process.env.DATABASE_NAME?.trim() || 'film_project',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  type: string;
  host: string;
  port: string | number;
  username: string;
  password: string;
  database: string;
}
