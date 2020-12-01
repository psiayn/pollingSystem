import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import { Visualize } from './Visualization';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export const Polls = ({ polls, setPolls }) => {
	const classes = useStyles();
	
	// handles checking if the page is loading. if the page is loading, don't try to display. handles async fetch of data from server. 
	// should technically show a loading spinner but for now renders LOADING..... 
	const [loading, setLoading] = useState(true);

	// async get response from server to render the table
	useEffect (() => {
		fetch('/data').then(response => response.json().then( data => (
			setPolls(data.polls)
		)).then( _ => setLoading(false))
	)}, []);
	
	return (
		<div>
			<Visualize />
			{loading ? <div>LOADING.....</div> : 
			<div>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="Poll Entries">
						
						<TableHead>
							<TableCell>User ID</TableCell>
							<TableCell align="right">Name</TableCell>
							<TableCell align="right">Vote</TableCell>
							<TableCell align="right">Date Of Submission</TableCell>
						</TableHead>

						<TableBody>
							{polls && polls.map((poll) => { return (
								<TableRow key={poll.uid}>
									<TableCell component="th" scope="row">{poll.uid}</TableCell>
									<TableCell align="right">{poll.name}</TableCell>
									<TableCell align="right">{poll.vote.toString()}</TableCell>
									<TableCell align="right">{poll.date.toString()}</TableCell>
								</TableRow>
							)})}		
						</TableBody>
					</Table>
				</TableContainer>
			</div>}
		</div>
	);
};