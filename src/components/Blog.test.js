import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';


test('Blog component renders only title and author by default', () => {
    const blog = {
        title: 'Blog Component',
        author: 'Test User',
        likes: 5,
        url: 'www.google.com',
        user: {
            name: 'Tester'
        }
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


test('Blog\'s url and likes are shown when view button is clicked', () => {
    const blog = {
        title: 'Blog Component',
        author: 'Test User',
        likes: 5,
        url: 'www.google.com',
        user: {
            name: 'Tester'
        }
    };

    const mockHandler = jest.fn();

    const component = render(
        <Blog blog={blog} />
    );
    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('5');
    expect(component.container).toHaveTextContent('www.google.com');
});


test ('Blog\'s increaseLikesByOne prop is called twice when like button is pressed twice', () => {
    const blog = {
        title: 'Blog Component',
        author: 'Test User',
        likes: 5,
        url: 'www.google.com',
        user: {
            name: 'Tester'
        }
    };

    const mockHandler = jest.fn();

    const component = render(
        <Blog blog={blog} increaseLikeByOne={mockHandler} />
    );

    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
});