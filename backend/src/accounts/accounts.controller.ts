import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SearchAccountDto } from './dto/search-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.findAll();
  }

  @Get('search')
  async search(@Query() query: SearchAccountDto) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.search(query);
  }

  @Get('allOwnerIds')
  async findAllOwnerIds() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.findAllOwnerIds();
  }

  @Get(':ownerId')
  async findByOwnerId(@Param('ownerId') ownerId: number) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.findByOwnerId(ownerId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 ms delay to see the loader
    return this.accountsService.remove(+id);
  }
}
