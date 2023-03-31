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
import Splash from '../../client/src/components/login/Splash.jsx';
import ArtistProfile from '../../client/src/components/ArtistProfile.jsx';

let renderComponent = async () => {
  return render(<GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>);
}

const state = {
  artistData: {
    id: "123",
    name: "Mindi Test",
    email: "mindi@test.com",
    bio: "bio",
    path_to_pic: "URLpath",
    songCount: 10,
    songs: [
      {
        created_at: "2023-03-25T02:11:35.367",
        fav_count: 1000005,
        id: "555",
        path_to_artwork: "URLpath",
        path_to_song: "URLpath",
        play_count: 10,
        tags: [],
        title: "Test Song",
        user_id: "123",
        username: "mintest"
      }
    ],
    username: "mintest",
    tier1: true,
    tier2: false,
    tier3: false
  },
  changeView: () => console.log('function'),
  loggedIn: true,
  profileData: {
    id: "123",
    name: "Mindi Test",
    email: "mindi@test.com",
    bio: "bio",
    path_to_pic: "URLpath",
    username: "mintest",
    tier1: true,
    tier2: false,
    tier3: false
  },
  handleSetArtistSongData: () => console.log('function')
};

describe('Splash page comes first!', () => {
  it('Should display the video first and foremost', async () => {
    const { getByTestId } = render(<Splash />);
    const video = await screen.getByTestId('splash');

    expect(video).toBeInTheDocument();
  })
})

describe('Login test', () => {
  it('Google Oauth button should be present in the drawer', async () => {
    const { getByTestId } = renderComponent();
    const drawer = await screen.getByTestId('drawer');

    await fireEvent.click(drawer);

    const oauth = await screen.getByTestId('google-oauth');
    expect(oauth).toBeInTheDocument();
  });

  it('When logged in, Edit Profile & verification request should appear on the Artist Profile', async () => {
    await render(<ArtistProfile changeView={state.changeView} artistData={state.artistData} profileData={state.profileData} handleSetArtistSongData={state.handleSetArtistSongData} loggedIn={state.loggedIn} />);
    const edit = await screen.getByText('Edit Profile');
    const verify = await screen.getByText('Request Verification');

    expect(edit && verify).toBeInTheDocument();
  });

  it('When logged in, the user\s details should appear on the Artist Profile', async () => {
    await render(<ArtistProfile changeView={state.changeView} artistData={state.artistData} profileData={state.profileData} handleSetArtistSongData={state.handleSetArtistSongData} loggedIn={state.loggedIn} />);
    const name = await screen.getByText('Mindi Test');
    const username = await screen.getByText('mintest');
    const songCount = await screen.getByText('10');

    const song = await screen.getByText('Test Song');
    const playCount = await screen.getByText('1000005');

    expect(name && username && songCount).toBeInTheDocument();
    expect(song && playCount).toBeInTheDocument();
  });
});

describe('Create new user form', () => {
  it('All fields should be present in the form', async () => {
    render(<NewAccount profileData={ {picture: "imageString"} } />);
    const newAccount = await screen.getByText('Are you ready to set up your new account? Let\'s do it!');
    const profilePic = await screen.getByRole('img');
    const change = await screen.getByText('Update');
    const username = await screen.getByText('Username:');
    const userField = await screen.getByTestId('username');
    const bio = await screen.getByText('Bio:');
    const bioField = await screen.getByPlaceholderText('Tell us about you...');

    expect(newAccount).toBeInTheDocument();
    expect(profilePic && change).toBeInTheDocument();
    expect(username && userField).toBeInTheDocument();
    expect(bio && bioField).toBeInTheDocument();
  });
});