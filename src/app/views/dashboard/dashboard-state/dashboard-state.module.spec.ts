import { DashboardStateModule } from './dashboard-state.module';

describe('DashboardStateModule', () => {
  let dashboardStateModule: DashboardStateModule;

  beforeEach(() => {
    dashboardStateModule = new DashboardStateModule();
  });

  it('should create an instance', () => {
    expect(dashboardStateModule).toBeTruthy();
  });
});
