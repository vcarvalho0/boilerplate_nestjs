import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { ImessageEntity } from '@interfaces/entities/Imessage.entity';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { CompanyOwnerDTO } from './dto/response-company.dto';

@ApiTags('Empresa')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Rota para criar uma empresa', security: [{ bearerAuth: [] }] })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiCreatedResponse({ type: ImessageEntity })
  async create(@Body() payload: CreateCompanyDTO, @CurrentUser() user: Partial<User>) {
    await this.companyService.create(user, payload);
    return { message: 'Empresa criada com sucesso' };
  }

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Rota para retornar todas as empresas' })
  @ApiOkResponse({ type: [CompanyOwnerDTO] })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Rota para retornar uma empresa' })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiOkResponse({ type: CompanyOwnerDTO })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(id);
  }

  @Patch()
  @ApiOperation({
    summary: 'Rota para atualizar uma empresa',
    security: [{ bearerAuth: [] }],
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiOkResponse({ type: ImessageEntity })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  async update(@Body() payload: UpdateCompanyDTO, @CurrentUser() user: Partial<User>) {
    await this.companyService.update(user, payload);
    return { message: 'Empresa atualizado com sucesso' };
  }

  @Delete()
  @ApiOperation({ summary: 'Rota para deletar uma empresa', security: [{ bearerAuth: [] }] })
  @ApiOkResponse({ type: ImessageEntity })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  async remove(@CurrentUser() user: Partial<User>) {
    await this.companyService.remove(user);
    return { message: 'Empresa removida com sucesso' };
  }
}
