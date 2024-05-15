import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    HttpCode,
    HttpStatus,
  } from "@nestjs/common";
  import { DadosService } from "../service/dados.service";
  import { CreateDadosDto, UpdateDadosDto } from "../dto/dados.dto";
  
  @Controller("dados")
  export class DadosController {
    constructor(private readonly DadosService: DadosService) {}
  
    @Post()
    async create(@Body() createDadosDto: CreateDadosDto) {
      return await this.DadosService.create(createDadosDto);
    }
  
    @Get()
    async findAll() {
      return await this.DadosService.findAll();
    }
  
    @Get(":id")
    async findOne(@Param("id") id: number) {
      return await this.DadosService.findOne(id);
    }
  
    @Put(":id")
    async update(
      @Param("id") id: number,
      @Body() updateDadosDto: UpdateDadosDto
    ) {
      return await this.DadosService.update(id, updateDadosDto);
    }
  
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id") id: number) {
      return await this.DadosService.remove(id);
    }
  }