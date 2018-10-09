/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import IndexPage from '../../src/pages/index'

const mockData = {
  allDataJson: {
    edges: [
      {
        node: {
          features: [
            {
              title: 'Basic configuration and folder structure',
            },
          ],
          howTo: [
            {
              title: 'Prepare a coffee',
            },
          ],
        },
      },
    ],
  },
}

const IndexPageDom = shallow(<IndexPage data={mockData} />)

describe('Index Page', () => {
  describe('Page Heading', () => {
    test('display text is "Early Access Alpha"', () => {
      const pageTitle = 'Early Access Alpha'
      const pageHeading = IndexPageDom.find('h1')
      const pageHeadingText = pageHeading.children().text()

      expect(pageHeadingText).toEqual(pageTitle)
    })
  })
})
