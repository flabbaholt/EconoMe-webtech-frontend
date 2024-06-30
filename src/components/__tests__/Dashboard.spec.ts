import { mount, config } from '@vue/test-utils';
import DashboardComponent from '@/components/DashboardComponent.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock the router-link globally
config.global.components = {
  'router-link': {
    template: '<a><slot /></a>'
  }
};

// Mocking axios
vi.mock('axios');

describe('DashboardComponent.vue', () => {
  const mockTransactions = [
    { id: 1, transactionDate: '2023-01-01', typeName: 'Income', amount: 100 },
    { id: 2, transactionDate: '2023-02-01', typeName: 'Expense', amount: 50 },
  ];

  const mockYears = [2021, 2022, 2023];

  beforeEach(() => {
    axios.get = vi.fn().mockImplementation((url) => {
      if (url.includes('/transactions/dashboard')) {
        return Promise.resolve({ data: mockTransactions });
      } else if (url.includes('/transactions/getYears')) {
        return Promise.resolve({ data: mockYears });
      }
      return Promise.reject(new Error('not found'));
    });

    axios.delete = vi.fn().mockResolvedValue({});
  });

  it('renders the dashboard component', async () => {
    const wrapper = mount(DashboardComponent);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.container-md').exists()).toBe(true);
  });

  it('renders incomeExpenseChart', async () => {
    const wrapper = mount(DashboardComponent);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#incomeExpenseChart').exists()).toBe(true);
  });

  it('renders monthlyIncomeChart', async () => {
    const wrapper = mount(DashboardComponent);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#monthlyIncomeChart').exists()).toBe(true);
  });

  it('renders monthlyExpenseChart', async () => {
    const wrapper = mount(DashboardComponent);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#monthlyExpenseChart').exists()).toBe(true);
  });
});
