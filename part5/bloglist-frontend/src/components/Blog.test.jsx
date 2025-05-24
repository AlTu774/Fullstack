//import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Blog from './Blog'
//import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

describe('<Blog/>', () => {
  test('renders blogs title and author, but not URL or like by default', () => {
    const blog = {
      title:'First Title',
      author:'some author',
      url:'/localhost',
      likes:2,
      user:{ username:'testUser' }
    }
    const user = { username:'testUser' }
    const setBlog = vi.fn()

    const { container } = render(<Blog blog={ blog } setBlog={ setBlog } user={ user }/>)
    const div = container.querySelector('.testBlog')
    expect(div).toHaveTextContent('First Title some author')

    const toggleDiv = screen.getByTestId('toggletest').parentElement
    expect(toggleDiv).toHaveStyle('display: none')

  })
})