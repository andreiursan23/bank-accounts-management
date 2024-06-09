import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from 'src/transfers/entities/transfer.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Transfer]),
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService, TypeOrmModule],
})
export class AccountsModule {}
