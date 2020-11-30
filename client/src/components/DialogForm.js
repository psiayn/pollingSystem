import React from 'react';
import 'date-fns';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';

export const DialogForm = ({ open, setOpen, value, setValue, text, setText, selectedDate, setSelectedDate }) => {
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	async function postData(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return response.json();
	}

	const formSubmit = async () => {
		let vote = false;
		if (value === "Yes") {
			vote = true;
		}
		
		console.log(open);
		console.log(value);
		console.log(text);
		console.log(selectedDate);
		let data = {
			name: text,
			vote: vote,
			date: selectedDate
		};
		let resp = await postData('/vote', data);
		console.log(resp);
		setOpen(false);
	};

	return (
		<div>
			<Dialog fullScreen open={open} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Poll</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill in this quick poll.</DialogContentText>
					
					<TextField 
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="name"
						value={text}
						onChange={e => setText(e.target.value)}
						fullWidth
					/>
					<br />
					<br />
					<br />
					
					<FormControl component="fieldset">
						<FormLabel component="legend">Do you like pineapple on pizza?</FormLabel>
						<RadioGroup aria-label="Do you like pineapple on pizza?" name="pizza" value={value} onChange={e => {setValue(e.target.value)}}>
							<FormControlLabel value="Yes" control={<Radio />} label="Yes"/>
							<FormControlLabel value="No" control={<Radio />} label="No"/>
						</RadioGroup>
					</FormControl>
					
					<br />
					<br />
					<br />
					
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container justify="space-around">
							<KeyboardDatePicker
								fullWidth
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker-inline"
								label="Date of submission"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</Grid>
					</MuiPickersUtilsProvider>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={formSubmit}>
						<Link to="/analytics" style={{ textDecoration: 'none', color: 'inherit'}} >
							Submit
						</Link>
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
