import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreditCardController } from 'src/controller/creditCard.controller';
import { MasterCardService } from 'src/services/mastercardCard.service';
import { VisaCardService } from 'src/services/visaCard.service';

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

  it('deve validar um cartão Visa válido', () => {
    expect(
      controller.validateCard({ cardNumber: '4111111111111111', cvv: '123' }),
    ).toBe(true);
  });

  it('deve validar um cartão MasterCard válido', () => {
    expect(
      controller.validateCard({ cardNumber: '5111111111111111', cvv: '456' }),
    ).toBe(true);
  });

  it('deve lançar erro para bandeira não suportada', () => {
    try {
      controller.validateCard({ cardNumber: '6111111111111111', cvv: '123' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Bandeira de cartão não suportada.');
    }
  });

  it('deve lançar erro para CVV inválido no Visa', () => {
    try {
      controller.validateCard({ cardNumber: '4111111111111111', cvv: '12' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(
        'CVV inválido para cartões VISA. Deve ter 3 dígitos.',
      );
    }
  });

  it('deve lançar erro para CVV inválido no MasterCard', () => {
    try {
      controller.validateCard({ cardNumber: '5111111111111111', cvv: '99' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(
        'CVV inválido para cartões MasterCard. Deve ter 3 dígitos.',
      );
    }
  });
});
