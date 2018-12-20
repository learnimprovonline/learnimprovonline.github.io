/* eslint-env jest */
import React from 'react';
import Link from 'gatsby-link';
import { Index } from 'elasticlunr';
import { shallow } from 'enzyme';
import SearchPage from '../../src/pages/search';

const mockSearchResults = [
  { ref: { title: 'mock one', slug: 'slug one' } },
  { ref: { title: 'mock two', slug: 'slug two' } },
  { ref: { title: 'mock three', slug: 'slug three' } },
];

const mockData = {
  siteSearchIndex: {
    index: {
      documentStore: {},
      fields: [],
      index: {},
      pipeline: [],
    },
  },
};

const elasticlunrSpy = jest.spyOn(Index, 'load');

const indexSearchMock = jest.fn().mockReturnValue(mockSearchResults);
const indexGetDocMock = jest.fn().mockReturnValue({ title: '' });

const SearchPageDom = shallow(<SearchPage data={mockData} searchTerm="yes and" />);
SearchPageDom.instance().index.search = indexSearchMock;
SearchPageDom.instance().index.documentStore.getDoc = indexGetDocMock;

describe('Search Page', () => {
  test('has initial state', () => {
    const state = SearchPageDom.state();
    const expectedInitialState = {
      results: [],
      searchTerm: 'yes and',
    };
    expect(state).toEqual(expectedInitialState);
  });

  test('has index created from props data', () => {
    const searchIndex = SearchPageDom.instance().index;
    expect(searchIndex).toBeDefined();
    expect(elasticlunrSpy).toHaveBeenCalledWith(mockData.siteSearchIndex.index);
  });

  test('calls the search with search term from props on mount', () => {
    const SearchPageMock = shallow(<SearchPage data={mockData} searchTerm="yes and" />);
    const searchMock = jest.fn();
    SearchPageMock.instance().search = searchMock;
    SearchPageMock.instance().componentWillMount();
    const expectedEvent = { target: { value: 'yes and' } };

    expect(searchMock).toHaveBeenCalledWith(expectedEvent);
  });

  describe('Input Field', () => {
    const searchField = SearchPageDom.find('input');

    test('is type text', () => {
      expect(searchField.props().type).toBe('text');
    });

    test('has onChange set to search', () => {
      expect(searchField.props().onChange).toEqual(SearchPageDom.instance().search);
    });
  });

  describe('Results', () => {
    describe('Heading', () => {
      beforeAll(() => {
        SearchPageDom.setState({ results: ['thing1', 'thing2', 'thing3'] });
      });

      test('has display text of "Results"', () => {
        const searchResultsHeading = SearchPageDom.find('h2');
        const searchResultsHeadingText = searchResultsHeading.text();

        expect(searchResultsHeadingText).toBe('Results');
      });
    });

    describe('Results List', () => {
      let resultsList;
      const state = {
        results: [
          { title: 'thing1', type: 'Warmup' },
          { title: 'thing2', type: 'Exercise' },
          { title: 'thing3', type: 'Cooldown' },
        ],
      };

      describe('when there are search results', () => {
        beforeAll(() => {
          SearchPageDom.setState(state);
          resultsList = SearchPageDom.find('ol');
        });

        test('does exist', () => {
          expect(resultsList.exists()).toBe(true);
        });

        describe('List Items', () => {
          let listItems;
          beforeAll(() => {
            listItems = resultsList.find('li');
          });

          test('has one for each result', () => {
            expect(listItems).toHaveLength(state.results.length);
          });

          // TODO: Break this test up
          test('has link to page slug and display text of page title', () => {
            for (let index = 0; index < state.results.length; index += 1) {
              const listItem = listItems.at(index);
              const listLink = listItem.find(Link);

              expect(listLink).toHaveLength(1);

              const linkText = listLink.children().text();
              const pageTitle = state.results[index].title;
              expect(linkText).toEqual(pageTitle);

              const linkDestination = listLink.props().to;
              const pageSlug = state.results[index].slug;
              expect(linkDestination).toEqual(pageSlug);
            }
          });

          test('has badge with display text of activity type', () => {
            for (let index = 0; index < state.results.length; index += 1) {
              const listItem = listItems.at(index);
              const badge = listItem.find('span');

              expect(badge).toHaveLength(1);

              const badgeText = badge.text();
              const activityType = state.results[index].type;
              expect(badgeText).toEqual(activityType);
            }
          });
        });

        afterAll(() => {
          SearchPageDom.setState({ results: [] });
        });
      });

      describe('when there are no search results', () => {
        test('does not exist', () => {
          SearchPageDom.setState({ results: [] });
          resultsList = SearchPageDom.find('ol');
          expect(resultsList.exists()).toBe(false);
        });
      });
    });
  });

  describe('Search', () => {
    beforeEach(() => {
      SearchPageDom.setState({ results: [] });
      indexGetDocMock.mockReturnValueOnce(mockSearchResults[0].ref);
      indexGetDocMock.mockReturnValueOnce(mockSearchResults[1].ref);
      indexGetDocMock.mockReturnValueOnce(mockSearchResults[2].ref);
      const event = { target: { value: 'fake event value' } };
      SearchPageDom.instance().search(event);
    });

    afterEach(() => {
      indexSearchMock.mockClear();
      indexGetDocMock.mockClear();
    });

    test('exists', () => {
      expect(SearchPageDom.instance().search).toBeDefined();
    });

    test('calls the elasticlunr search', () => {
      expect(indexSearchMock).toHaveBeenCalledWith('fake event value');
    });

    test('maps results to documents', () => {
      expect(indexGetDocMock).toHaveBeenCalledTimes(mockSearchResults.length);
    });

    test('sets state to the page results', () => {
      const pageResults = [
        { title: 'mock one', slug: 'slug one' },
        { title: 'mock two', slug: 'slug two' },
        { title: 'mock three', slug: 'slug three' },
      ];

      expect(SearchPageDom.instance().state.results).toEqual(pageResults);
    });
  });
});
