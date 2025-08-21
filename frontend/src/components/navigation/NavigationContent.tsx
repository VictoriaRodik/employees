import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Link } from "react-router-dom";
import { mainNavItems, referenceNavItems, orderNavItems } from "./navItems";

import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import { JSX } from "react";

interface NavigationContentProps {
  isSmUp: boolean;
  onDrawerToggle: () => void;
}

const iconMap: Record<string, JSX.Element> = {
  people: <PeopleIcon color="primary" />,
  contracts: <DescriptionIcon color="primary" />,
};

const NavigationContent = ({
  isSmUp,
  onDrawerToggle,
}: NavigationContentProps) => {
  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {mainNavItems.map(({ to, label, icon }) => (
          <ListItemButton
            key={to}
            component={Link}
            to={to}
            sx={{ color: "text.primary" }}
            onClick={() => !isSmUp && onDrawerToggle()}
          >
            {icon && <ListItemIcon>{iconMap[icon]}</ListItemIcon>}
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>

      <Accordion>
        <AccordionSummary
          expandIcon={<KeyboardDoubleArrowDownIcon color="primary" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <List>
            <ListItemButton>
              <ListItemIcon>
                <StickyNote2Icon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Накази" />
            </ListItemButton>
          </List>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ overflow: "auto" }}>
            <List>
              {orderNavItems.map(({ to, label }) => (
                <ListItemButton
                  key={to}
                  component={Link}
                  to={to}
                  sx={{ color: "text.primary" }}
                  onClick={() => !isSmUp && onDrawerToggle()}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<KeyboardDoubleArrowDownIcon color="primary" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <List>
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Довідники" />
            </ListItemButton>
          </List>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ overflow: "auto" }}>
            <List>
              {referenceNavItems.map(({ to, label }) => (
                <ListItemButton
                  key={to}
                  component={Link}
                  to={to}
                  sx={{ color: "text.primary" }}
                  onClick={() => !isSmUp && onDrawerToggle()}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default NavigationContent;
