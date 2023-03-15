import { render, screen } from '@testing-library/react';
import SongCardList from '../../client/src/components/SongCardList.jsx';

const songs = [
  {
    title: "isCool",
    time: 30000, // in ms?
    artist: "Aaron Miller",
    artistImageUrl: "www.notarealurl.com",
    isLiked: true
  },
  {
    title: "anotherSong",
    time: 30000, // ms
    artist: "Nate Foster",
    artistImageUrl: "",
    isLiked: false
  },
  {
    title: "oneMore",
    time: 30000, // ms
    artist: "Joe",
    artistImageUrl: "https://unsplash.com/photos/3j45Gy-WkyA",
    isLiked: false
  },
  {
    title: "Hi there!",
    time: 30000, // ms
    artist: "Bri-Bri K",
    artistImageUrl: "",
    isLiked: true
  },
  {
    title: "Finale",
    time: 30000, // ms
    artist: "Anonymous",
    artistImageUrl: "notarealurl.com",
    isLiked: false
  },
  {
    title: "song",
    time: 30000, // ms
    artist: "Nate Foster",
    artistImageUrl: "",
    isLiked: false
  }
]

describe('SongCardList', () => {
  const renderSongCardList = (songs) => render(<SongCardList songs={songs} />);

  it('should render a SongCardList to the screen', async () => {
    renderSongCardList(songs);
    // this fails while SongCard remains unimplemented
    const aaronIsCool = await screen.getByText('isCool');
    expect(aaronIsCool).toBeInTheDocument();
  });
});