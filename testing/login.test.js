/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { queries } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from '../client/src/components/App.jsx';

let renderComponent = () => {
  return render(<GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>)
}

describe('Login test', () => {
  it('Google Oauth button should be present in the drawer', async () => {

    const { getByTestId } = renderComponent();
    const drawer = await screen.getByTestId('drawer');

    await fireEvent.click(drawer);

    const oauth = await screen.getByTestId('google-oauth');
    expect(oauth).toBeInTheDocument();
  });
});