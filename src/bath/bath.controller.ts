import {
  Req,
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Msg } from './interfaces/bath.interface';
import { BathService } from './bath.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
}
