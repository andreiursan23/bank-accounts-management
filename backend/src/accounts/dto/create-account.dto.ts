import { IsISO4217CurrencyCode, IsNumber, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  ownerId: number;

  @IsISO4217CurrencyCode()
  currency: string;

  @IsNumber()
  @IsOptional()
  balance?: number;
}
