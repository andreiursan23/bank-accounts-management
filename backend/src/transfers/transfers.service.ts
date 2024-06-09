import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer } from './entities/transfer.entity';

@Injectable()
export class TransfersService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    private readonly accountsService: AccountsService,
  ) {}

  findAll() {
    return this.transfersRepository.find();
  }

  async create(createTransferDto: CreateTransferDto) {
    const { fromAccountId, toAccountId, amount } = createTransferDto;
    const fromAccount = await this.accountsService.findOne(fromAccountId);
    const toAccount = await this.accountsService.findOne(toAccountId);

    const amountNumber = parseFloat(amount.toFixed(2));
    const fromAccountBalance = parseFloat(fromAccount.balance.toFixed(2));
    const toAccountBalance = parseFloat(toAccount.balance.toFixed(2));

    if (fromAccount.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const updatedFromAccountBalance = (
      fromAccountBalance - amountNumber
    ).toFixed(2);
    const updatedToAccountBalance = (toAccountBalance + amountNumber).toFixed(
      2,
    );

    await this.accountsService.update(fromAccountId, {
      balance: parseFloat(updatedFromAccountBalance),
    });
    await this.accountsService.update(toAccountId, {
      balance: parseFloat(updatedToAccountBalance),
    });

    const transfer = this.transfersRepository.create({
      fromAccount,
      toAccount,
      amount,
    });

    return this.transfersRepository.save(transfer);
  }
}
