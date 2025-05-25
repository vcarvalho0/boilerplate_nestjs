import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseProductDTO } from './dto/response-product.dto';
import { ImessageEntity } from '@interfaces/entities/Imessage.entity';
import HandleAccessControl from '@utils/HandleAccessControl';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Rota para criar um novo produto', security: [{ bearerAuth: [] }] })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiCreatedResponse({ type: ImessageEntity })
  async create(@Body() payload: CreateProductDTO, @CurrentUser() user: Partial<User>) {
    await this.productService.create(user, payload);
    return { message: 'Produto criado com sucesso' };
  }

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Rota para retornar todos os produtos' })
  @ApiOkResponse({ type: [ResponseProductDTO] })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Rota para retornar um produto' })
  @ApiOkResponse({ type: ResponseProductDTO })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Rota para atualizar um produto', security: [{ bearerAuth: [] }] })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiOkResponse({ type: ImessageEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDTO,
    @CurrentUser() user: Partial<User>,
  ) {
    await HandleAccessControl.verifyProductOwnership(user, id);
    await this.productService.update(id, payload);
    return { message: 'Produto atualizado com sucesso' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rota para deletar um produto', security: [{ bearerAuth: [] }] })
  @ApiOkResponse({ description: 'Product deleted' })
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: Partial<User>) {
    await HandleAccessControl.verifyProductOwnership(user, id);
    await this.productService.remove(id);
    return { message: 'Produto deletado com sucesso!' };
  }
}
