import React from 'react';
import { render, getByTestId } from '@testing-library/react';

import Home from './index';

describe('Pages - Home', () => {
  beforeAll(() => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation(success => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }))),
    };

    global.navigator.geolocation = mockGeolocation;
  });

  it('should be able to render properly', () => {
    const { container } = render(<Home />);


    expect(container).toBeDefined();
  });

  it('should get the user location', () => {
    const { container } = render(<Home />);

    const latitudeInput = container.querySelector<HTMLInputElement>('#latitude');

    expect(latitudeInput?.value?.length).toBeGreaterThan(0);
  });
});
