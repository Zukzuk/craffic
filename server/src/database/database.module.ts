import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// entities
import { UserEntity } from '../app/users/entities/users.entity';
import { ItemEntity } from '../app/items/entities/items.entity';

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
        password: configService.get('POSTGRES_PW'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          //__dirname + '/**/*.entity.ts',
          ItemEntity,
          UserEntity,
        ],
        synchronize: configService.get('TYPEORM_SYNC'),
      }),
    }),
  ],
})
export class DatabaseModule {}
