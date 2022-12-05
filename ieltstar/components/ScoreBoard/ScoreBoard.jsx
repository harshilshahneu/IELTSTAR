import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Paper from '@mui/material/Paper';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
//import './scoreBoard.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useChart } from '../../components/Chart/useChart';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import ApexChart from './RadialChart'


export default function ScoreBoard() {
    const [open, setOpen] = React.useState(true);
    const { user } = useUser();
    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [scores, getScores] = useState([]);
    let testID = 2;
    const url = `${process.env.API_URL}/score?testId="${testID}"`;

    useEffect(() => {
        getCurrentScore();
    }, []);

    const getCurrentScore = () => {
        axios.get(`${url}`)
            .then((response) => {
                const scores = response.data;
                getScores(scores);
                console.log(scores);
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    if (scores.length > 0) {
        //setOpen(true);
        let series = [(scores[0].listeningScore)*11.11,(scores[0].readingScore)*11.11,(scores[0].writingScore)*11.11,(scores[0].speakingScore)*11.11];
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <>
                {/* <Button onClick={handleClickOpen}>
                    <div>GET SCORES</div>
                </Button> */}

                <div className='note' key={scores[0].testId}>

                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition} className='score-board-paper'
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        {/* <AccountCircleIcon className='profileIcon'></AccountCircleIcon> */}
                        <div className='profile-title'>{user ? user.nickname : 'GUEST'}</div>

                        <div className='overall-band-component'>
                            <article>OVERALL BAND:</article>
                            <article>{scores[0].overallBand}</article>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <div className='score-board-text'>
                                    <section className='boxes container'>
                                        <article className="box box1"><HeadphonesIcon className='icon'></HeadphonesIcon></article>
                                        <article className="box box2">Listening:</article>
                                        <article className="box box3">{scores[0].listeningScore}</article>
                                        <article className="box box4"><MenuBookIcon className='icon'></MenuBookIcon></article>
                                        <article className="box box5">Reading:</article>
                                        <article className="box box6">{scores[0].readingScore}</article>
                                        <article className="box box7"><BorderColorOutlinedIcon className='icon'></BorderColorOutlinedIcon></article>
                                        <article className="box box8">Writing:</article>
                                        <article className="box box9">{scores[0].writingScore}</article>
                                        <article className="box box10"><RecordVoiceOverOutlinedIcon className='icon'></RecordVoiceOverOutlinedIcon></article>
                                        <article className="box box11">Speaking:</article>
                                        <article className="box box12">{scores[0].speakingScore}</article>
                                    </section>
                                </div>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <ApexChart series={series}></ApexChart>
                            </Grid>
                        </Grid>
                        <Button className='restart-test' variant="contained" href='/dashboard' endIcon={<RestartAltIcon />}>
                            RESTART
                        </Button>

                    </Dialog>

                    <style jsx>
                        {`
                               
    
                                .mui-style-3su884-MuiPaper-root {
                                    padding: 10%;
                                    font-size: 20px;
                                    position: fixed;
                                    width: 70%;
                                    left: 50%;
                                    top: 50%;
                                    transform: translate(-50%, -50%);
                                    font-weight: bold;
                                }
    
    
    
                                .profileIcon {
                                    margin-left: 45%;
                                    height: 100px;
                                    width: 100px;
                                    
    
                                }
    
                                .overall-band-component {
                                    background-color: black;
                                    color: white;
                                    text-align: center;
                                    padding: 3%;
                                    margin-left: 10%;
                                    margin-right: 10%;
                                    display: grid;
                                    grid-template-columns: 45% 45%;
                                }
    
                                .container {
                                    
                                    display: grid;
                                    grid-template-columns: 10% 45% 45%;
                                }
    
                                .profile-title {
                                    text-align: center;
                                    font-size: 25px;
                                    margin-bottom: 3%;
                                }
                                .score-board-text {
                                    text-align: left;
                                    padding: 5%;
                                    margin-left: 10%;
                                }
    
                                .restart-test {
                                    position: fixed;
                                    width: 70%;
                                    left: 15%;
                                    top: 80%;
                                    font-weight: bolder;
                                    font-size: 20px;
                                    margin-top: 1%;
                                }
    
                                .icon {
                                    margin-top: 1%;
                                    margin-right: 1%;
                                }
                                
                            `}
                    </style>
                </div>
            </>
        )
    }

}
