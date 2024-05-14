import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjetoService } from '../service/projeto.service';
import { CreateProjetoDto } from '../dto/projeto.dto';
import { UpdateProjetoDto } from '../dto/projeto.dto';

@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Get()
  async findAll() {
    return this.projetoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projetoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.projetoService.remove(id);
    return null;
  }
}
