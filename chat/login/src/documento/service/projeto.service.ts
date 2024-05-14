import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projeto } from '../entity/projeto.entity';
import { CreateProjetoDto } from '../dto/projeto.dto';
import { UpdateProjetoDto } from '../dto/projeto.dto';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private projetoRepository: Repository<Projeto>,
  ) {}

  async create(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    const projeto = this.projetoRepository.create(createProjetoDto);
    return this.projetoRepository.save(projeto);
  }

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find();
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    const projeto = await this.projetoRepository.preload({
      id_projeto: id,
      ...updateProjetoDto,
    });
    return this.projetoRepository.save(projeto);
  }

  async remove(id: number): Promise<void> {
    await this.projetoRepository.delete(id);
  }
}