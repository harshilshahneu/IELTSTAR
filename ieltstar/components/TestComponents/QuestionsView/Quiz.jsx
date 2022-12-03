import { Component, use, useEffect, useState, React } from "react";
import { MobileStepper } from '@mui/material';
import Button from '@mui/material/Button';
import Replay from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import styles from '../../../styles/quizstyles/QuestionView.module.scss';
import paragraphStyles from '../../../styles/quizstyles/Paragraph.module.scss';

let quiz_instructions = "";
let paragraphSourceFromDB = "";
let questionCategory = "";

class Quiz extends Component{

      componentDidMount() {
        axios.get(`http://localhost:8080/tests/638ae794985db0cbf50ba783`)
          .then(res => {
            const questionsfromdb = res.data;
            quiz_instructions = questionsfromdb.instruction;
            let questions = questionsfromdb.questions;
            paragraphSourceFromDB = questionsfromdb.source;
     
            questionCategory = questionsfromdb.category;
            if(questionCategory === "Listening") {
                paragraphSourceFromDB = `
                <h3>Listen to the instructions for each part of this section carefully. Answer all the questions.</h3>
                <audio controls>
  <source 
  src="${questionsfromdb.source}"
  
  type="audio/mpeg">
Your browser does not support the audio element.
</audio>`
             }
            console.log(paragraphSourceFromDB);
            questions = questions.map((question, index) => ({
                questionId: "que_" + index,
                questionTitle: question.title,
                questionOptions : question.options.map(option => ({que_options: option})),
                correctAnswer : question.answer                
            }));
            this.setState({ questionsfromdb: questions });
          })
      }
   constructor(props){
        super(props)
        this.state = {
            activeStep:0,
            booleanonsubmit : false,
            Total:0,
            open:false,
            catchmsg:"",
            errormsg:"",
            questionsfromdb:[]
        }
                
   }

   

    handleNext=()=>{
        this.setState({activeStep:this.state.activeStep+1})
    }

    handleBack=()=>{
        this.setState({activeStep:this.state.activeStep-1})
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
         this.setState({open : false})
      };

    onInputChange = (e) => {

          const { questionsfromdb } = this.state;
            const nexState = questionsfromdb.map(card => {
            if (card.questionId !== e.target.name) return card;
            return {
                ...card,
                questionOptions: card.questionOptions.map(opt => {
                const checked = opt.que_options === e.target.value;
                return {
                    ...opt,
                    selected: checked
                }
                })
            }
            });
            this.setState({ questionsfromdb: nexState })
    }

    onsubmit = () =>{
         let list = this.state.questionsfromdb ;
         let count = 0;
         let notattempcount = 0;
     
                list.map((item,key)=>{
                    item.questionOptions.map((anslist,key)=>{
                       //  console.log("anslist.selected===>",anslist.selected)
                       if(anslist.selected === true){
                           if(anslist.que_options === item.correctAnswer){
                           //   console.log("===>",anslist.que_options,item.ans)
                               count = count + 1;
                           }
                       }else{
                        notattempcount = notattempcount + 1
                       }
                    })
                  })
          
   
       if(notattempcount<=24 && notattempcount>16){
              this.setState({booleanonsubmit:false,Total:count})
              this.setState({catchmsg:"Please attempt all questions",errormsg:"error",open:true})
       }else{
           this.setState({booleanonsubmit:true,Total:count})
       }
    }


    Snackbarrender =() =>{
        return(
          this.state.open? <Snackbar open={this.state.open} autoHideDuration={5000}  onClose={this.handleClose} style={{marginTop:'0px',width:'100%'}}>
           <Alert elevation={6} variant="filled" onClose={this.handleClose} severity={this.state.errormsg} >
             {this.state.catchmsg}
           </Alert>
         </Snackbar> : null
        )
      }



render(){
return(
   <div>
    { this.state.booleanonsubmit ? 
        <div> 
           <h2> The score is {this.state.Total} Out Of {this.state.questionsfromdb.length} </h2>
             <Button onClick={()=>{this.setState({booleanonsubmit:false,activeStep:0,questionsfromdb : questionsfromdb,Total:0})}}> <Replay/> Try again </Button> 
        </div>
     :
     <div> 
          {this.state.questionsfromdb.map((item,index)=>{
             if( Math.abs(this.state.activeStep - index)<=0)
             {
                return (
                    <div className={styles.question_view_main_grid_2_columns}>
                        <section className={styles.question_view_card}>
                            <div className={paragraphStyles.Paragraph_content}                         
                            dangerouslySetInnerHTML={{__html: paragraphSourceFromDB}} /></section>
                        <section className={styles.question_view_card}>
                        <div className={styles.Quiz_container_display}>
                        <h3>{quiz_instructions}</h3>

                      <div className={styles.Quiz_que}>
                        {item.questionTitle}
                        </div>
                       
                          <div className={styles.Quiz_options}> Options are : </div>
                            {item.questionOptions.map((correctAnswer,index_ans)=>{
                                index_ans = index_ans + 1
                                return (
                                    <div key={index_ans}className={styles.Quiz_multiple_options}>
                                                                 <input
                                                                 className={styles.Quiz_radio_input}
                                            key={index_ans}
                                            type="radio"
                                            name={item.questionId}
                                            value={correctAnswer.que_options}
                                            checked={!!correctAnswer.selected}
                                            onChange={this.onInputChange}
                                        />
                                         {index_ans}] {correctAnswer.que_options}
                                    
                 
                                    </div>
                                    )
                            })}
                     
                   
                    </div>
                    </section>
                    </div>
                )
             }else{
                 return null
             }
              
          })}

       <div className="Quiz-MobileStepper">
        <MobileStepper  variant="dots" steps={this.state.questionsfromdb.length} position="static" activeStep={this.state.activeStep}
            nextButton={
                this.state.activeStep === this.state.questionsfromdb.length-1 ? 
                <Button size="small" variant="contained" color="info" onClick={this.onsubmit}>
                 Submit
                </Button>
                :
                <Button size="small" variant="contained" color="info" onClick={this.handleNext} disabled={this.state.activeStep === this.state.questionsfromdb.length}>
                Next
                </Button>

            }
            backButton={

                <Button
                variant="contained" color="info"
                size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                    Back
                </Button>
            }
        />
        </div>
        
     </div>
    }
     {this.Snackbarrender()}

  </div>
   )
  }

}


export default Quiz;