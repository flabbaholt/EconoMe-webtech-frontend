import { mount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import { describe, it, expect, test } from 'vitest'

test('renders the navbar', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.find('.navbar').exists()).toBe(true)
})

