import { render } from '@redwoodjs/testing/web'

import PhotoPage from './PhotoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PhotoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PhotoPage />)
    }).not.toThrow()
  })
})
