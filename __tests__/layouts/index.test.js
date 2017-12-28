import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import TemplateWrapper from '../../src/layouts'
import Helmet from 'react-helmet'
import Header from '../../src/components/header'

const siteTitle = 'Learn Improv Online'
const siteDescription = 'Free improv warm-ups and exercises with high-quality written descriptions, animated instructionals, and video examples. Start learning now!'
const siteKeywords = 'improv, learn improv, learn improv online'

const layout = shallow(
  <TemplateWrapper>
    {() => { return (<div>Children</div>) }}
  </TemplateWrapper>
);
const helmet = layout.find(Helmet);

test('Layout contains a Helmet with the site title', () => {
  const helmetTitleText = helmet.prop('title');

  expect(helmetTitleText).toBe(siteTitle);
});

test('Layout contains a Helmet with the correct meta data', () => {
  const helmetMeta = helmet.prop('meta');
  const helmetDescription = helmetMeta.find(x => x.name === 'description');
  const helmetDescriptionText = helmetDescription.content;
  const helmetKeywords = helmetMeta.find(x => x.name === 'keywords');
  const helmetKeywordsText = helmetKeywords.content;

  expect(helmetDescriptionText).toBe(siteDescription);
  expect(helmetKeywordsText).toBe(siteKeywords);
});

test('Layout contains a Header with the site title', () => {
  const header = layout.find(Header);
  const headerText = header.children().text();

  expect(headerText).toBe(siteTitle);
});

test('Layout renders correctly', () => {
  let tree = toJson(layout);
  expect(tree).toMatchSnapshot();
});