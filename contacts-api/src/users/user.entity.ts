import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contact } from '../contacts/contact.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];
}

