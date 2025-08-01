import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styled-components'; // Use styled-components
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon'; // Import the Icon component
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider

const theme = createTheme(); // Create a default theme

// Use theme.spacing(1) correctly as a function
const StyledLoadingButton = styled(Button)`
  display: flex;
  height: ${(props) => (props.variant === 'logout' ? '35px' : '68px')};
  ${(props) => (props.variant === 'logout' ? '' : 'padding: 24px')};
  ${(props) => (props.variant !== 'logout' && 'font-size: 24px')};
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  background: ${(props) => (props.variant === 'secondary' ? '' : 'var(--Secondary-100, #03C)')};
  color: var(--White, #FFF);
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.48px;

  &:hover {
    ${(props) => props.variant === 'logout' && 'background: var(--Secondary-100, #03C)'};
    ${(props) => props.variant === 'logout' && 'color: white'};
  }
`;

const LoadingButton = (props) => {
  const { loading, done, ...other } = props;

  if (done) {
    return (
      <StyledLoadingButton {...other} disabled>
        <Icon>check_circle</Icon>
      </StyledLoadingButton>
    );
  } else if (loading) {
    return (
      <StyledLoadingButton {...other}>
        <CircularProgress />
      </StyledLoadingButton>
    );
  } else {
    return <StyledLoadingButton {...other} />;
  }
};

LoadingButton.defaultProps = {
  loading: false,
  done: false,
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  done: PropTypes.bool,
};

// App component with ThemeProvider
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingButton /* your props */ />
    </ThemeProvider>
  );
}

export default App;
