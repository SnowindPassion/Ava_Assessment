import './App.css';
import { Typography } from '@mui/material';
import { RegistrationForm } from './components/forms/RegistrationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h5">
          Registration Form
        </Typography>
      </header>
      <RegistrationForm />
    </div>
  );
}

export default App;
