import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('new blog form', () => {
  let container
  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()
    container = render(<NewBlogForm createBlog={createBlog} />).container
  })

  test('form returns the correct data from fields', () => {
    const titleInput = container.querySelector('.title')
    const authorInput = container.querySelector('.author')
    const urlInput = container.querySelector('.url')
    
    userEvent.type(titleInput, 'testing title input' )
    userEvent.type(authorInput, 'testing author input' )
    userEvent.type(urlInput, 'testing url input' )

    const submit = screen.getByText('submit')
    userEvent.click(submit)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title input' )
    expect(createBlog.mock.calls[0][0].author).toBe('testing author input' )
    expect(createBlog.mock.calls[0][0].url).toBe('testing url input' )
  })
})