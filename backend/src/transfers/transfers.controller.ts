import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Get()
  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.transfersService.findAll();
  }

  @Post()
  async create(@Body() createTransferDto: CreateTransferDto) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.transfersService.create(createTransferDto);
  }
}
