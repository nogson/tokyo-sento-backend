import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Msg } from './interfaces/bath.interface';
import { CommentDto } from './dto/bath.dto';
import { Comment } from '@prisma/client';

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

  async createComment(
    userId: number,
    bathId: number,
    dto: CommentDto,
  ): Promise<Msg> {
    console.log(userId, bathId, dto);
    await this.prisma.comment.create({
      data: { userId, bathId, ...dto },
    });

    return {
      message: 'ok',
    };
  }

  async getComment(bathId: number): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: { bathId },
    });
  }
}
