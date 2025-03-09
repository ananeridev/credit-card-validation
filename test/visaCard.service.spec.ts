import { BadRequestException } from '@nestjs/common';
import { VisaCardService } from 'src/services/visaCard.service';

describe('VisaCardService', () => {
  let service: VisaCardService;

  beforeEach(() => {
    service = new VisaCardService();
  });

  it('should validate a correct CVV for Visa', () => {
    expect(service.processCard('4111111111111111', '123')).toBe(true);
  });

  it('should throw an error if the card number is not a Visa', () => {
    expect(() => service.processCard('5111111111111111', '123')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('5111111111111111', '123')).toThrow(
      'Invalid card number for VISA.',
    );
  });

  it('should throw an error if the CVV is less than 3 digits', () => {
    expect(() => service.processCard('4111111111111111', '12')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('4111111111111111', '12')).toThrow(
      'Invalid CVV for VISA cards. It must have 3 digits.',
    );
  });

  it('should throw an error if the CVV is more than 3 digits', () => {
    expect(() => service.processCard('4111111111111111', '1234')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('4111111111111111', '1234')).toThrow(
      'Invalid CVV for VISA cards. It must have 3 digits.',
    );
  });
});
