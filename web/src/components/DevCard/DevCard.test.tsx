import React from 'react';
import { render } from '@testing-library/react';

import DevCard from './index';

describe('Components - DevCard', () => {
  it('should be able to render properly', () => {
    const { container } = render(<DevCard />);


    expect(container).toBeDefined();
  });
});
