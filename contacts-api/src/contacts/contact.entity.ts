import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.contacts)
  user: User;

  @ManyToOne(() => User)
  friend: User;
}