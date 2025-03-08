import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseCreditCardService } from './baseCreditCard.service';

@Injectable()
export class MasterCardService extends BaseCreditCardService {
  protected validateCardNumber(cardNumber: string): void {
    if (!cardNumber.startsWith('5')) {
      throw new BadRequestException(
        'Número de cartão inválido para MasterCard.',
      );
    }
  }

  protected validateCVV(cardNumber: string, cvv: string): boolean {
    if (cvv.length !== 3) {
      throw new BadRequestException(
        'CVV inválido para cartões MasterCard. Deve ter 3 dígitos.',
      );
    }
    return true;
  }
}
