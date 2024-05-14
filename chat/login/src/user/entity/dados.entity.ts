import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('dados')
export class Dados {
    @PrimaryGeneratedColumn()
    id_perfil: number;

    @Column({ length: 40 })
    nome: string;

    @Column({ length: 15 })
    dataNascimento: string;

    @Column({ length: 30 })
    cidade: string;

    @Column({ length: 30 })
    estado: string;

    @ManyToOne(() => User, user => user.dados)
    user: User;  
}