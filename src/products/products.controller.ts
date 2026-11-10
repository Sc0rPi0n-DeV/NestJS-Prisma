import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}


    @Get()
    getAll() {
        return this.productsService.getAll();
    }

    // get by id
    @Get(':id')
    getById(id: number) {
        return this.productsService.getById(id);
    }
}
