import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';
import { Transfer } from './entities/transfer.entity';
import { TransfersController } from './transfers.controller';
import { TransfersService } from './transfers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer]), AccountsModule],
  controllers: [TransfersController],
  providers: [TransfersService, AccountsService],
})
export class TransfersModule {}
