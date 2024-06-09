import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transfer } from './transfers/entities/transfer.entity';
import { TransfersModule } from './transfers/transfers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Account, Transfer],
      synchronize: true,
      logging: true,
    }),
    AccountsModule,
    TransfersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
