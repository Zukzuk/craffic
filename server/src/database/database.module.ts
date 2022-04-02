import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// entities
import { UserEntity } from '../app/modules/users/entities/user.entity';
import { ItemEntity } from '../app/modules/items/entities/item.entity';
import { AddressEntity } from 'src/app/modules/users/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          // __dirname + '/../../**/*.entity.ts',
          ItemEntity,
          UserEntity,
          AddressEntity,
        ],
        // See also migration strategy: https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
        synchronize: configService.get('POSTGRES_TYPEORM_SYNC'),
      }),
    }),
  ],
})
export class DatabaseModule {}
