import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from 'src/transfers/entities/transfer.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    const account = this.accountsRepository.create(createAccountDto);
    return this.accountsRepository.save(account);
  }

  findAll() {
    return this.accountsRepository.find();
  }

  async findOne(id: number) {
    const account = await this.accountsRepository.findOne({ where: { id } });
    if (!account) throw new NotFoundException(`Account #${id} not found`);
    return account;
  }

  async findByOwnerId(ownerId: number) {
    const account = await this.accountsRepository.find({ where: { ownerId } });
    if (!account)
      throw new NotFoundException(`Account(s) of #${ownerId} not found`);
    return account;
  }

  async findAllOwnerIds() {
    const ownerIds = await this.accountsRepository
      .createQueryBuilder('account')
      .select('DISTINCT account.ownerId', 'ownerId')
      .getRawMany();
    if (ownerIds.length === 0) throw new NotFoundException(`No ownerIds found`);
    return ownerIds.map((account) => account.ownerId);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    Object.assign(account, updateAccountDto);
    return this.accountsRepository.save(account);
  }

  async remove(id: number) {
    const account = await this.findOne(id);

    await this.transfersRepository.delete({ fromAccount: { id } });
    await this.transfersRepository.delete({ toAccount: { id } });

    return this.accountsRepository.remove(account);
  }

  async search(query: { term: string }) {
    const searchTerm = query.term;
    const qb = this.accountsRepository.createQueryBuilder('account');

    qb.where('account.ownerId LIKE :searchTerm', {
      searchTerm: `%${searchTerm}%`,
    })
      .orWhere('account.currency LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orWhere('account.balance LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });

    return qb.getMany();
  }
}
