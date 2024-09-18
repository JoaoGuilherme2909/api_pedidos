import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProduct, UpdateProduct } from 'src/domain/product/product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(201)
  @Post()
  async createProdut(@Body() product: CreateProduct) {
    return this.productsService.createProduct(product);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Moderator, Role.User)
  @HttpCode(200)
  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Moderator, Role.User)
  @HttpCode(200)
  @Get('/:name')
  async getProductByName(@Param('name') name: string) {
    return this.productsService.getProductByName(name);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  @Put()
  async updateProduct(@Body() { id, name, value }: UpdateProduct) {
    return this.productsService.updateProduct(name, value, id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
