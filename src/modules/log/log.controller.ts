import {
  Controller,
  Post,
  Request,
  HttpCode,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { ClearDto, GetListDto } from './dto/log.dto';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(
    private readonly service: LogService,
  ) { }

  @HttpCode(200)
  @Get('get-list')
  async getList(@Query() query: GetListDto, @Request() req: any) {
    return this.service.getList(query);
  }

  @HttpCode(200)
  @Post('clear')
  async clear(@Body() body: ClearDto, @Request() req: any) {
    return this.service.clear(body, req.user.id);
  }
}
