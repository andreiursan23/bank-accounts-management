import { IsString } from 'class-validator';

export class SearchAccountDto {
  @IsString()
  term: string;
}
