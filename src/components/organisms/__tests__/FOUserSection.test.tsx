import 'react-native';
import React from 'react';
import * as hooks from '../../../services/user';
import FOUserSection from '../FOUserSection';
import { act, render } from '../../../__mocks__/utils/wrapper';
import { users } from '../../../__mocks__/testData';

describe('FOUserSection screen', () => {
  it('shows loading test', async () => {
    jest.spyOn(hooks, 'useGetUserListQuery').mockReturnValue({
      isFetching: true,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { getByText } = render(<FOUserSection />);
    await act(async () => {
      expect(getByText('Loading')).toBeDefined();
    });
  });

  it('can shows 3 data correctly', async () => {
    jest.spyOn(hooks, 'useGetUserListQuery').mockReturnValue({
      data: users,
      isError: false,
      isLoading: false,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { findAllByTestId } = render(<FOUserSection />);
    expect((await findAllByTestId('FMUsersCard')).length).toBe(3);
  });

  it('can show error message', async () => {
    jest.spyOn(hooks, 'useGetUserListQuery').mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
    const { getByText } = render(<FOUserSection />);
    await act(async () => {
      expect(getByText('There was an error')).toBeDefined();
    });
  });
});
