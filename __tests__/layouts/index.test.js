/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import TemplateWrapper from '../../src/layouts'
import Header from '../../src/components/header'
import Footer from '../../src/components/footer'

const mockChildren = jest.fn()
mockChildren.mockReturnValue(<div>Children</div>)

const mockData = {
  site: {
    siteMetadata: {
      title: 'Site Title',
      description: 'Site Description',
      keywords: 'one, two, three',
    },
  },
}

describe('Index Layout', () => {
  const LayoutDom = shallow(
    <TemplateWrapper data={mockData}>{mockChildren}</TemplateWrapper>,
  )

  test('has initial state', () => {
    const expectedState = {
      searchTerm: '',
    }

    expect(LayoutDom.instance().state).toEqual(expectedState)
  })

  describe('handleSearch', () => {
    test('sets search term on state', () => {
      const event = { target: { value: 'yes and' } }
      const expectedState = {
        searchTerm: 'yes and',
      }
      LayoutDom.instance().handleSearch(event)


      expect(LayoutDom.instance().state).toEqual(expectedState)
    })
  })

  describe('render', () => {
    const state = { searchTerm: 'yes and' }

    beforeAll(() => {
      LayoutDom.setState(state)
      mockChildren.mockClear()
      LayoutDom.instance().render()
    })

    test('renders children', () => {
      expect(mockChildren).toHaveBeenCalledTimes(1)
    })

    test('passes searchTerm to children', () => {
      const expected = {
        children: mockChildren,
        data: mockData,
        ...state,
      }
      expect(mockChildren).toHaveBeenCalledWith(expected)
    })
  })

  describe('Helmet', () => {
    const helmet = LayoutDom.find(Helmet)

    test('title is populated from site data', () => {
      const helmetTitleText = helmet.prop('title')
      const siteTitle = mockData.site.siteMetadata.title

      expect(helmetTitleText).toEqual(siteTitle)
    })

    describe('Meta', () => {
      const helmetMeta = helmet.prop('meta')

      test('description is populated from site data', () => {
        const helmetDescription = helmetMeta.find(x => x.name === 'description')
        const helmetDescriptionText = helmetDescription.content
        const siteDescription = mockData.site.siteMetadata.description

        expect(helmetDescriptionText).toEqual(siteDescription)
      })

      test('keywords is populated from site data', () => {
        const helmetKeywords = helmetMeta.find(x => x.name === 'keywords')
        const helmetKeywordsText = helmetKeywords.content
        const siteKeywords = mockData.site.siteMetadata.keywords

        expect(helmetKeywordsText).toEqual(siteKeywords)
      })
    })
  })

  describe('Header', () => {
    const header = LayoutDom.find(Header)

    test('has display text of site title', () => {
      const headerText = header.children().text()
      const siteTitle = mockData.site.siteMetadata.title

      expect(headerText).toEqual(siteTitle)
    })

    test('handleSearch prop set to handleSearch class function', () => {
      expect(header.props().handleSearch).toBe(LayoutDom.instance().handleSearch)
    })
  })

  describe('Footer', () => {
    const footer = LayoutDom.find(Footer)

    expect(footer).toHaveLength(1)
  })
})
