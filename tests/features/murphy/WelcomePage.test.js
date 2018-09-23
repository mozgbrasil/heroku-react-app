import React from 'react';
import { shallow } from 'enzyme';
import { WelcomePage } from '../../../src/features/murphy/WelcomePage';

describe('murphy/WelcomePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      murphy: {},
      actions: {},
    };
    const renderedComponent = shallow(<WelcomePage {...props} />);

    expect(renderedComponent.find('.murphy-welcome-page').length).toBe(1);
  });
});
