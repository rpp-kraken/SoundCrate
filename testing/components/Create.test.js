import { render, screen } from '@testing-library/react';
import Create from '../../client/src/components/Create.jsx';
import { songData } from '../../DummyData/dummyData.js';
import '@testing-library/jest-dom';

// describe('Create', () => {
//   const renderCreate = () => render(<Create  />);

//   it('should render Create Tab to the screen', async () => {

//     renderCreate();
//     const PublishRendered = await screen.getByText('To start creating, upload some audio or record yourself!');
//     expect(PublishRendered).toBeInTheDocument();
//   });
// });
