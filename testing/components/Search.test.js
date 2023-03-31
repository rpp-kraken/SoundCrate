import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../client/src/components/Search.jsx';
import Home from '../../client/src/components/Home.jsx';
import { songData } from '../../DummyData/dummyData.js';
import '@testing-library/jest-dom';

describe('Search', () => {
  const renderSearch = () => render(<Search />);
  const renderHome = () => render(<Home songs={songData} />);

  it('Should have a search bar', async () => {
    await renderSearch();
    const searchBar = await screen.getByTestId('searchBar');
    expect(searchBar).toBeInTheDocument();
  });

  it('Should have a search icon', async () => {
    await renderSearch();
    const searchIcon = await screen.getByTestId('SearchIcon');
    expect(searchIcon).toBeInTheDocument();
  });
});