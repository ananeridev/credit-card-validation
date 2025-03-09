import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MasterCardService } from 'src/services/mastercardCard.service';
import { VisaCardService } from 'src/services/visaCard.service';

@Controller('credit-card')
export class CreditCardController {
  constructor(
    private readonly visaCardService: VisaCardService,
    private readonly masterCardService: MasterCardService,
  ) {}

  @Post('validate')
  validateCard(@Body() body: { cardNumber: string; cvv: string }) {
    const { cardNumber, cvv } = body;

    if (cardNumber.startsWith('4')) {
      return this.visaCardService.processCard(cardNumber, cvv);
    } else if (cardNumber.startsWith('5')) {
      return this.masterCardService.processCard(cardNumber, cvv);
    } else {
      throw new BadRequestException('Card flag not supported.');
    }
  }
}
