import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ActivitiesPage from '../../src/pages/activities'
import Link from 'gatsby-link'

const pageTitle = 'Activities'
const indexPageDestination = '/'

const activitiesPage = shallow(
  <ActivitiesPage />
);

const indexLink = activitiesPage.find(Link);

test('Activites Page contains a page heading with the page title', () => {
  const pageHeading = activitiesPage.find('h1');
  const pageHeadingText = pageHeading.children().text();

  expect(pageHeadingText).toBe(pageTitle);
});

test('Activites Page contains a link to the Index Page', () => {
  const indexLinkDestination = indexLink.prop('to');

  expect(indexLinkDestination).toBe(indexPageDestination);
});

test('Activites Page contains a "Go to Activities" link', () => {
  const indexLinkText = indexLink.children().text();

  expect(indexLinkText).toBe('Go back to the homepage');
});

test('Activites Page renders correctly', () => {
  const tree = toJson(activitiesPage);
  
  expect(tree).toMatchSnapshot();
});