import { Font } from '@react-pdf/renderer';

export const registerPDFFonts = () => {
  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: '/fonts/Roboto-Regular.ttf',
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
      {
        src: '/fonts/Roboto-Bold.ttf',
        fontWeight: 'bold',
        fontStyle: 'normal',
      },
      {
        src: '/fonts/Roboto-Italic.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ]
  });
}; 