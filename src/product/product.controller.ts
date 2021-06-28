import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, HttpStatus, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth-decorator';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { User } from 'src/common/decorators/user-decorator';
import { User as UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Product Controller')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
  ) {}

  @Auth({
    possession: 'own',
    action: 'create',
    resource: AppResources.PRODUCT
  })
  @Post('/create')
  async create(@Res() res, @Body() createProductDto: CreateProductDto, @User() author: UserEntity ) {
    const data = await this.productService.create(createProductDto, author);
    return res.status(HttpStatus.OK).json({
      message: 'Product Create',
      data
    });
  }

  @Get()
  async findAll(@Res() res) {
    const product = await this.productService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Product',
      product
    });
  }

  @Auth()
  @Get(':id')
  async findOne(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      message: 'Product',
      product
    });
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResources.PRODUCT
  })
  @Patch('/update')
  async update(@Res() res, @Query('id') id, @Body() updateProductDto: UpdateProductDto,@User() author: UserEntity) {
    
    let data;

    if(this.rolesBuilder
        .can(author.roles)
        .updateAny(AppResources.PRODUCT)
        .granted
      ){
        //Puede editar caulquier Product
        data =  await this.productService.update(id, updateProductDto);
    } else {
      //Puede editar solo sus Propios Product
      data =  await this.productService.update(id, updateProductDto, author);
    }
    
    return res.status(HttpStatus.OK).json({
      message: 'Product update',
      data
    });
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResources.PRODUCT
  })
  @Delete('/delete')
  async remove(@Res() res, @Query('id') id, @User() author: UserEntity) {
     
    let data;

    if(this.rolesBuilder
        .can(author.roles)
        .updateAny(AppResources.PRODUCT)
        .granted
      ){
        //Puede eliminar caulquier Product
        data =  await this.productService.remove(+id);
    } else {
      //Puede eliminar solo sus Propios Product
      data =  await this.productService.remove(+id, author);
    }

    return res.status(HttpStatus.OK).json({
      message : 'Product delete',
      data
    });
  }
}
