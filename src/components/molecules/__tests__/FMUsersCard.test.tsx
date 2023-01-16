import React from 'react';
import FMUsersCard from '../FMUsersCard';
import { render } from '../../../__mocks__/utils/wrapper';

describe('FMUsersCard screen', () => {
  it('Render FMUsersCard correctly', () => {
    const mockedFn = jest.fn();
    const screen = render(
      <FMUsersCard
        desc="testing"
        image="https://dummyjson.com/image/i/products/1/thumbnail.jpg"
        name="Apple"
        key={1}
        onPress={mockedFn}
      />,
    );
    expect(screen).toBeTruthy();
  });
});
