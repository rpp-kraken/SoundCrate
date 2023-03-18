import { render, screen } from '@testing-library/react';
import SongCardList from '../../client/src/components/SongCardList.jsx';
import { songData } from '../../DummyData/dummyData.js';
import '@testing-library/jest-dom';

describe('SongCardList', () => {
  const renderSongCardList = (songs) => render(<SongCardList songs={songs} />);

  it('should render a SongCardList to the screen', async () => {

    // this fails while SongCard remains unimplemented
    renderSongCardList(songData);
    const borkBork = await screen.getByText('bork Bork GRRR');
    expect(borkBork).toBeInTheDocument();
  });
});