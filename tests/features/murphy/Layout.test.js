import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/murphy';

describe('murphy/Layout', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(<Layout />);

    expect(renderedComponent.find('.murphy-layout').length).toBe(1);
  });
});
