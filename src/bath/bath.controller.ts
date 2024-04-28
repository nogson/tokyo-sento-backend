import {
  Req,
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { Msg } from './interfaces/bath.interface';
import { BathService } from './bath.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from './dto/bath.dto';
import { Comment } from '@prisma/client';

@Controller('bath')
export class BathController {
  constructor(private readonly bathService: BathService) {}
  @Post('visit')
  visit(
    @Req() req: Request,
    @Body('bathId', ParseIntPipe) bathId: number,
  ): Promise<Msg> {
    return this.bathService.createVisitBath(req.user.id, bathId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/comment')
  comment(
    @Req() req: Request,
    @Param('id', ParseIntPipe) bathId: number,
    @Body() dto: CommentDto,
  ): Promise<Msg> {
    return this.bathService.createComment(req.user.id, bathId, dto);
  }

  @Get('/:id/comments')
  getComment(@Param('id', ParseIntPipe) bathId: number): Promise<Comment[]> {
    return this.bathService.getComment(bathId);
  }
}
