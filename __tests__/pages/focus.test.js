/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
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
  { virtual: true },
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
})
