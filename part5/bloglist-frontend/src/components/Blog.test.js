import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const defaultCurrentUser = {
  username: 'TESTUSERNAME',
  name: 'NAME NAME',
}
const defaultBlog = {
  title: 'blooooogtitlte',
  author: 'I AM AUTHOR',
  likes: '20',
  url: 'someurl/on-some-adress',
  user: defaultCurrentUser,
}

test('renders title and author', () => {
  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent(defaultBlog.title)
  expect(component.container).toHaveTextContent(defaultBlog.author)
})

test('does not render likes or url by default', () => {
  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} />
  )
  expect(
    component.container.querySelector('.togglableHiddenContent')
  ).toHaveStyle('display: none')
})

test('shows like and url after clicking', () => {
  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} />
  )

  const button = component.getByText('details')
  fireEvent.click(button)

  expect(
    component.container.querySelector('.togglableHiddenContent')
  ).not.toHaveStyle('display: none')
})

test('clicking the like button twice calls event handler twice', () => {
  const mockLikeHandler = jest.fn()

  const component = render(
    <Blog
      blog={defaultBlog}
      currentUser={defaultCurrentUser}
      handleLikeFunc={mockLikeHandler}
    />
  )

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
  //component.debug()
})

test('blog form correctly calls received function with it`s inputs', () => {
  const mockCreateHandler = jest.fn()

  const component = render(<BlogForm createBlog={mockCreateHandler} />)

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const ulrInput = component.container.querySelector('#url')

  fireEvent.change(authorInput, {
    target: { value: 'testAUTHOR' },
  })
  fireEvent.change(titleInput, {
    target: { value: 'testTITLE' },
  })
  fireEvent.change(ulrInput, {
    target: { value: 'testURL' },
  })

  const button = component.getByText('save')
  fireEvent.click(button)

  expect(mockCreateHandler.mock.calls).toHaveLength(1)
  expect(mockCreateHandler.mock.calls[0][0].title).toBe('testTITLE')
  expect(mockCreateHandler.mock.calls[0][0].author).toBe('testAUTHOR')
  expect(mockCreateHandler.mock.calls[0][0].url).toBe('testURL')
  //component.debug()
})
