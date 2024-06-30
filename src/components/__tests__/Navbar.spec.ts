import { mount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import { describe, it, expect, test } from 'vitest'

test('renders the navbar', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.find('.navbar').exists()).toBe(true)
})

test('renders the logo', () => {
    const wrapper = mount(Navbar)
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
})

test('renders the username', () => {
    const wrapper = mount(Navbar)
    const username = wrapper.find('.navbar-text')
    expect(username.text()).toBe('Hello UserName')
})

test('renders navigation links', () => {
    const wrapper = mount(Navbar)
    const navLinks = wrapper.findAll('.nav-link')
    expect(navLinks.length).toBe(3)
    expect(navLinks[0].text()).toBe('Home')
    expect(navLinks[1].text()).toBe('Overview')
    expect(navLinks[2].text()).toBe('Dashboard')
})
