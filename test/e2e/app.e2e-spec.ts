import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('Credit Card Validation E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should validate a valid Visa card', async () => {
    await request(app.getHttpServer())
      .post('/credit-card/validate')
      .send({ cardNumber: '4111111111111111', cvv: '123' })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toBe(true);
      });
  });

  it('should validate a valid MasterCard card', async () => {
    await request(app.getHttpServer())
      .post('/credit-card/validate')
      .send({ cardNumber: '5111111111111111', cvv: '456' })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toBe(true);
      });
  });

  it('should return 400 for an unsupported card brand', async () => {
    await request(app.getHttpServer())
      .post('/credit-card/validate')
      .send({ cardNumber: '6111111111111111', cvv: '123' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Card flag not supported.');
      });
  });

  it('should return 400 for an invalid CVV on Visa', async () => {
    await request(app.getHttpServer())
      .post('/credit-card/validate')
      .send({ cardNumber: '4111111111111111', cvv: '12' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe(
          'Invalid CVV for VISA cards. It must have 3 digits.',
        );
      });
  });

  it('should return 400 for an invalid CVV on MasterCard', async () => {
    await request(app.getHttpServer())
      .post('/credit-card/validate')
      .send({ cardNumber: '5111111111111111', cvv: '45' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe(
          'Invalid CVV for MasterCard cards. It must have 3 digits.',
        );
      });
  });
});
