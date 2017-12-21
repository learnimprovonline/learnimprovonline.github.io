import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../src/components/header.js'
import Link from 'gatsby-link'
import toJson from 'enzyme-to-json'

const siteName = 'Learn Improv Online';
const header = shallow(
  <Header>{siteName}</Header>
);
const link = header.find(Link);

test('Header link goes to the main page', () => {
  const rootDestination = "/";
  const linkDestination = link.prop('to');

  expect(linkDestination).toBe(rootDestination);
});

test('Header title displays the site name', () => {  
  const title = link.children().text();

  expect(title).toBe(siteName);
});

test('Header renders correctly', () => {
  let tree = toJson(header);
  expect(tree).toMatchSnapshot();
});
