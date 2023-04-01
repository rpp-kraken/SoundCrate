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
  return await render(<GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>);
}

let renderLoggedIn = async () => {
  return await render(<GoogleOAuthProvider clientId="167666531989-d7dfo41ka45sqoc28pbjilvkr9892up3.apps.googleusercontent.com">
    <App loggedIn={true} />
  </GoogleOAuthProvider>);
}

const state = {
  artistData: {
    id: "83d0e8de-e1aa-44e3-a64e-9dfab69567b1",
    name: "Mindi Weik",
    email: "mindi@sierrainteractive.com",
    bio: "magical... maleable, magnificent, monumental... what else starts with \"m?\"",
    path_to_pic: "https://soundcrate.s3.us-east-2.amazonaws.com/ad02c50e-bd55-48af-b620-157058b57302.jpeg",
    favoritesCount: 2000006,
    songCount: 3,
    songs: [
      {
        created_at: "2023-03-25T02:11:35.367",
        fav_count: 2,
        id: "7242afa5-4ef1-4c9f-b0e5-4959d36a6673",
        path_to_artwork: "https://soundcrate.s3.us-east-2.amazonaws.com/d8e96612-bfd6-43a8-b48c-b570137a90c8.jpeg",
        path_to_song: "https://soundcrate.s3.us-east-2.amazonaws.com/5a63253a-3f0b-40c5-9446-d8904541829a.wav",
        play_count: 6,
        tags: [],
        title: "clap-collab",
        user_id: "83d0e8de-e1aa-44e3-a64e-9dfab69567b1",
        username: "mindini"
      }
    ],
    username: "mindini",
    tier1: true,
    tier2: false,
    tier3: false
  },
  changeView: () => console.log('function'),
  loggedIn: true,
  profileData: {
    id: "83d0e8de-e1aa-44e3-a64e-9dfab69567b1",
    name: "Mindi Weik",
    email: "mindi@sierrainteractive.com",
    bio: "magical... maleable, magnificent, monumental... what else starts with \"m?\"",
    path_to_pic: "https://soundcrate.s3.us-east-2.amazonaws.com/ad02c50e-bd55-48af-b620-157058b57302.jpeg",
    username: "mindini",
    tier1: true,
    tier2: false,
    tier3: false
  },
  handleSetArtistSongData: () => console.log('function')
};

describe('Splash page comes first!', () => {
  it('Should display the video first and foremost', async () => {
    const { getByTestId } = await render(<Splash />);
    const video = await screen.getByTestId('splash');

    await expect(video).toBeInTheDocument();
  })
})

describe('Login test', () => {
  it('Google Oauth button should be present in the drawer', async () => {
    const { getByTestId } = await renderComponent();
    const drawer = await screen.getByTestId('drawer');

    await fireEvent.click(drawer);

    const oauth = await screen.getByTestId('google-oauth');
    await expect(oauth).toBeInTheDocument();
  });

  it('When logged in, Edit Profile & verification request should appear on the Artist Profile', async () => {
    await render(<ArtistProfile changeView={state.changeView} artistData={state.artistData} profileData={state.profileData} handleSetArtistSongData={state.handleSetArtistSongData} loggedIn={state.loggedIn} />);
    const edit = await screen.getByText('Edit Profile');
    const verify = await screen.getByText('Request Verification');

    await expect(edit && verify).toBeInTheDocument();
  });

  it('When logged in, the user\s details should appear on the Artist Profile', async () => {
    await render(<ArtistProfile changeView={state.changeView} artistData={state.artistData} profileData={state.profileData} handleSetArtistSongData={state.handleSetArtistSongData} loggedIn={state.loggedIn} />);
    const name = await screen.getByText('Mindi Weik');
    const username = await screen.getByText('mindini');
    const songCount = await screen.getByText('3');

    const song = await screen.getByText('clap-collab');
    const playCount = await screen.getByText('2000006');

    await expect(name && username && songCount).toBeInTheDocument();
    await expect(song && playCount).toBeInTheDocument();
  });
});

describe('Create new user form', () => {
  it('All fields should be present in the form', async () => {
    await render(<NewAccount profileData={ {picture: "imageString"} } />);
    const newAccount = await screen.getByText('Are you ready to set up your new account? Let\'s do it!');
    const profilePic = await screen.getByRole('img');
    const change = await screen.getByText('Update');
    const username = await screen.getByText('Username:');
    const userField = await screen.getByTestId('username');
    const bio = await screen.getByText('Bio:');
    const bioField = await screen.getByPlaceholderText('Tell us about you...');

    await expect(newAccount).toBeInTheDocument();
    await expect(profilePic && change).toBeInTheDocument();
    await expect(username && userField).toBeInTheDocument();
    await expect(bio && bioField).toBeInTheDocument();
  });
});

describe('Logout test', () => {
  it('Should show logged in options in the drawer', async () => {
    const { getByTestId } = await renderLoggedIn();

    const drawer = await screen.getByTestId('drawer');
    await fireEvent.click(drawer);

    const myAccount = await screen.getByText('My Account');
    const myMusic = await screen.getByText('My Music');

    const logout = await screen.getByText('Log Out');
    const deleteAccount = await screen.getByText('Delete Account');

    await expect(myAccount && myMusic).toBeInTheDocument();
    await expect(logout && deleteAccount).toBeInTheDocument();
  });

  it('Should allow the user to log out', async () => {
    const { getByTestId } = await renderLoggedIn();

    // we're logged in, let's choose log out
    const drawer = await screen.getByTestId('drawer');
    await fireEvent.click(drawer);
    const logout = await screen.getByText('Log Out');
    await fireEvent.click(logout);

    // are we on the logout page?
    const confirm = await screen.getByText('Are you sure you want to log out?');
    await expect(confirm).toBeInTheDocument();
    const yes = await screen.getByText('Yes');
    await expect(yes).toBeInTheDocument();

    // confirm logout
    await fireEvent.click(yes);
    const video = await screen.getByTestId('splash');
    await expect(video).toBeInTheDocument();
  });
})