import {InlineReactionButtons} from 'sharethis-reactjs';
import {InlineShareButtons} from 'sharethis-reactjs';
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


export default function ScoreBoard({open, setOpen}) {
    const { user } = useUser();
    const router = useRouter();
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
        
        axios.get(`${process.env.API_URL}/students/email/arvindmann307@gmail.com`)
        .then((response) => {
            //console.log(response.data.testHistory);
            console.log("Test Data");
            const userData = response.data.testHistory;
            let overall;
            let reading = 0;
            let readingCount = 0;
            let listening = 0;
            let listeningCount = 0;
            let speakingCount  = 0;
            let speaking = 0;
            let writingCount = 0;
            let writing = 0;
            userData.forEach(userTest => {
                //console.log(userTest.examId);
                //let num = Number("638a57d71435b001ef155480");
                //console.log(typeOf userTest.testId);
                if (userTest.examId == "638a57d71435b001ef155480") {
                    //console.log(userTest.examId);
                    if (userTest.testType === "Listening") {
                        listening += userTest.score;
                        listeningCount++;
                        
                    }
                    if (userTest.testType === "Speaking") {
                        speaking += userTest.score;
                        speakingCount++;
                        
                    }
                    if (userTest.testType === "Writing") {
                        writing += userTest.score;
                        writingCount++;
                        
                    }
                    if (userTest.testType === "Reading") {
                        reading += userTest.score;
                        readingCount++;
                        
                    }
                
                }
                if (reading > 0) {
                    reading = Math.round((reading / readingCount)*2)/2;
                    if (reading < 4.5) {
                        reading = 4.5;
                    }
                    
                }
                if (speaking > 0) {
                    speaking = Math.round((speaking / speakingCount)*2)/2;
                    if (speaking < 4.5) {
                        speaking = 4.5;
                    }
                    
                }
                if (listening > 0) {
                    listening = Math.round((listening / listeningCount)*2)/2;
                    if (listening < 4.5) {
                        listening = 4.5;
                    }
                    
                }
                if (writing > 0) {
                    writing = Math.round((writing / writingCount)*2)/2;
                    if (writing < 4.5) {
                        writing = 4.5;
                    }
                    
                }
                // if (overall == 0) {
                    overall =  Math.round(((reading + writing + speaking + listening) / 4)*2)/2;
                    console.log(overall);
                    console.log("overall");
                // }

            });
            let scores = {
                overallBand: overall,
                listeningScore: listening,
                readingScore: reading,
                writingScore: writing,
                speakingScore: speaking
            }
            

            //const scores = response.data;
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
                scores: scores
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
    // if (scores.length > 0) {
        console.log(scores.speakingScore);
        console.log("speakingScore");
        let series = [(scores.listeningScore)*11.11,(scores.readingScore)*11.11,(scores.writingScore)*11.11,(scores.speakingScore)*11.11];
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
                        disableEscapeKeyDown
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        
                        <div className={styles.profileTitle}>Can you show your support {user ? user.nickname : 'GUEST'} by sharing our website with your friends?</div>
                        <style dangerouslySetInnerHTML={{__html: `
          html, body {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
          }
          hr {
            margin-bottom: 40px;
            margin-top: 40px;
            width: 50%;
          }
        `}} />
                        <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'whatsapp',
              'linkedin',
              'messenger',
              'facebook',
              'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40,             // the size of each button (INTEGER)
 
            // OPTIONAL PARAMETERS
            url: 'http://localhost:3000/', // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description: 'custom text',       // (defaults to og:description or twitter:description)
            title: 'custom title',            // (defaults to og:title or twitter:title)
            message: 'custom email text',     // (only for email sharing)
            subject: 'custom email subject',  // (only for email sharing)
            username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />
        <hr/>
       
                        <div className={styles.overallBandComponent}>
                            <article>OVERALL BAND:</article>
                            <article>{scores.overallBand}</article>
                        </div>
                        <div className='grid-content'>
                        <Grid container spacing={0}>
                            <Grid item xs={6} md={6}>
                                <div className={styles.scoreBoardText}>
                                    <section className={styles.container}>
                                        <article className="box box1"><HeadphonesIcon className='icon'></HeadphonesIcon></article>
                                        <article className="box box2">Listening:</article>
                                        <article className="box box3">{scores.listeningScore}</article>
                                        <article className="box box4"><MenuBookIcon className='icon'></MenuBookIcon></article>
                                        <article className="box box5">Reading:</article>
                                        <article className="box box6">{scores.readingScore}</article>
                                        <article className="box box7"><BorderColorOutlinedIcon className='icon'></BorderColorOutlinedIcon></article>
                                        <article className="box box8">Writing:</article>
                                        <article className="box box9">{scores.writingScore}</article>
                                        <article className="box box10"><RecordVoiceOverOutlinedIcon className='icon'></RecordVoiceOverOutlinedIcon></article>
                                        <article className="box box11">Speaking:</article>
                                        <article className="box box12">{scores.speakingScore}</article>
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
    // }

}
