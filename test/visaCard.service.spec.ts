import { BadRequestException } from '@nestjs/common';
import { VisaCardService } from 'src/services/visaCard.service';

describe('VisaCardService', () => {
  let service: VisaCardService;

  beforeEach(() => {
    service = new VisaCardService();
  });

  it('deve validar um CVV correto para Visa', () => {
    expect(service.processCard('4111111111111111', '123')).toBe(true);
  });

  it('deve lançar erro se o número do cartão não for Visa', () => {
    expect(() => service.processCard('5111111111111111', '123')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('5111111111111111', '123')).toThrow(
      'Número de cartão inválido para VISA.',
    );
  });

  it('deve lançar erro se o CVV for menor que 3 dígitos', () => {
    expect(() => service.processCard('4111111111111111', '12')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('4111111111111111', '12')).toThrow(
      'CVV inválido para cartões VISA. Deve ter 3 dígitos.',
    );
  });

  it('deve lançar erro se o CVV for maior que 3 dígitos', () => {
    expect(() => service.processCard('4111111111111111', '1234')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('4111111111111111', '1234')).toThrow(
      'CVV inválido para cartões VISA. Deve ter 3 dígitos.',
    );
  });
});
