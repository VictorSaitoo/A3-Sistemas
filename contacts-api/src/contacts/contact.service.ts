import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async findAll(userId: number): Promise<Contact[]> {
    return this.contactsRepository.find({
      where: { user: { id: userId } },
      relations: ['friend'],
    });
  }

  async addContact(userId: number, friendId: number): Promise<Contact> {
    const contact = this.contactsRepository.create({
      user: { id: userId } as User,
      friend: { id: friendId } as User,
    });
    return this.contactsRepository.save(contact);
  }
}
