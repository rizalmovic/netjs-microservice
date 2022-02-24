import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRequest } from './product.request';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Post()
  async createProduct(
    @Body() productRequest: ProductRequest,
  ): Promise<Product> {
    return await this.productService.createProduct(productRequest);
  }

  @Get(':id')
  async getProduct(@Param() params): Promise<Product> {
    return await this.productService.getProduct(params.id);
  }

  @Put(':id')
  async updateProduct(
    @Param() params,
    @Body() productRequest: ProductRequest,
  ): Promise<Product> {
    return await this.productService.updateProduct(params.id, productRequest);
  }

  @Delete(':id')
  async deleteProduct(@Param() params): Promise<object> {
    return await this.productService.deleteProduct(params.id);
  }
}
