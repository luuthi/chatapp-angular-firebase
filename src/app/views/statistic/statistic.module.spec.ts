import { StatisticModule } from './statistic.module';

describe('StatisticModule', () => {
  let statisticModule: StatisticModule;

  beforeEach(() => {
    statisticModule = new StatisticModule();
  });

  it('should create an instance', () => {
    expect(statisticModule).toBeTruthy();
  });
});
