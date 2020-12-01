import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart, ResponsiveContainer
} from 'recharts';

export const Visualize = () => {
    // handling loading and saving response
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({ lineData: null, barData: null});

    // get graph data from backend to display on charts
	useEffect (() => {
		fetch('/graphs').then(response => response.json().then( data => (
			setChartData({ lineData: data.line, barData: data.bar })
		)).then( _ => setLoading(false))
    )}, []);
            
    return (
        <div>
            { loading ? <div>LOADING.....</div> : 
                <div>
                    <Grid container alignItems="center" direction="column"><Typography variant="h4" direction="column">Line Chart of Poll Responses</Typography></Grid> 
                    <ResponsiveContainer width="95%" height={600}>
                        <LineChart data={chartData.lineData} 
                            margin={{top: 5, right: 30, left: 30, bottom: 5}}>
                            <XAxis dataKey="date" stroke="white"/>
                            <YAxis stroke="white"/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="yes" stroke="#8884d8" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="no" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                    <br />
                    <br />
                    <Grid container alignItems="center" direction="column"><Typography variant="h4" direction="column">Bar Chart of Poll Responses</Typography></Grid> 
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart
                            margin={{top: 5, right: 30, left: 30, bottom: 5}}
                            data={chartData.barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="vote" stroke="white"/>
                            <YAxis stroke="white"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
        </div>
    );
}