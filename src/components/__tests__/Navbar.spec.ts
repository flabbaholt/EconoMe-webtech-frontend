import { mount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import { describe, it, expect, vi } from 'vitest';

// Mocking the 'vue-router' to replace the Link component for testing purposes.
vi.mock('vue-router', () => ({
    Link: { template: '<div><slot /></div>' }
}));

/**
 * Test suite for the Navbar component.
 */
describe('Navbar', () => {
    /**
     * Tests if the Navbar component is rendered.
     */
    it('renders the navbar', () => {
        const wrapper = mount(Navbar);
        // Checks if the navbar class exists in the DOM.
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });

    /**
     * Tests if the Navbar component renders the logo.
     */
    it('renders the logo', () => {
        const wrapper = mount(Navbar);
        const logo = wrapper.find('img');
        // Checks if the logo image exists in the DOM.
        expect(logo.exists()).toBe(true);
    });

    /**
     * Tests if the Navbar component renders navigation links.
     */
    it('renders navigation links', () => {
        const wrapper = mount(Navbar);
        const navLinks = wrapper.findAll('.nav-link');
        // Checks the number of navigation links and their text content.
        expect(navLinks.length).toBe(3);
        expect(navLinks[0].text()).toBe('Home');
        expect(navLinks[1].text()).toBe('Overview');
        expect(navLinks[2].text()).toBe('Dashboard');
    });
});