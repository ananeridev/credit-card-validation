import { BadRequestException } from '@nestjs/common';
import { MasterCardService } from 'src/services/mastercardCard.service';

describe('MasterCardService', () => {
  let service: MasterCardService;

  beforeEach(() => {
    service = new MasterCardService();
  });

  it('should validate a correct CVV for MasterCard', () => {
    expect(service.processCard('5111111111111111', '456')).toBe(true);
  });

  it('should throw an error if the card number is not a MasterCard', () => {
    expect(() => service.processCard('4111111111111111', '456')).toThrowError(
      'Invalid card number for MasterCard.',
    );
  });

  it('should throw an error if the CVV is less than 3 digits', () => {
    expect(() => service.processCard('5111111111111111', '45')).toThrowError(
      'Invalid CVV for MasterCard cards. It must have 3 digits.',
    );
  });

  it('should throw an error if the CVV is more than 3 digits', () => {
    expect(() => service.processCard('5111111111111111', '4567')).toThrowError(
      'Invalid CVV for MasterCard cards. It must have 3 digits.',
    );
  });

  it('should throw a BadRequestException if the CVV is less than 3 digits', () => {
    expect(() => service.processCard('5111111111111111', '45')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('5111111111111111', '45')).toThrow(
      'Invalid CVV for MasterCard cards. It must have 3 digits.',
    );
  });

  it('should throw a BadRequestException if the CVV is more than 3 digits', () => {
    expect(() => service.processCard('5111111111111111', '4567')).toThrow(
      BadRequestException,
    );
    expect(() => service.processCard('5111111111111111', '4567')).toThrow(
      'Invalid CVV for MasterCard cards. It must have 3 digits.',
    );
  });
});
