import { mount } from '@vue/test-utils';
import AddOptionModal from '@/components/AddOptionModal.vue';
import { describe, it, expect } from 'vitest';

describe('AddOptionModal.vue', () => {
  it('renders the modal with the correct title', () => {
    const wrapper = mount(AddOptionModal, {
      props: {
        modalId: 'testModal',
        title: 'Add New Item',
        placeholder: 'Enter new item'
      }
    });
    expect(wrapper.find('.modal-title').text()).toBe('Add New Item');
  });

  it('renders the input with the correct placeholder', () => {
    const wrapper = mount(AddOptionModal, {
      props: {
        modalId: 'testModal',
        title: 'Add New Item',
        placeholder: 'Enter new item'
      }
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter new item');
  });

  it('emits add-option event with input value when add button is clicked', async () => {
    const wrapper = mount(AddOptionModal, {
      props: {
        modalId: 'testModal',
        title: 'Add New Item',
        placeholder: 'Enter new item'
      }
    });
    const input = wrapper.find('input');
    await input.setValue('New Item');
    await wrapper.find('button.btn-primary').trigger('click');
    expect(wrapper.emitted('add-option')).toBeTruthy();
    expect(wrapper.emitted('add-option')![0]).toEqual([{ id: 0, name: 'New Item' }]);
  });

  it('clears the input value after emitting add-option event', async () => {
    const wrapper = mount(AddOptionModal, {
      props: {
        modalId: 'testModal',
        title: 'Add New Item',
        placeholder: 'Enter new item'
      }
    });
    const input = wrapper.find('input');
    await input.setValue('New Item');
    await wrapper.find('button.btn-primary').trigger('click');
    expect(input.element.value).toBe('');
  });

  it('renders the close button', () => {
    const wrapper = mount(AddOptionModal, {
      props: {
        modalId: 'testModal',
        title: 'Add New Item',
        placeholder: 'Enter new item'
      }
    });
    expect(wrapper.find('button.btn-secondary').exists()).toBe(true);
  });
});