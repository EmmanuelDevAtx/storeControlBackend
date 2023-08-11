import { Test, TestingModule } from '@nestjs/testing';
import { DiscountsResolver } from './discounts.resolver';
import { DiscountsService } from './discounts.service';

describe('DiscountsResolver', () => {
  let resolver: DiscountsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountsResolver, DiscountsService],
    }).compile();

    resolver = module.get<DiscountsResolver>(DiscountsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
