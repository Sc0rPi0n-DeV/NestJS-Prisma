import { Body, Controller, Get, Param, ParseBoolPipe, Patch, Post, Query } from '@nestjs/common';
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

    // find where base brise > a given value
    // GET /products/search/base_price?price=100
    @Get('search/base_price')
    getByItemGreaterThan(@Query('price') value: number) {
        return this.productsService.getByItemGreaterThan(value);
    }

    // add new product
    @Post()
    addNew(@Body() productData: any) {
        return this.productsService.addNew(productData);
    }

    // update product by id patch update 
    // PATCH /products/:id
    @Patch(':id')
    updateById(@Param('id') id: string, @Body() updateData: any) {
        return this.productsService.updateById(BigInt(id), updateData);
    }

}

