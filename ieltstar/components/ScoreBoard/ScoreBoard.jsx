import HeadphonesIcon from '@mui/icons-material/Headphones';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
//import './scoreBoard.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useUser } from '@auth0/nextjs-auth0/client';
import Grid from '@mui/material/Grid';
import ApexChart from './RadialChart';
import FormDialog from '../SendScore/SendScore';
import { useRouter } from "next/router";
import styles from "../../styles/ScoreBoard.module.scss";


export default function ScoreBoard() {
    const [open, setOpen] = React.useState(true);
    const { user } = useUser();
    const router = useRouter();
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
        // Please uncomment after development
        //sendEmail(user, scores);
    }, [user || '']);

    /**
     * Function to get current score from API
     */
    const getCurrentScore = () => {
        axios.get(`${url}`)
            .then((response) => {
                const scores = response.data;
                getScores(scores);
                console.log(scores);
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    /**
     * Function to Send Score via Email from API
     * @param {user} user - LoggedIn User 
     * 
     */
    const sendEmail = (user) => {
        if (user) {
            axios
            .post(`${process.env.API_URL}/email/${user.email}`, {
                email: user.email,
                name: user.given_name || user.nickname,
                picture: user.picture,
                scores: scores[0]
              })
              .then((res) => {
                console.log(res);
                console.log("EMAIL SEND SUCCESSFULLY");
              })
              .catch((err) => {
                console.log(err);
              });
          }
    }
    if (scores.length > 0) {
        let series = [(scores[0].listeningScore)*11.11,(scores[0].readingScore)*11.11,(scores[0].writingScore)*11.11,(scores[0].speakingScore)*11.11];
        const handleClose = () => {
            router.push("/student/dashboard");
            setOpen(false);
        };

        return (
            <>
                {/* <Button onClick={handleClickOpen}>
                    <div>GET SCORES</div>
                </Button> */}

                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition} 
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <div className={styles.profileTitle}>{user ? user.nickname : 'GUEST'}</div>

                        <div className={styles.overallBandComponent}>
                            <article>OVERALL BAND:</article>
                            <article>{scores[0].overallBand}</article>
                        </div>
                        <div className='grid-content'>
                        <Grid container spacing={0}>
                            <Grid item xs={6} md={6}>
                                <div className={styles.scoreBoardText}>
                                    <section className={styles.container}>
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
                            <div className={styles.scoreChart}>
                                <ApexChart series={series}></ApexChart>
                            </div>
                            </Grid>
                        </Grid>
                        </div>
                        <div className={styles.sendScore}>
                        <FormDialog scores={scores} />
                        </div>
                        
                        

                    </Dialog>
                
            </>
        )
    }

}
