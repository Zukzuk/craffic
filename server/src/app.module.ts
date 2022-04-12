import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

// modules
import BooksModule from './app/modules/books/books.module';
import DatabaseModule from './database.module';
import UsersModule from './app/modules/users/users.module';
import AuthModule from './app/modules/auth/auth.module';
import DirTreeService from './app/providers/dirtree.service';
import ChokidarService from './app/providers/chokidar.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_MODE: Joi.string(),
        POSTGRES_RUN_MIGRATIONS: Joi.boolean(),
        POSTGRES_TYPEORM_SYNC: Joi.boolean().required(),
        NESTJS_PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [],
  providers: [DirTreeService, ChokidarService],
})
export default class AppModule {}
