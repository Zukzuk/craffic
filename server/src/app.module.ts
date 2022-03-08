import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

// modules
import { ItemsModule } from './app/items/items.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PW: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        NESTJS_PORT: Joi.number(),
        MODE: Joi.string(),
        RUN_MIGRATIONS: Joi.boolean(),
        TYPEORM_SYNC: Joi.boolean().required(),
      }),
    }),
    // See also migration strategy: https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
    DatabaseModule,
    ItemsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
