/* eslint-env jest */
import React from 'react';
import Link from 'gatsby-link';
import { Index } from 'elasticlunr';
import { shallow } from 'enzyme';

import SearchPage, { SearchResult, SearchResultsList } from '../../src/pages/search';

const mockSearchResults = [
  { ref: { title: 'mock one', slug: 'slug one', focus: ['s1'] } },
  { ref: { title: 'mock two', slug: 'slug two', focus: ['s2'] } },
  { ref: { title: 'mock three', slug: 'slug three', focus: ['s3'] } },
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

describe('SearchResult', () => {
  const page = { slug: 'my slug', title: 'my title', type: 'my type', focus: ['a', 'b', 'c'] };
  const activity = {
    title: page.title,
    type: page.type,
    focus: page.focus,
  };
  const searchResult = shallow(<SearchResult slug={page.slug} activity={activity} />);

  describe('Link', () => {
    const link = searchResult.find(Link);

    test('exists', () => {
      expect(link).toHaveLength(1);
    });

    test('has "to" equal to props.slug', () => {
      const to = link.props().to;

      expect(to).toBe(page.slug);
    });

    test('has display text of props.title', () => {
      const displayText = link.children().text();

      expect(displayText).toBe(page.title);
    });
  });

  describe('Badge', () => {
    const badge = searchResult.find('span.badge');

    test('exists', () => {
      expect(badge).toHaveLength(1);
    });

    test('has "badge-info" class', () => {
      expect(badge.hasClass('badge-info')).toBe(true);
    });

    test('has display text equal to props.type', () => {
      const displayText = badge.children().text();

      expect(displayText).toBe(page.type);
    });
  });

  test('has display text equal to props.focus', () => {
    const displayText = searchResult.childAt(3).text();
    const focus = page.focus.join(', ');
    const expectedDisplayText = ` ${focus}`;

    expect(displayText).toEqual(expectedDisplayText);
  });
});

describe('SearchResultsList', () => {
  const results = [
    { title: 'a', slug: 's1', type: 't1', focus: ['a1', 'a2', 'a3'] },
    { title: 'b', slug: 's2', type: 't2', focus: ['b1', 'b2', 'b3'] },
    { title: 'c', slug: 's3', type: 't3', focus: ['c1', 'c2', 'c3'] },
  ];
  const searchResultsList = shallow(<SearchResultsList results={results} />);

  test('should be an ordered list', () => {
    expect(searchResultsList.type()).toBe('ol');
  });

  describe('List Items', () => {
    const listItems = searchResultsList.find('li');

    test('total number equal to number of results', () => {
      const resultCount = results.length;

      expect(listItems).toHaveLength(resultCount);
    });

    test('"key" equal to the page title', () => {
      listItems.forEach((listItem, index) => {
        const key = listItem.key();
        const pageTitle = results[index].title;

        expect(key).toBe(pageTitle);
      });
    });

    describe('SearchResult', () => {
      const searchResult = listItems.at(0).find(SearchResult);

      test('exists', () => {
        expect(searchResult).toHaveLength(1);
      });

      test("'slug' equal to props.results.slug", () => {
        const slug = searchResult.props().slug;
        const expectedSlug = results[0].slug;

        expect(slug).toEqual(expectedSlug);
      });

      test('activity', () => {
        const activity = searchResult.props().activity;
        const expectedActivity = {
          title: results[0].title,
          type: results[0].type,
          focus: results[0].focus,
        };

        expect(activity).toEqual(expectedActivity);
      });
    });
  });
});

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

    describe('SearchResultsList', () => {
      let resultsList;
      const state = {
        results: [
          { title: 'thing1', type: 'Warmup', focus: ['a', 'b', 'c'] },
          { title: 'thing2', type: 'Exercise', focus: ['d', 'e', 'f'] },
          { title: 'thing3', type: 'Cooldown', focus: ['g'] },
        ],
      };

      describe('when there are search results', () => {
        beforeAll(() => {
          SearchPageDom.setState(state);
          resultsList = SearchPageDom.find(SearchResultsList);
        });

        test('does exist', () => {
          expect(resultsList).toHaveLength(1);
        });

        test('"results" equal to state.results', () => {
          const results = resultsList.props().results;

          expect(results).toEqual(state.results);
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
      const pageResults = mockSearchResults.map(searchResult => searchResult.ref);

      expect(SearchPageDom.instance().state.results).toEqual(pageResults);
    });
  });
});
