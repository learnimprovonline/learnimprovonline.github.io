import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import ActivitiesPage from '../../src/pages/activities'

const ActivitiesPageDom = shallow(
  <ActivitiesPage />
)

describe('Activities Page', () => {

  describe('Page Heading', () => {
    test('display text is "Activites"', () => {
      const pageTitle = 'Activities'
      const pageHeading = ActivitiesPageDom.find('h1')
      const pageHeadingText = pageHeading.children().text()

      expect(pageHeadingText).toEqual(pageTitle)
    })
  })

  describe('Index Link', () => {
    const indexLink = ActivitiesPageDom.find(Link)

    test('display text is "Go to Home" link', () => {
      const indexLinkText = indexLink.children().text()

      expect(indexLinkText).toEqual('Go to Home')
    })

    test('points to the Index Page', () => {
      const indexPageDestination = '/'
      const indexLinkDestination = indexLink.prop('to')

      expect(indexLinkDestination).toEqual(indexPageDestination)
    })
  })

  test('renders itself', () => {
    const tree = toJson(ActivitiesPageDom)

    expect(tree).toMatchSnapshot()
  })
})





