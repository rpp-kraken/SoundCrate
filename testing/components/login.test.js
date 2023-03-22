/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { queries } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from '../../client/src/components/App.jsx';
import NewAccount from '../../client/src/components/login/NewAccount.jsx';

let renderComponent = async () => {
  return render(<GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>);
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

describe('Create new user form', () => {
  it('All fields should be present in the form', async () => {
    render(<NewAccount profileData={ {picture: "imageString"} } />);
    const newAccount = await screen.getByText('Let\'s set up your new account!');
    const profilePic = await screen.getByRole('img');
    const change = await screen.getByText('Change');
    const username = await screen.getByText('Username:');
    const userField = await screen.getByTestId('username');
    const bio = await screen.getByText('Bio:');
    const bioField = await screen.getByPlaceholderText('Tell us about you...');

    expect(newAccount).toBeInTheDocument();
    expect(profilePic && change).toBeInTheDocument();
    expect(username && userField).toBeInTheDocument();
    expect(bio && bioField).toBeInTheDocument();
  });
})