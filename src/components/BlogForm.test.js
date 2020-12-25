import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('BlogForm calls the addBlog function with correct values', () => {
    const addBlog = jest.fn();

    const component = render(
        <BlogForm addBlog={addBlog} />
    );

    component.debug();

    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
        target: { value: 'BlogForm title'}
    });

    fireEvent.change(author, {
        target: { value: 'BlogForm author' }
    });

    fireEvent.change(url, {
        target: { value: 'BlogForm url' }
    });

    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0]).toEqual({
        title: 'BlogForm title',
        author: 'BlogForm author',
        url: 'BlogForm url'
    });
});