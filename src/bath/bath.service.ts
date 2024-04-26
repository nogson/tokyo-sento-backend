import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Msg } from './interfaces/bath.interface';

@Injectable()
export class BathService {
  constructor(private prisma: PrismaService) {}

  async createVisitBath(userId: number, bathId: number): Promise<Msg> {
    await this.prisma.visitedBath.create({
      data: { userId, bathId },
    });

    return {
      message: 'ok',
    };
  }
}
