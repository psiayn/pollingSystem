import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		flexGrow: 1
	},
});

export const LandingPage = ({ setOpen }) => {
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<Grid container alignItems="center" direction="column">
				<Grid item>
					<Typography variant="h2" component="h2" align="center">
						Hello! Please take this quick poll!
					</Typography>
				</Grid>
				<br />
				<br />
				<Grid item>
					<Button variant="contained" color="primary" onClick={ _ => {setOpen(true)} }>
						<Link to="/poll" style={{ textDecoration: 'none', color: 'inherit'}}>
							Take the poll
						</Link>
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}