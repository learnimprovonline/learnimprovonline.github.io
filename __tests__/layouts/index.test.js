import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
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
      keywords: 'one, two, three'
    }
  }
}

const LayoutDom = shallow(
  <TemplateWrapper data={mockData}>
    {mockChildren}
  </TemplateWrapper>
)
const helmet = LayoutDom.find(Helmet)

test('Layout contains a Helmet with the site title', () => {
  const helmetTitleText = helmet.prop('title')
  const siteTitle = mockData.site.siteMetadata.title

  expect(helmetTitleText).toEqual(siteTitle)
})

test('Layout contains a Helmet with the correct meta data', () => {
  const helmetMeta = helmet.prop('meta')
  const helmetDescription = helmetMeta.find(x => x.name === 'description')
  const helmetDescriptionText = helmetDescription.content
  const helmetKeywords = helmetMeta.find(x => x.name === 'keywords')
  const helmetKeywordsText = helmetKeywords.content
  const siteDescription = mockData.site.siteMetadata.description
  const siteKeywords = mockData.site.siteMetadata.keywords

  expect(helmetDescriptionText).toEqual(siteDescription)
  expect(helmetKeywordsText).toEqual(siteKeywords)
})

test('Layout contains a Header with the site title', () => {
  const header = LayoutDom.find(Header)
  const headerText = header.children().text()
  const siteTitle = mockData.site.siteMetadata.title

  expect(headerText).toEqual(siteTitle)
})

test('Layout renders children', () => {
  expect(mockChildren.mock.calls.length).toEqual(1);
})

test('Layout renders correctly', () => {
  const tree = toJson(LayoutDom)

  expect(tree).toMatchSnapshot()
})