import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

// modules
import { ItemsModule } from './app/items/items.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
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
    // See also migration strategy: https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
    DatabaseModule,
    AuthModule,
    UsersModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
