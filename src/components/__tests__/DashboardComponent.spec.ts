import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DashboardComponent from '@/components/DashboardComponent.vue';

describe('DashboardComponent.vue', () => {

  it('sollte das Dashboard-Container-Element rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('.container-md').exists()).toBe(true);
  });

  it('sollte die Jahresauswahl rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('button.dropdown-toggle').exists()).toBe(true);
    expect(wrapper.find('ul.dropdown-menu').exists()).toBe(true);
  });

  it('sollte das Canvas für das Einkommen-Ausgaben-Diagramm rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('#incomeExpenseChart').exists()).toBe(true);
  });

  it('sollte das Canvas für das monatliche Einkommendiagramm rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('#monthlyIncomeChart').exists()).toBe(true);
  });

  it('sollte das Canvas für das monatliche Ausgabendiagramm rendern', () => {
    const wrapper = mount(DashboardComponent);
    expect(wrapper.find('#monthlyExpenseChart').exists()).toBe(true);
  });

});
