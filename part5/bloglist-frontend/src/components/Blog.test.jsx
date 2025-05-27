//import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect } from 'vitest'
import Togglable from './Togglable'

describe('<Blog/>', () => {
  test('renders blogs title and author, but not URL or likes by default', () => {
    const blog = {
      title:'First Title',
      author:'some author',
      url:'/localhost',
      likes:3363,
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

/*
  test('after clicking toggle button, URL and likes are seen', () => {
    const user = { username:'testUser'}
    const setBlog = vi.fn()
    const mockHandler = vi.

  })
*/
})


describe('<Togglable', () => {
  let container
  const blog = {
    title:'First Title',
    author:'some author',
    url:'/localhost',
    likes:3363,
    user:{ username:'testUser' }
  }

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel={['view', 'hide']}>
        <div data-testid='toggle'>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p>{blog.user.username}</p>
        </div>
      </Togglable>
    ).container
  })

  test('children are not rendered initially', () => {
    const divChildren = screen.getByTestId('toggle').parentElement
    expect(divChildren).toHaveStyle('display: none')
  })

  test('when toggle button is pressed, URL and likes are seen', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const divChildren = screen.getByTestId('toggle')
    expect(divChildren).toHaveTextContent('/localhost')
    expect(divChildren).toHaveTextContent('3363')
    expect(divChildren).not.toHaveStyle('display: none')
  })
})
