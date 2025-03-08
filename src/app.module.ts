import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreditCardController } from './controller/creditCard.controller';
import { VisaCardService } from './services/visaCard.service';
import { MasterCardService } from './services/mastercardCard.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CreditCardController],
  providers: [VisaCardService, MasterCardService],
})
export class AppModule {}
