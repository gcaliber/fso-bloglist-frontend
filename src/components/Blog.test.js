import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog rendering', () => {
  let container
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Testing',
      author: 'Testman',
      url: 'www.test.com',
      likes: 0,
      user: { id: 'dummyID' },
      id: 'dummyID'
    }
  
    const user = {
      id: 'dummyId'
    }

    mockHandler = jest.fn()
    container = render(<Blog blog={blog} user={user} handleLikes={mockHandler} handleRemove={mockHandler}/>).container
  })

  test('at the start only renders title and author', () => {
    const blogDiv = container.querySelector('.blog')
    const detailsDiv = container.querySelector('.blog__details')
    expect(blogDiv).toHaveTextContent('Testing', 'Testman')
    expect(detailsDiv).toHaveStyle('display: none')
  })

  test('likes and url shown after button clicked', () => {
    const detailsDiv = container.querySelector('.blog__details')
    const button = screen.getByText('view')
    userEvent.click(button)
    expect(detailsDiv).toHaveStyle('display: block')
  })

  test('like button records one like per click', () => {
    const button = screen.getByText('like')
    userEvent.click(button)
    userEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
