import { IsNumber } from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  fromAccountId: number;

  @IsNumber()
  toAccountId: number;

  @IsNumber()
  amount: number;
}
