import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  fromAccount: Account;

  @ManyToOne(() => Account)
  toAccount: Account;

  @Column()
  fromAccountId: number;

  @Column()
  toAccountId: number;

  @Column('decimal')
  amount: number;
}
