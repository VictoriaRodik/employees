import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

interface BasePageProps {
  title: string;
  children: React.ReactNode;
  titleVariant?: 'h3' | 'h4' | 'h5' | 'h6';
  titleColor?: string;
  titleTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  titleWeight?: 'normal' | 'bold' | 'bolder' | 'lighter';
  paperPadding?: number;
  paperBackgroundColor?: string;
  paperBorderRadius?: number;
}

const BasePage: React.FC<BasePageProps> = ({
  title,
  children,
  titleVariant = 'h4',
  titleColor = 'primary',
  titleTransform = 'uppercase',
  titleWeight = 'bold',
  paperPadding = 2,
  paperBackgroundColor = 'background.paper',
  paperBorderRadius = 2,
}) => {
  return (
    <Box>
      <Typography 
        variant={titleVariant} 
        gutterBottom 
        color={titleColor} 
        textTransform={titleTransform} 
        fontWeight={titleWeight}
      >
        {title}
      </Typography>
      <Paper
        sx={{
          p: paperPadding,
          bgcolor: paperBackgroundColor,
          borderRadius: paperBorderRadius,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default BasePage;
