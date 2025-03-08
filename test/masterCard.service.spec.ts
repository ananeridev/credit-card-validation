import { BadRequestException } from '@nestjs/common';
import { MasterCardService } from 'src/services/mastercardCard.service';

describe('MasterCardService', () => {
  let service: MasterCardService;

  beforeEach(() => {
    service = new MasterCardService();
  });

  it('deve validar um CVV correto para MasterCard', () => {
    expect(service.processCard('5111111111111111', '456')).toBe(true);
  });

  it('deve lançar erro se o número do cartão não for MasterCard', () => {
    expect(() => service.processCard('4111111111111111', '456')).toThrowError(
      'Número de cartão inválido para MasterCard.',
    );
  });

  it('deve lançar erro se o CVV for menor que 3 dígitos', () => {
    expect(() => service.processCard('5111111111111111', '45')).toThrowError(
      'CVV inválido para cartões MasterCard. Deve ter 3 dígitos.',
    );
  });

  it('deve lançar erro se o CVV for maior que 3 dígitos', () => {
    expect(() => service.processCard('5111111111111111', '4567')).toThrowError(
      'CVV inválido para cartões MasterCard. Deve ter 3 dígitos.',
    );
  });

  it('deve lançar erro se o CVV for menor que 3 dígitos', () => {
    expect(() => service.processCard('5111111111111111', '45')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('5111111111111111', '45')).toThrow(
      'CVV inválido para cartões MasterCard. Deve ter 3 dígitos.',
    );
  });

  it('deve lançar erro se o CVV for maior que 3 dígitos', () => {
    expect(() => service.processCard('5111111111111111', '4567')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('5111111111111111', '4567')).toThrow(
      'CVV inválido para cartões MasterCard. Deve ter 3 dígitos.',
    );
  });
});
