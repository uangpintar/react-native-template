import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { render } from '../../__mocks__/utils/wrapper';
import SignUp from '../SignUp';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('SignUp screen', () => {
  const data = {
    name: 'Kholiq',
    phone: '0818181818',
    email: 'abdul@finetiks.com',
    password: 'test123',
    passwordConfirmation: 'test123',
  };
  it('should can input form', async () => {
    const rendered = render(<SignUp />);

    const inputName = rendered.getByTestId('input-name');
    expect(inputName).toBeTruthy();
    fireEvent.changeText(inputName, data.name);
    const inputPhone = rendered.getByTestId('input-phone');
    expect(inputPhone).toBeTruthy();
    fireEvent.changeText(inputPhone, data.phone);
    const inputEmail = rendered.getByTestId('input-email');
    expect(inputEmail).toBeTruthy();
    fireEvent.changeText(inputEmail, data.email);
    const inputPassword = rendered.getByTestId('input-password');
    expect(inputPassword).toBeTruthy();
    fireEvent.changeText(inputPassword, data.password);
    const inputPasswordConfirmation = rendered.getByTestId('input-password-confirmation');
    expect(inputPasswordConfirmation).toBeTruthy();
    fireEvent.changeText(inputPasswordConfirmation, data.passwordConfirmation);

    const btnSubmit = rendered.getByTestId('btn-submit');
    expect(btnSubmit).toBeTruthy();
    fireEvent.press(btnSubmit);
  });
});
