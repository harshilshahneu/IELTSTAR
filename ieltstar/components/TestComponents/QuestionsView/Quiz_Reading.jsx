import { Component, use, useEffect, useState, React } from "react";
import { MobileStepper } from '@mui/material';
import Button from '@mui/material/Button';
import Replay from '@mui/icons-material/Replay';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import reading from'./Reading'; 

const Quiz_Set = [
    {
        queno:"que_1",
        que : "1) Heat in voting",
        options : [{que_options: "A" , selected: false},{que_options:"B", selected: false},{que_options:"C", selected: false}],
        ans : "B"
    },
    {
        queno:"que_2",
        que : "2) A fact about the UK",
        options : [{que_options: "F" , selected: false},{que_options:"G", selected: false},{que_options:"H", selected: false}],
        ans : "F"
    },
    {
        queno:"que_3",
        que : "3) Statement of the caucus guide",
        options : [{que_options: "D" , selected: false},{que_options:"E", selected: false},{que_options:"F", selected: false}],
        ans : "E"
    },
    {
        queno:"que_4",
        que : "4) The way Democratic caucus-goers in Iowa show their support",
        options : [{que_options: "D" , selected: false},{que_options:"E", selected: false},{que_options:"F", selected: false}],
        ans : "D"
    },
    {
        queno:"que_5",
        que : "5) A parallel with sport",
        options : [{que_options: "A" , selected: false},{que_options:"B", selected: false},{que_options:"C", selected: false}],
        ans : "A"
    },
    {
        queno:"que_6",
        que : "Some examples of winning by the toss of a coin",
        options : [{que_options: "F" , selected: false},{que_options:"G", selected: false},{que_options:"H", selected: false}],
        ans : "G"
    },
    {
        queno:"que_7",
        que : "7) An unexpected outcome",
        options : [{que_options: "C" , selected: false},{que_options:"D", selected: false},{que_options:"E", selected: false}],
        ans : "C"
    },
    {
        queno:"que_8",
        que : "New rule",
        options : [{que_options: "F" , selected: false},{que_options:"G", selected: false},{que_options:"H", selected: false}],
        ans : "H"
    }
]

class Quiz extends Component{

   constructor(props){


        super(props)
        this.state = {
            activeStep:0,
            Quiz_Set : Quiz_Set,
            booleanonsubmit : false,
            Total:0,
            open:false,
            catchmsg:"",
            errormsg:""
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
            if (card.queno !== e.target.name) return card;
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
                           if(anslist.que_options === item.ans){
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
                      <div className="Quiz_que">{item.que}</div>
                       
                          <div className="Quiz_options"> Options are : </div>
                            {item.options.map((ans,index_ans)=>{
                                index_ans = index_ans + 1
                                return (
                                    <div key={index_ans}className="Quiz_multiple_options">
                                                                 <input
                                                                 className="Quiz_radio_input"
                                            key={index_ans}
                                            type="radio"
                                            name={item.queno}
                                            value={ans.que_options}
                                            checked={!!ans.selected}
                                            onChange={this.onInputChange}
                                        />
                                         {index_ans}] {ans.que_options}
                                    
                 
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
//   const [data, setData] = useState('');
//   useEffect(() => {
//       reading();
//   }, []);
//   const reading = () => {
      
//         axios.get('http://localhost:8080/questions')
//             .then(response => setData(response.data))
      
//       return (
//           <div>Question is {JSON.stringify(data)}</div>
//       )
//     }
}


export default Quiz;