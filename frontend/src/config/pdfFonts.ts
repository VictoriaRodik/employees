import { Font } from '@react-pdf/renderer';

export const registerPDFFonts = () => {
  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: '/fonts/Roboto-Regular.ttf',
        fontWeight: 'normal',
      },
      {
        src: '/fonts/Roboto-Bold.ttf',
        fontWeight: 'bold',
      }
    ]
  });
}; 