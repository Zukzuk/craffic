import { Module } from '@nestjs/common';

// service
import { ItemService } from './item.service';
import { ExtractorService } from '../providers/extractor.service';

// controller
import { ItemController } from './item.controller';

@Module({
  //set of controllers defined in this module which have to be instantiated
  controllers: [ItemController],
  //providers that will be instantiated by the Nest injector and that may be shared at least across this module
  providers: [ItemService, ExtractorService],
  //list of imported modules that export the providers which are required in this module
  imports: [],
  //providers that are provided by this module and should be available in other modules which import this module
  exports: [],
})

/*
The module encapsulates providers by default. This means that it's impossible to inject providers 
that are neither directly part of the current module nor exported from the imported modules. 
Thus, you may consider the exported providers from a module as the module's public interface, or API.
*/
export class ItemModule {}
