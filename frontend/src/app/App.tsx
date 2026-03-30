import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Dashboard } from '../features/Dashboard/Dashboard';
import { Login } from '../features/Login/Login';
import { useAuthStore } from '../store/authStore';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

function App() {
  const token = useAuthStore((state) => state.token);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {
        token 
          ? <Dashboard />
          : <Login />
      }

    </ThemeProvider>
  );
};

export default App;
