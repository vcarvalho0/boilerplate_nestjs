import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CompanyOwnerService } from './company-owner.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCompanyOwnerDTO } from './dto/create-company-owner.dto';
import { ImessageEntity } from '@interfaces/entities/Imessage.entity';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CompanyOwnerResponseDTO } from './dto/response-company-owner.dto';
import { UpdateCompanyOwnerDTO } from './dto/update-company-owner.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Responsavel pela empresa')
@Controller('company-owner')
export class CompanyOwnerController {
  constructor(private readonly companyOwnerService: CompanyOwnerService) {}

  @Post()
  @IsPublic()
  @ApiOperation({ summary: 'Rota para criar um responsável pela empresa' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiCreatedResponse({ type: ImessageEntity })
  async create(@Body() payload: CreateCompanyOwnerDTO) {
    await this.companyOwnerService.create(payload);
    return { message: 'Responsavel criado com sucesso' };
  }

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Rota para retornar todos os responsáveis de empresa' })
  @ApiOkResponse({ type: [CompanyOwnerResponseDTO] })
  findAll() {
    return this.companyOwnerService.findAll();
  }

  @Patch()
  @ApiOperation({
    summary: 'Rota para atualizar o responsável da empresa que está logado',
    security: [{ bearerAuth: [] }],
  })
  @ApiOkResponse({ type: ImessageEntity })
  @ApiNotFoundResponse({ description: 'Responsável não encontrado' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  async update(@Body() payload: UpdateCompanyOwnerDTO, @CurrentUser() user: Partial<User>) {
    await this.companyOwnerService.update(user, payload);
    return { message: 'Responsável atualizado com sucesso' };
  }

  @Delete()
  @ApiOperation({
    summary: 'Rota para deletar o responsável da empresa que está logado',
    security: [{ bearerAuth: [] }],
  })
  @ApiOkResponse({ type: ImessageEntity })
  @ApiNotFoundResponse({ description: 'Responsável não encontrado' })
  async remove(@CurrentUser() user: Partial<User>) {
    await this.companyOwnerService.remove(user);
    return { message: 'Responsável removido com sucesso' };
  }
}
