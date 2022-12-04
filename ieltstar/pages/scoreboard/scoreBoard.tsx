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
//import dotenv from "dotenv";
//dotenv.config();




export default function ScoreBoard() {
    const [scores, getScores] = useState([]);
    let testID = 2;
    //http://localhost:8080/score?testId="${testID}
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
    
    if (scores.length >0) {
        return (
            <>
                <div className='note' key={scores[0].testId}>
                    <Paper className='score-board-paper' elevation={3}>
    
                        <AccountCircleIcon className='profileIcon'></AccountCircleIcon>
                        <div className='profile-title'>USER NAME/ GUEST</div>
    
                        <div className='overall-band-component'>
                            <article>OVERALL BAND:</article>
                            <article>{scores[0].overallBand}</article>
                        </div>
    
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
                        <Button className='restart-test' variant="contained" href='/dashboard' endIcon={<RestartAltIcon />}>
                            RESTART
                        </Button>
                    </Paper>
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

