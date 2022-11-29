import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Paper from '@mui/material/Paper';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import './scoreBoard.module.scss';
import { useSelector } from 'react-redux';


interface User {
    user: {
        user: object
    };
}

export default function ScoreBoard() {
    const user = useSelector((state: User) => state.user.user);
    console.log(user);
    let userProfile = {
        username: "Saloni"
    };

    let test = {
        id: "Saloni",
        overall: 7,
        listening: 6,
        reading: 6.5,
        writing: 7.5,
        speaking: 8
    }
    let overall;
    let listening;
    let reading;
    let writing;
    let speaking;


    if (userProfile.username == test.id) {
        overall = test.overall;
        listening = test.listening;
        reading = test.reading;
        writing = test.writing;
        speaking = test.speaking;
    }
    return (
        <>
            <div>
                <Paper className='score-board-paper' elevation={3}>

                    <AccountCircleIcon className='profileIcon'></AccountCircleIcon>
                    <div className='profile-title'>USER NAME/ GUEST</div>

                    <div className='overall-band-component'>
                        <article>OVERALL BAND:</article>
                        <article>{overall || 7}</article>
                    </div>

                    <div className='score-board-text'>
                        <section className='boxes container'>
                            <article className="box box1"><HeadphonesIcon className='icon'></HeadphonesIcon></article>
                            <article className="box box2">Listening:</article>
                            <article className="box box3">{listening || 7}</article>
                            <article className="box box4"><MenuBookIcon className='icon'></MenuBookIcon></article>
                            <article className="box box5">Reading:</article>
                            <article className="box box6">{reading || 7}</article>
                            <article className="box box7"><BorderColorOutlinedIcon className='icon'></BorderColorOutlinedIcon></article>
                            <article className="box box8">Writing:</article>
                            <article className="box box9">{writing || 7}</article>
                            <article className="box box10"><RecordVoiceOverOutlinedIcon className='icon'></RecordVoiceOverOutlinedIcon></article>
                            <article className="box box11">Speaking:</article>
                            <article className="box box12">{speaking || 7}</article>
                        </section>
                    </div>
                    <Button className='restart-test' variant="contained" endIcon={<RestartAltIcon />}>
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

