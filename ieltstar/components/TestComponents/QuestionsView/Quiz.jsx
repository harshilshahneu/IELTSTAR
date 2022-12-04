import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { Component, use, useEffect, useState, React } from "react";
import { MobileStepper } from '@mui/material';
import Button from '@mui/material/Button';
import Replay from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import styles from '../../../styles/quizstyles/QuestionView.module.scss';
import paragraphStyles from '../../../styles/quizstyles/Paragraph.module.scss';

import { ReactMic } from "react-mic";
import AudioPlayer from "react-h5-audio-player";

let quiz_instructions = "";
let parsedQuestionSource = "";
let questionCategory = "";
let demoClientId = "client_9m1fYK3MPQxwKsib5CxtpB";

let demoText = {
  textarea: `The basics

Mispellings and grammatical errors can effect your credibility. The same goes for misused commas, and other types of punctuation . Not only will Grammarly underline these issues in red, it will also showed you how to correctly write the sentence.
  
Underlines that are blue indicate that Grammarly has spotted a sentence that is unnecessarily wordy. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner.
    
But wait...there's more?
  
Grammarly can give you very helpful feedback on your writing. Passive voice can be fixed by Grammarly, and it can handle classical word-choice mistakes.
    
It can even help when you wanna refine ur slang or formality level. That's especially useful when writing for a broad audience ranging from businessmen to friends and family, don't you think? It'll inspect your vocabulary carefully and suggest the best word to make sure you don't have to analyze your writing too much.`,
  input: `Mispellings and grammatical errors can effect your credibility.`,
  contenteditable: `<h3>The basics</h3>
  <p>
    Mispellings and grammatical errors can effect your credibility. The same
    goes for misused commas, and other types of punctuation . Not only will
    Grammarly underline these issues in red, it will also showed you how to
    correctly write the sentence.
  </p>
`,
};

const StatsOutput = ({ title, stats }) => (
  <section>
    <h3>{title}</h3>
    <pre>{JSON.stringify(stats, null, 2)}</pre>
  </section>
);
export const Editors = () => {
  // const [grammarlyConfig, setGrammarlyConfig] = useState({ underlines: "on", suggestionCards: "on" })
  const [docStats, setDocStats] = useState();
  const [sessionStats, setSessionStats] = useState();

  return (
    <Grammarly clientId={demoClientId}>
      <h2>Textarea</h2>
      <GrammarlyEditorPlugin
      config={{ underlines: "off", suggestionCards: "off" }}
        onDocumentStats={(evt) => setDocStats(evt.detail)}
        onSessionStats={(evt) => setSessionStats(evt.detail)}
      >
        <textarea defaultValue={demoText.textarea} rows={10} className={styles.question_view_textarea}></textarea>
      </GrammarlyEditorPlugin>
      {docStats && <StatsOutput stats={docStats} title="Document Stats" />}
      {sessionStats && (
        <StatsOutput stats={sessionStats} title="Session Stats" />
      )}
    </Grammarly>
  );
};
class Quiz extends Component{

      componentDidMount() {
        
        axios.get(`http://localhost:8080/tests/638c4346c72d7d42b6d78a3b`)
          .then(res => {
            const questionsfromdb = res.data;
            quiz_instructions = questionsfromdb.instruction;
            let questions = questionsfromdb.questions;
            parsedQuestionSource = questionsfromdb.source;
            questionCategory = questionsfromdb.category;
            
            if(questionCategory === "Listening") {
                parsedQuestionSource = `
                <h3>Listen to the instructions for each part of this section carefully. Answer all the questions.</h3>
                <audio controls>
  <source 
  src="${questionsfromdb.source}"
  
  type="audio/mpeg">
Your browser does not support the audio element.
</audio>`
             }

             
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
            writingtext:"",
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
        if (questionCategory === "Writing")
        {
          this.setState({writingtext:e.target.value})
        }
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
     // TODO: Pass the writing text (writingtext) to server
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

              if(questionCategory === "Writing")

              return(

                    <div className={styles.question_view_main_grid_2_columns}>
                          
                        <section className={styles.question_view_card}>
                            <div className={paragraphStyles.Paragraph_content}                         
                            dangerouslySetInnerHTML={{__html: parsedQuestionSource}} /></section>
                        <section className={styles.question_view_card}>
                        <div className={styles.Quiz_container_display}>
                        <h3>{quiz_instructions}</h3>
                        <textarea onChange={this.onInputChange} spellCheck='false' type='textarea' rows={19} className={styles.question_view_textarea}></textarea>

                      <div className={styles.Quiz_que}>
                        {item.questionTitle}
                        </div>
                       
                          <div className={styles.Quiz_options}></div>
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
              else if (questionCategory === "Speaking")
              return (
                  
                <div className={styles.question_view_main_grid_2_columns}>
                      
                    <section className={styles.question_view_card}>
                        <div className={paragraphStyles.Paragraph_content}                         
                        dangerouslySetInnerHTML={{__html: parsedQuestionSource}} /></section>
                    <section className={styles.question_view_card}>
                    <div className={styles.Quiz_container_display}>
                    <h3>{quiz_instructions}</h3>
                  <div className={styles.Quiz_que}>
                    {item.questionTitle}
                    </div>
                   
                      <div className={styles.Quiz_options}></div>
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


            else if (questionCategory === "Reading")
              return (
                  
                    <div className={styles.question_view_main_grid_2_columns}>
                          
                        <section className={styles.question_view_card}>
                            <div className={paragraphStyles.Paragraph_content}                         
                            dangerouslySetInnerHTML={{__html: parsedQuestionSource}} /></section>
                        <section className={styles.question_view_card}>
                        <div className={styles.Quiz_container_display}>
                        <h3>{quiz_instructions}</h3>
               
                      <div className={styles.Quiz_que}>
                        {item.questionTitle}
                        </div>
                       
                          <div className={styles.Quiz_options}></div>
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