import { IsISO4217CurrencyCode, IsNumber, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @IsNumber()
  @IsOptional()
  ownerId?: number;

  @IsISO4217CurrencyCode()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @IsOptional()
  balance?: number;
}
