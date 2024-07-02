import { mount, config } from '@vue/test-utils';
import TransactionForm from '@/components/TransactionForm.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

// Mock the router-link globally for consistent testing environment
config.global.components = {
  'router-link': {
    template: '<a><slot /></a>'
  }
};

// Mocking axios for testing HTTP requests
vi.mock('axios');

/**
 * Test suite for TransactionForm.vue component.
 * This component is responsible for creating and submitting transaction forms.
 */
describe('TransactionForm.vue', () => {
  const mockDropdownItems = ['Item1', 'Item2', 'Item3'];

  // Setup mock data and axios calls before each test
  beforeEach(() => {
    // Mocking axios.get to simulate fetching dropdown items for currencies, categories, and payment methods
    axios.get = vi.fn().mockImplementation((url) => {
      if (url.includes('/currencies') || url.includes('/categories') || url.includes('/paymentMethods')) {
        return Promise.resolve({ data: mockDropdownItems.map((item, index) => ({ id: index + 1, name: item })) });
      }
      return Promise.reject(new Error('not found'));
    });

    // Mocking axios.post to simulate submitting the form
    axios.post = vi.fn().mockResolvedValue({});
  });

  // Test to ensure the name input field is present
  it('contains the name input field', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('input#name').exists()).toBe(true);
  });

  // Test to ensure the amount input field is present
  it('contains the amount input field', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('input#amount').exists()).toBe(true);
  });

  // Test to ensure the category dropdown is present
  it('contains the category dropdown', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('select#category').exists()).toBe(true);
  });

  // Test to ensure the date input field is present
  it('contains the date input field', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('input#date').exists()).toBe(true);
  });

  // Test to ensure the submit button is present
  it('contains the submit button', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  // Test to ensure the payment method dropdown is present
  it('contains the payment method dropdown', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('select#payment').exists()).toBe(true);
  });

  // Test to ensure the currency dropdown button is present
  it('contains the currency dropdown button', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('button[data-bs-toggle="dropdown"]').exists()).toBe(true);
  });

  // Test to ensure the category add button is present
  it('contains the category add button', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('button[data-bs-target="#addCategoryModal"]').exists()).toBe(true);
  });

  // Test to ensure the payment method add button is present
  it('contains the payment method add button', () => {
    const wrapper = mount(TransactionForm);
    expect(wrapper.find('button[data-bs-target="#addPaymentMethodModal"]').exists()).toBe(true);
  });
});