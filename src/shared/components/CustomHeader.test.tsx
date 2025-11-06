import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
    const name = 'Buscador de Gifs';
    const description = 'Descubre y comparte el Gif perfecto';

    test('should render the title correctly', () => {

        render(<CustomHeader title={name} description={description} />);

        expect(screen.getByText(name)).toBeDefined();
        expect(screen.getByText(name)).not.toBeNull();

    });

    test('should render the description when provided', () => {

        render(<CustomHeader title={name} description={description} />);

        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByText(description)).not.toBeNull();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });

    test('should not render description when not provided', () => {
        //comprobamos que no hay description
        const { container } = render(<CustomHeader title={name} />);

        const divElement = container.querySelector('.content-center');

        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(name);

        const p = divElement?.querySelector('p');
        expect(p).toBeNull();

    });
})