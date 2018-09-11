/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import TemplateWrapper from '../../src/layouts'
import Header from '../../src/components/header'

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

const LayoutDom = shallow(
  <TemplateWrapper data={mockData}>{mockChildren}</TemplateWrapper>,
)
const helmet = LayoutDom.find(Helmet)

describe('Index Layout', () => {
  describe('Helmet', () => {
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
    test('Layout contains a Header with the site title', () => {
      const header = LayoutDom.find(Header)
      const headerText = header.children().text()
      const siteTitle = mockData.site.siteMetadata.title

      expect(headerText).toEqual(siteTitle)
    })
  })

  test('renders children', () => {
    expect(mockChildren.mock.calls.length).toEqual(1)
  })
})
