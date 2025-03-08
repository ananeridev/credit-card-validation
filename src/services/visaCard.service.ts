import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseCreditCardService } from './baseCreditCard.service';

@Injectable()
export class VisaCardService extends BaseCreditCardService {
  protected validateCardNumber(cardNumber: string): void {
    if (!cardNumber.startsWith('4')) {
      throw new BadRequestException('Número de cartão inválido para VISA.');
    }
  }

  protected validateCVV(cardNumber: string, cvv: string): boolean {
    if (cvv.length !== 3) {
      throw new BadRequestException(
        'CVV inválido para cartões VISA. Deve ter 3 dígitos.',
      );
    }
    return true;
  }
}
