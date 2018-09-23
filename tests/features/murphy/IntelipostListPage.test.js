import React from 'react';
import { shallow } from 'enzyme';
import { IntelipostListPage } from '../../../src/features/murphy/IntelipostListPage';

describe('murphy/IntelipostListPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      murphy: { intelipostList: [] },
      actions: {},
    };
    const renderedComponent = shallow(<IntelipostListPage {...props} />);

    expect(renderedComponent.find('.murphy-intelipost-list-page').length).toBe(1);
    expect(renderedComponent.find('.no-items-tip').length).toBe(1);
  });
  it("renders list items when there's data", () => {
    const props = {
      murphy: { intelipostList: [{ data: { id: 'id', title: 'title', url: 'url' } }] },
      actions: {},
    };
    const renderedComponent = shallow(<IntelipostListPage {...props} />);

    expect(renderedComponent.find('.murphy-intelipost-list-page').length).toBe(1);
  });

  it('should disable fetch button when fetching intelipost', () => {
    const pageProps = {
      murphy: {
        intelipostList: [],
        fetchIntelipostListPending: true,
      },
      actions: {},
    };
    const renderedComponent = shallow(<IntelipostListPage {...pageProps} />);

    expect(renderedComponent.find('.btn-fetch-intelipost[disabled]').length).toBe(1);
  });

  it('should show error if fetch failed', () => {
    const pageProps = {
      murphy: {
        intelipostList: [],
        fetchIntelipostListError: new Error('server error'),
      },
      actions: {},
    };
    const renderedComponent = shallow(<IntelipostListPage {...pageProps} />);

    expect(renderedComponent.find('.fetch-list-error').length).toBe(1);
  });
});
