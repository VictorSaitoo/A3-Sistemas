import { Module } from '@nestjs/common';
import { ProjetoService } from './service/projeto.service';
import { ProjetoController } from './controller/projeto.controller';
import { DocumentoService } from './service/documento.service';
import { DocumentoController } from './controller/documento.controller';

@Module({
  providers: [ProjetoService, DocumentoService],
  controllers: [ProjetoController, DocumentoController]
})
export class DocumentoModule {}
