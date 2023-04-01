import { render, screen, fireEvent } from '@testing-library/react';
import Publish from '../../client/src/components/Publish.jsx';
import '@testing-library/jest-dom';
global.alert = jest.fn();



describe('Publish', () => {

    const mockProfile = {
    setOpenPublish: jest.fn(),
    profileData: {
      username: 'chonkyKitty',
      id: '1'
    },
    song: new File(['Meowser'], 'test.mp3', { type: 'audio/mp3' })
  };

  const renderPublish = (mockProfile) => render(<Publish profileData={mockProfile} />);

  it('should render Publish to the screen', async () => {
    renderPublish();
    const uploadImage = await screen.getByText('Upload Image');
    expect(uploadImage).toBeInTheDocument();
  });

  it('should render input field for song title', () => {
    renderPublish(mockProfile);
    const songTitleInput = screen.getByLabelText('Song Title:');
    expect(songTitleInput).toBeInTheDocument();
  });

  it('should render upload image button', () => {
    renderPublish(mockProfile);
    const uploadImageButton = screen.getByRole('button', {name: 'Upload Image'});
    expect(uploadImageButton).toBeInTheDocument();
  });

  it('should render the Publish div', () => {
    renderPublish(mockProfile);
    const publishDiv = screen.getByTestId('publish');
    expect(publishDiv).toBeInTheDocument();
  });


});

