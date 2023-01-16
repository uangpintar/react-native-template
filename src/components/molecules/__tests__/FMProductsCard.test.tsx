import React from 'react';
import FMProductsCard from '../FMProductsCard';
import { render } from '../../../__mocks__/utils/wrapper';

describe('FMProductsCard screen', () => {
  it('Render FMProductsCard correctly', () => {
    const mockedFn = jest.fn();
    const screen = render(
      <FMProductsCard
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
