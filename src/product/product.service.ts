import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}

   async create(createProductDto: CreateProductDto, author: User){
   const newProduct = this.productRepository.create({...createProductDto, author});
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: number, author?: User): Promise<Product>{
    const product = await this.productRepository.findOne(id)
    .then(p => !author ? p: !!p && author.id === p.id ? p: null)
    if(!product) throw new NotFoundException('Product not exist');
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto, author?: User) {
    const updateProduct =  await this.findOne(id, author);
    
    const update =  Object.assign(updateProduct, updateProductDto);
    return await this.productRepository.save(update);
  }

  async remove(id: number, author?: User) {
    const deleteProduct = await this.findOne(id, author);
    return this.productRepository.remove(deleteProduct);
  }
}
