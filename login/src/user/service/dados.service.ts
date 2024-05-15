import { User } from "./../entity/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { Dados } from "../entity/dados.entity";
import { CreateDadosDto, UpdateDadosDto } from "../dto/dados.dto";

@Injectable()
export class DadosService {
  constructor(
    @InjectRepository(Dados)
    private DadosRepository: Repository<Dados>,
    private userService: UserService
  ) {}

  async create(createDadosDto: CreateDadosDto): Promise<Dados> {
    const user = await this.userService.findOne(createDadosDto.userId);
    if (!user) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
    const newDados = this.DadosRepository.create({
      ...createDadosDto,
      user: user, // Associando o usuário encontrado ao novo registro de filiação
    });
    return await this.DadosRepository.save(newDados);
  }

  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  async findOne(id: number): Promise<Dados> {
    const Dados = await this.DadosRepository.findOne({
      where: { id_perfil: id },
      relations: ["user"],
    });
    if (!Dados) {
      throw new NotFoundException(`Filiação não encontrada.`);
    }
    return Dados;
  }

  async update(
    id: number,
    updateDadosDto: UpdateDadosDto
  ): Promise<Dados> {
    const Dados = await this.findOne(id);
    delete updateDadosDto.userId;

    const updated = this.DadosRepository.merge(Dados, updateDadosDto);
    return await this.DadosRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const Dados = await this.findOne(id);
    await this.DadosRepository.remove(Dados);
  }
}