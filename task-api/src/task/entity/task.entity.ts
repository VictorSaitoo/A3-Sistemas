import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user.entity'

@Entity('tasks')
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 256 })
    description: string;

    @Column({ length: 20 })
    status: string;

    @Column({ length: 10 })
    expirationDate: Date;

    @ManyToOne(() => User, user => user.task) // esta linha foi adicionada
    user: User;    
}