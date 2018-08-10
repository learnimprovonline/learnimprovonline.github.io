import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import FocusPage from '../../src/pages/focus'

jest.mock(
  '../../src/data/focus/foci.json',
  () => [
    {
      name: 'One',
      description: 'A',
    },
    {
      name: 'Two',
      description: 'B',
    },
    {
      name: 'Three',
      description: 'C',
    },
  ],
  { virtual: true }
)
const mockFoci = require('../../src/data/focus/foci.json')

const FocusPageDom = shallow(<FocusPage />)

describe('Focus Page', () => {
  describe('Page Heading', () => {
    test('display text is Activity Focus', () => {
      const pageTitle = 'Activity Focus'
      const pageHeading = FocusPageDom.find('h1')
      const pageHeadingText = pageHeading.children().text()

      expect(pageHeadingText).toEqual(pageTitle)
    })
  })

  describe('Activity Page Link', () => {
    const activitiesLink = FocusPageDom.find(Link).at(0)

    test('display text is "Activities"', () => {
      const activityLinkText = activitiesLink.children().text()

      expect(activityLinkText).toEqual('Activities')
    })

    test('points to the Activity Page', () => {
      const activityPagePath = '/activities/'
      const activityLinkDestination = activitiesLink.prop('to')

      expect(activityLinkDestination).toEqual(activityPagePath)
    })
  })

  describe('Focus List', () => {
    const focusList = FocusPageDom.find('dl')

    test('description list exists', () => {
      expect(focusList.exists()).toBe(true)
    })

    test('has a term element for each focus', () => {
      const terms = focusList.find('dt')

      mockFoci.forEach((mockFocus, index) => {
        const term = terms.at(index).text()

        expect(term).toEqual(mockFocus.name)
      })
    })

    test('has a definition element for each focus', () => {
      const definitions = focusList.find('dd')

      mockFoci.forEach((mockFocus, index) => {
        const definition = definitions.at(index).text()

        expect(definition).toEqual(mockFocus.description)
      })
    })
  })

  test('renders itself as expected', () => {
    const tree = toJson(FocusPageDom)

    expect(tree).toMatchSnapshot()
  })
})
