import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Contact } from './contacts/contact.entity';
import { UsersModule } from './users/user.module';
import { ContactsModule } from './contacts/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo de configuração global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Contact],
        synchronize: true, // Defina como false em produção
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ContactsModule,
  ],
})
export class AppModule {}
