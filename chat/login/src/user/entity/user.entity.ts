import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Dados} from './dados.entity';
import { ProjetoDocumentoUser } from 'src/documento/entity/projeto_documento_user.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ length: 40 })
    nome: string;

    @Column({ unique: true, length: 40 })
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => Dados, dados => dados.user) 
    dados: Dados[]; 

    @OneToMany(() => ProjetoDocumentoUser, pd => pd.user)
    projetoDocumentoUsers: ProjetoDocumentoUser[];
}