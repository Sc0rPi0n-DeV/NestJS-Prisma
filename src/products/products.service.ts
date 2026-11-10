import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProductsService {

constructor(private readonly prisma: PrismaService) {}
  

    getAll() {
        return this.prisma.products.findMany();
    }

    getById(id: number) {
        
        return this.prisma.products.findFirstOrThrow({
            where: { product_id: id },
        });
    }
}
