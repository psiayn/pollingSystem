import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import { LandingPage } from './components/LandingPage';
import { DialogForm } from './components/DialogForm';
import { Polls } from './components/Polls';

function App() {
	
	// setting up react hooks for use across the application.
	const [ polls, setPolls ] = useState(null); // handles storing of the polls data
	const [open, setOpen] = useState(false); // handles opening and clossing of the poll pop up
	const [value, setValue] = useState('No'); // handles storing the vote response
	const [text, setText] = useState('John Doe'); // handles storing the user response
	const [selectedDate, setSelectedDate] = useState(new Date()); // handles storing date

	// setting dark theme globally
	const theme = createMuiTheme({
		palette: createPalette({
			type: 'dark',
		})
	});

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<div className="App">
					<LandingPage
						setOpen={setOpen}
					/>
				</div>
				<Switch>
					<Route path="/poll">
						<DialogForm
							open={open}
							setOpen={setOpen}
							value={value}
							setValue={setValue}
							text={text}
							setText={setText}
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
					</Route>
					<Route path="/analytics">
						<Polls polls={polls} setPolls={setPolls} />
					</Route>
				</Switch>
			</Router>
		</MuiThemeProvider>

  );
}

export default App;