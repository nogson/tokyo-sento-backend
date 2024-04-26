import { Module } from '@nestjs/common';
import { BathController } from './bath.controller';
import { BathService } from './bath.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BathController],
  providers: [BathService],
})
export class BathModule {}
