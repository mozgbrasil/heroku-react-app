import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../../../src/features/murphy/SidePanel';

describe('murphy/SidePanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      murphy: {},
      actions: {},
    };
    const renderedComponent = shallow(<SidePanel {...props} />);

    expect(renderedComponent.find('.murphy-side-panel').length).toBe(1);
  });
});
