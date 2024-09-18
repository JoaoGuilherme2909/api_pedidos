import { Injectable } from '@nestjs/common';
import { CreateProduct } from 'src/domain/product/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async createProduct({ name, value }: CreateProduct) {
    const product = await this.prismaService.product.create({
      data: {
        name,
        value,
      },
    });

    delete product.id;
    return product;
  }

  async getAllProducts() {
    const products = await this.prismaService.product.findMany({
      select: {
        id: true,
        name: true,
        value: true,
      },
      where: {
        active: true,
      },
    });

    return products;
  }

  async updateProduct(name: string, value: number, id: string) {
    const products = await this.prismaService.product.update({
      data: {
        name,
        value,
      },
      where: {
        id,
      },
    });

    return products;
  }

  async deleteProduct(id: string) {
    const productDeleted = await this.prismaService.product.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    });

    return productDeleted;
  }

  async getProductByName(name: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        name: {
          startsWith: `%${name}%`,
        },
        active: true,
      },
    });

    return products;
  }
}
