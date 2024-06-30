import { mount, config } from '@vue/test-utils';
import OverviewTable from '@/components/OverviewTable.vue';
import { describe, it, expect } from 'vitest';

// Mock the router-link globally
config.global.components = {
  'router-link': {
    template: '<a><slot /></a>'
  }
};

describe('OverviewTable.vue', () => {
  it('renders the OverviewTable component', () => {
    const wrapper = mount(OverviewTable);
    expect(wrapper.exists()).toBe(true);
  });


  it('contains the save button', () => {
    const wrapper = mount(OverviewTable);
    expect(wrapper.find('button[type="button"]').exists()).toBe(true);
  });
});
