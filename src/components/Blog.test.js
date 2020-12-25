import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';


test('Blog component renders only title and author by default', () => {
    const blog = {
        title: 'Blog Component',
        author: 'Test User',
        likes: 5,
        url: 'www.google.com'
    }

    const component = render(
        <Blog blog={blog} />
    );

    expect(component.container).toHaveTextContent(
        'Blog Component Test User'
    );

    expect(component.container).not.toHaveTextContent(
        'www.google.com'
    );
});