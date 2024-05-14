import { IsString, Length, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDadosDto {
  @IsString()
  @Length(8, 40, { message: 'o tamanho minimo do nome é 8 caracteres' })
  nome: string;

  @IsString()
  @Length(12, 40, { message: 'o tamanho minimo da data de nascimento é de 10 caracteres (19/04/2000)' })
  dataNascimento: string;

  @IsString()
  @Length(8, 30, { message: 'o tamanho minimo do cidade é 8 caracteres' })
  cidade: string;

  @IsString()
  @Length(2, 2, { message: 'o tamanho minimo do nome é 4 caracteres' })
  estado: string;

  @IsInt()
  userId: number;
}

export class UpdateDadosDto extends PartialType(CreateDadosDto) {}
