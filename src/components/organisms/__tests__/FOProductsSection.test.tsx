import React from 'react';
import * as hooks from '../../../services/products';
import FOProductsSection from '../FOProductsSection';
import { render } from '../../../__mocks__/utils/wrapper';
import { products } from '../../../__mocks__/testData';

describe('FOProductsSection screen', () => {
  it('shows loading test', async () => {
    jest.spyOn(hooks, 'useGetProductQuery').mockReturnValue({
      isFetching: true,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { getByText } = render(<FOProductsSection query={'Apple'} />);
    expect(getByText('Loading')).toBeDefined();
  });

  it('can shows 4 data correctly', async () => {
    jest.spyOn(hooks, 'useGetProductQuery').mockReturnValue({
      data: products,
      isError: false,
      isLoading: false,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { findAllByTestId } = render(<FOProductsSection query={'Apple'} />);
    expect((await findAllByTestId('FMProductsCard')).length).toBe(4);
  });

  it('shows No Data', async () => {
    jest.spyOn(hooks, 'useGetProductQuery').mockReturnValue({
      data: { products: [] },
      isError: false,
      isLoading: false,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { findAllByText } = render(<FOProductsSection query={'Apple'} />);
    expect(await findAllByText('No data')).toBeDefined();
  });

  it('can show error message', async () => {
    jest.spyOn(hooks, 'useGetProductQuery').mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { getByText } = render(<FOProductsSection query={'Apple'} />);
    expect(getByText('There was an error')).toBeDefined();
  });
});
