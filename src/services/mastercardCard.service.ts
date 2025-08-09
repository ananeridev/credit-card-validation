import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseCreditCardService } from './baseCreditCard.service';

@Injectable()
export class MasterCardService extends BaseCreditCardService {
  protected validateCardNumber(cardNumber: string): void {
    if (!cardNumber.startsWith('5')) {
      throw new BadRequestException('Invalid card number for MasterCard.');
    }
  }

  protected validateCVV(cardNumber: string, cvv: string): boolean {
    if (cvv.length !== 3) {
      throw new BadRequestException(
        'Invalid CVV for MasterCard cards. It must have 3 digits.',
      );
    }
    return true;
  }
}
