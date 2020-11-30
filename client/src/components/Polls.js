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


const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export const Polls = ({ polls, setPolls }) => {
	const classes = useStyles();
	
	
	const [loading, setLoading] = useState(true);

	useEffect (() => {
		fetch('/data').then(response => response.json().then( data => (
			setPolls(data.polls)
		)).then( _ => setLoading(false))
		)}, []);
	
		return (
		<div>
			{loading ? <div>LODING.....</div> : 
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
									<TableCell align="right">{poll.date}</TableCell>
								</TableRow>
							)})}		
						</TableBody>
					</Table>
				</TableContainer>
			</div>}
		</div>
	);
};