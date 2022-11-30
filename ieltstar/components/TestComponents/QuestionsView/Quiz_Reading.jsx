import { Component, use, useEffect, useState, React } from "react";
import { MobileStepper } from '@mui/material';
import Button from '@mui/material/Button';
import Replay from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";

  
const Quiz_Set = [
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_1",
        questionCategory:"Reading",
        questionTitle : "1) Heat in voting",
        options : [{que_options: "A" , selected: false},{que_options:"B", selected: false},{que_options:"C", selected: false}],
        correctAnswer : "B"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_2",
        questionCategory:"Reading",
        questionTitle : "2) A fact about the UK",
        options : [{que_options: "F" , selected: false},{que_options:"G", selected: false},{que_options:"H", selected: false}],
        correctAnswer : "F"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_3",
        questionCategory:"Reading",
        questionTitle : "3) Statement of the caucus guide",
        options : [{que_options: "D" , selected: false},{que_options:"E", selected: false},{que_options:"F", selected: false}],
        correctAnswer : "E"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_4",
        questionCategory:"Reading",
        questionTitle : "4) The way Democratic caucus-goers in Iowa show their support",
        options : [{que_options: "D" , selected: false},{que_options:"E", selected: false},{que_options:"F", selected: false}],
        correctAnswer : "D"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_5",
        questionCategory:"Reading",
        questionTitle : "5) A parallel with sport",
        options : [{que_options: "A" , selected: false},{que_options:"B", selected: false},{que_options:"C", selected: false}],
        correctAnswer : "A"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_6",
        questionCategory:"Reading",
        questionTitle : "Some examples of winning by the toss of a coin",
        options : [{que_options: "F" , selected: false},{que_options:"G", selected: false},{que_options:"H", selected: false}],
        correctAnswer : "G"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_7",
        questionCategory:"Reading",
        questionTitle : "7) An unexpected outcome",
        options : [{que_options: "C" , selected: false},{que_options:"D", selected: false},{que_options:"E", selected: false}],
        correctAnswer : "C"
    },
    {
        _id:"6384e364c39c711583797e58",
        questionId:"que_8",
        questionCategory:"Reading",
        questionTitle : "New rule",
        options : [{que_options: "F" , selected: false},{que_options:"G", selected: false},{que_options:"H", selected: false}],
        correctAnswer : "H"
    }
]

class Quiz extends Component{

    
      componentDidMount() {
        axios.get(`http://localhost:8080/questions`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
      }
   constructor(props){
        super(props)
        this.state = {
            activeStep:0,
            Quiz_Set : Quiz_Set,
            booleanonsubmit : false,
            Total:0,
            open:false,
            catchmsg:"",
            errormsg:"",
            persons:[]
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

          const { Quiz_Set } = this.state;
            const nexState = Quiz_Set.map(card => {
            if (card.questionId !== e.target.name) return card;
            return {
                ...card,
                options: card.options.map(opt => {
                const checked = opt.que_options === e.target.value;
                return {
                    ...opt,
                    selected: checked
                }
                })
            }
            });
            this.setState({ Quiz_Set: nexState })
    }

    onsubmit = () =>{
         //   console.log(this.state.Quiz_Set)
         let list = this.state.Quiz_Set ;
         let count = 0;
         let notattempcount = 0;
     
                list.map((item,key)=>{
                    item.options.map((anslist,key)=>{
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
    
 <div className="Quiz_render_container">

    { this.state.booleanonsubmit ? 
        <div className="Quiz-DisplayResult"> 
           <h2> The score is {this.state.Total} Out Of 8 </h2>
             <Button onClick={()=>{this.setState({booleanonsubmit:false,activeStep:0,Quiz_Set : Quiz_Set,Total:0})}}> <Replay/> Try again </Button> 
        </div>
     :
     <div className="Quiz_container_display"> 
          {this.state.Quiz_Set.map((item,index)=>{
             if( Math.abs(this.state.activeStep - index)<=0)
             {
                return (
                    <div>
          
        {
          this.state.persons
            .map(question =>
             <div>{question.questionTitle}</div>
            )
        }
 
                      <div className="Quiz_que">{item.questionTitle}</div>
                       
                          <div className="Quiz_options"> Options are : </div>
                            {item.options.map((correctAnswer,index_ans)=>{
                                index_ans = index_ans + 1
                                return (
                                    <div key={index_ans}className="Quiz_multiple_options">
                                                                 <input
                                                                 className="Quiz_radio_input"
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
                )
             }else{
                 return null
             }
              
          })}

       <div className="Quiz-MobileStepper">
        <MobileStepper  variant="dots" steps={this.state.Quiz_Set.length} position="static" activeStep={this.state.activeStep}
            nextButton={
                this.state.activeStep === 7 ? 
                <Button size="small" variant="contained" color="info" onClick={this.onsubmit}>
                 Submit
                </Button>
                :
                <Button size="small" variant="contained" color="info" onClick={this.handleNext} disabled={this.state.activeStep === this.state.Quiz_Set.length}>
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