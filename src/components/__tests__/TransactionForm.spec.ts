  import { mount, config } from '@vue/test-utils';
  import TransactionForm from '@/components/TransactionForm.vue';
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

  describe('TransactionForm.vue', () => {
    const mockDropdownItems = ['Item1', 'Item2', 'Item3'];

    beforeEach(() => {
      axios.get = vi.fn().mockImplementation((url) => {
        if (url.includes('/currencies') || url.includes('/categories') || url.includes('/paymentMethods')) {
          return Promise.resolve({ data: mockDropdownItems.map((item, index) => ({ id: index + 1, name: item })) });
        }
        return Promise.reject(new Error('not found'));
      });

      axios.post = vi.fn().mockResolvedValue({});
    });

    it('contains the name input field', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('input#name').exists()).toBe(true);
    });

    it('contains the amount input field', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('input#amount').exists()).toBe(true);
    });

    it('contains the category dropdown', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('select#category').exists()).toBe(true);
    });

    it('contains the date input field', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('input#date').exists()).toBe(true);
    });

    it('contains the submit button', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it('contains the payment method dropdown', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('select#payment').exists()).toBe(true);
    });

    it('contains the currency dropdown button', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('button[data-bs-toggle="dropdown"]').exists()).toBe(true);
    });

    it('contains the category add button', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('button[data-bs-target="#addCategoryModal"]').exists()).toBe(true);
    });

    it('contains the payment method add button', () => {
      const wrapper = mount(TransactionForm);
      expect(wrapper.find('button[data-bs-target="#addPaymentMethodModal"]').exists()).toBe(true);
    });
  });
