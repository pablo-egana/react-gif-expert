import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en <GifGrid/>', () => {

  const category = 'DragonBall';

  test('debe de mostrar el loading inicialmente', () => {

    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true
    });
    render(<GifGrid category={ category } />);
    expect(screen.getByText('Cargando...'));
    expect(screen.getByText(category));

  });

  test('debe de mostrar items cuando se cargan las imágenes useFetchGifs', () => {

    const gifs = [
      {
        id: '123',
        title: 'DragonBall',
        url: 'https://media3.giphy.com/media/dragonball.gif'
      },
      {
        id: '456',
        title: 'OnePiece',
        url: 'https://media3.giphy.com/media/onepiece.gif'
      }
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false
    });

    render(<GifGrid category={ category } />);
    expect(screen.getAllByRole('img').length).toBe(2);

  });

});
