import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardComponent from '@/components/DashboardComponent.vue';

/**
 * Test suite for DashboardComponent.vue
 */
describe('DashboardComponent.vue', () => {

  /**
   * Tests if the dashboard container element is rendered correctly.
   */
  it('sollte das Dashboard-Container-Element rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('.container-md').exists()).toBe(true);
  });

  /**
   * Tests if the year selection dropdown is rendered correctly.
   */
  it('sollte die Jahresauswahl rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('button.dropdown-toggle').exists()).toBe(true);
    expect(wrapper.find('ul.dropdown-menu').exists()).toBe(true);
  });

  /**
   * Tests if the canvas for the income-expense chart is rendered correctly.
   */
  it('sollte das Canvas für das Einkommen-Ausgaben-Diagramm rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('#incomeExpenseChart').exists()).toBe(true);
  });

  /**
   * Tests if the canvas for the monthly income chart is rendered correctly.
   */
  it('sollte das Canvas für das monatliche Einkommendiagramm rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('#monthlyIncomeChart').exists()).toBe(true);
  });

  /**
   * Tests if the canvas for the monthly expense chart is rendered correctly.
   */
  it('sollte das Canvas für das monatliche Ausgabendiagramm rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('#monthlyExpenseChart').exists()).toBe(true);
  });

});