import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { describe, expect } from 'vitest'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm', () => {
  test('when a new blog is created, createHandler is called once', async () => {
    const mockCreateHandler = vi.fn()
    const user = userEvent.setup()
    render(<CreateBlogForm createHandler={mockCreateHandler} />)

    const input1 = screen.getByPlaceholderText('title')
    await user.type(input1, 'Some cool title')
    const input2 = screen.getByPlaceholderText('author')
    await user.type(input2, 'Mr Author')
    const input3 = screen.getByPlaceholderText('url')
    await user.type(input3, 'mywebsite.com')

    const submitButton = screen.getByRole('button')
    await user.click(submitButton)

    expect(mockCreateHandler.mock.calls).toHaveLength(1)
  })
})
