import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreditCardController } from 'src/controller/creditCard.controller';
import { VisaCardService } from 'src/services/visaCard.service';
import { MasterCardService } from 'src/services/mastercardCard.service';

describe('CreditCardController', () => {
  let controller: CreditCardController;
  let visaService: VisaCardService;
  let masterCardService: MasterCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardController],
      providers: [VisaCardService, MasterCardService],
    }).compile();

    controller = module.get<CreditCardController>(CreditCardController);
    visaService = module.get<VisaCardService>(VisaCardService);
    masterCardService = module.get<MasterCardService>(MasterCardService);
  });

  it('should validate a valid Visa card', () => {
    expect(
      controller.validateCard({ cardNumber: '4111111111111111', cvv: '123' }),
    ).toBe(true);
  });

  it('should validate a valid MasterCard card', () => {
    expect(
      controller.validateCard({ cardNumber: '5111111111111111', cvv: '456' }),
    ).toBe(true);
  });

  it('should throw an error for an unsupported card flag', () => {
    try {
      controller.validateCard({ cardNumber: '6111111111111111', cvv: '123' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Card flag not supported.');
    }
  });

  it('should throw an error for an invalid CVV on Visa', () => {
    try {
      controller.validateCard({ cardNumber: '4111111111111111', cvv: '12' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(
        'Invalid CVV for VISA cards. It must have 3 digits.',
      );
    }
  });

  it('should throw an error for an invalid CVV on MasterCard', () => {
    try {
      controller.validateCard({ cardNumber: '5111111111111111', cvv: '99' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(
        'Invalid CVV for MasterCard cards. It must have 3 digits.',
      );
    }
  });
});
