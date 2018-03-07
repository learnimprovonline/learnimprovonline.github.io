import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import TemplateWrapper from '../../src/layouts'
import Helmet from 'react-helmet'
import Header from '../../src/components/header'

const site = {
  siteMetadata: {
    title: 'Learn Improv Online',
    description: 'Free improv warm-ups and exercises with high-quality written descriptions, animated instructionals, and video examples. Start learning now!',
    keywords: 'improv, learn improv, learn improv online'
  }
}

const mockChildren = jest.fn()
mockChildren.mockReturnValue(<div>Children</div>)

const layout = shallow(
  <TemplateWrapper>
    {mockChildren}
  </TemplateWrapper>
);
const helmet = layout.find(Helmet);

test('Layout contains a Helmet with the site title', () => {
  const helmetTitleText = helmet.prop('title');

  expect(helmetTitleText).toEqual(site.siteMetadata.title);
});

test('Layout contains a Helmet with the correct meta data', () => {
  const helmetMeta = helmet.prop('meta');
  const helmetDescription = helmetMeta.find(x => x.name === 'description');
  const helmetDescriptionText = helmetDescription.content;
  const helmetKeywords = helmetMeta.find(x => x.name === 'keywords');
  const helmetKeywordsText = helmetKeywords.content;

  expect(helmetDescriptionText).toEqual(site.siteMetadata.description);
  expect(helmetKeywordsText).toEqual(site.siteMetadata.keywords);
});

test('Layout contains a Header with the site title', () => {
  const header = layout.find(Header);
  const headerText = header.children().text();

  expect(headerText).toEqual(site.siteMetadata.title);
});

test('Layout renders children', () => {
  expect(mockChildren.mock.calls.length).toEqual(1);
})

test('Layout renders correctly', () => {
  let tree = toJson(layout);
  expect(tree).toMatchSnapshot();
});