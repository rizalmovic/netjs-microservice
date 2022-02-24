import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerService } from 'src/kafka/producer.service';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductRequest } from './product.request';

@Injectable()
export class ProductService {
  constructor(
    private readonly producerService: ProducerService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProduct(productRequest: ProductRequest): Promise<Product> {
    const newProduct = this.productRepository.create(productRequest);
    const product = await this.productRepository.save(newProduct);
    const products = await this.productRepository.find();
    await this.producerService.produce({
      topic: 'products',
      messages: [{ value: JSON.stringify(products) }],
    });
    return product;
  }

  async getProduct(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async updateProduct(
    id: number,
    productRequest: ProductRequest,
  ): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    this.productRepository.merge(product, productRequest);
    this.authClient.emit('update-product', { ...product });
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<object> {
    return await this.productRepository.delete(id);
  }
}
