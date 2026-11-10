import { Controller, Get, Param, ParseBoolPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}


    @Get()
    getAll() {
        return this.productsService.getAll();
    }



   
  // GET /products/search?active=true
  @Get('search')
  getByActive(@Query('active', ParseBoolPipe) active: boolean) {
    return this.productsService.getByActive(active);
  }
    // get by id
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productsService.getById(BigInt(id));
    }

    // find where active =true

}

