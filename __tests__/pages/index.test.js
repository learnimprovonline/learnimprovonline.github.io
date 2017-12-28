import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import IndexPage from '../../src/pages/index.js'
import Link from 'gatsby-link'

const activitiesPageDestination = '/activities/'
const pageTitle = 'Early Access Alpha'

const indexPage = shallow(
    <IndexPage />
);

const activitiesLink = indexPage.find(Link);

test('Index Page contains a page heading with the page title', () => {
    const pageHeading = indexPage.find('h1');
    const pageHeadingText = pageHeading.children().text();

    expect(pageHeadingText).toBe(pageTitle);
});

test('Index Page contains a link to the Activities Page', () => {
    const activitiesLinkDestination = activitiesLink.prop('to');

    expect(activitiesLinkDestination).toBe(activitiesPageDestination);
});

test('Index Page contains a "Go to Activities" link', () => {
    const activitiesLinkText = activitiesLink.children().text();

    expect(activitiesLinkText).toBe('Go to Activities');
});

test('Index Page renders correctly', () => {
    let tree = toJson(indexPage);
    expect(tree).toMatchSnapshot();
});