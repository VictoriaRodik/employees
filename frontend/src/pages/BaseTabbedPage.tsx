import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabConfig {
  label: string;
  content: React.ReactNode;
}

interface BaseTabbedPageProps {
  title: string;
  tabs: TabConfig[];
  titleVariant?: 'h3' | 'h4' | 'h5' | 'h6';
  titleColor?: string;
  titleTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  titleWeight?: 'normal' | 'bold' | 'bolder' | 'lighter';
  paperPadding?: number;
  paperBackgroundColor?: string;
  paperBorderRadius?: number;
  tabPanelPadding?: number;
  ariaLabel?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const BaseTabbedPage: React.FC<BaseTabbedPageProps> = ({
  title,
  tabs,
  titleVariant = 'h4',
  titleColor = 'primary',
  titleTransform = 'none',
  titleWeight = 'normal',
  paperPadding = 2,
  paperBackgroundColor = 'background.paper',
  paperBorderRadius = 2,
  tabPanelPadding = 3,
  ariaLabel = 'tabs',
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label={ariaLabel}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        {tabs.map((tab, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
};

export default BaseTabbedPage;
