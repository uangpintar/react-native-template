import { AllTheProviders } from '../../__mocks__/utils/wrapper';
import { renderHook } from '@testing-library/react-hooks/native';
import { useGetUserListQuery } from '../user';
import { users } from '../../__mocks__/testData';

const updateTimeout = 5000;

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('FOProductsSection screen', () => {
  it('handles good response', async () => {
    fetchMock.mockResponse(JSON.stringify({ data: users }));
    const { result, waitForNextUpdate } = renderHook(() => useGetUserListQuery(undefined), {
      wrapper: AllTheProviders,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);
    await waitForNextUpdate({ timeout: updateTimeout });

    const nextResponse = result.current;
    expect(nextResponse.data).toBeDefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isSuccess).toBe(true);
  });

  it('handles error response', async () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    const { result, waitForNextUpdate } = renderHook(() => useGetUserListQuery(undefined), {
      wrapper: AllTheProviders,
    });
    const initialResponse = result.current;
    expect(initialResponse.data).toBeUndefined();
    expect(initialResponse.isLoading).toBe(true);

    await waitForNextUpdate({ timeout: updateTimeout });

    const nextResponse = result.current;
    expect(nextResponse.data).toBeUndefined();
    expect(nextResponse.isLoading).toBe(false);
    expect(nextResponse.isError).toBe(true);
  });
});
