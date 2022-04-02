import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  // List of controllers defined in this module which are instantiated
  controllers: [UsersController],
  // List of providers defined in this module that will be instantiated by the Nest injector
  // and that may be shared at least across this module
  providers: [UsersService],
  // List of imported modules that export the providers that are required in this module
  imports: [TypeOrmModule.forFeature([UserEntity])],
  // Providers that should be available for import in other modules
  exports: [UsersService],
})
/*
The module encapsulates providers by default. This means that it's impossible to inject providers 
that are neither directly part of the current module nor exported from the imported modules. 
Thus, you may consider the exported providers from a module as the module's public interface, or API.
*/
export class UsersModule {}
