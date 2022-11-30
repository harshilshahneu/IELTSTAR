// import './QuestionView.scss';
import React, {Component} from 'react';
import Timer from '../Timer/Timer';
import Paragraph from '../Paragraph/Paragraph';
import Quiz from './Quiz_Reading';

class QuestionView extends Component {
    render() {
        return (
            <section><Timer/>
            <section className = "question_view_main_grid_2_columns">
            <section className="question_view_card"><Paragraph/></section>
            <section className="question_view_card">
            <b>Reading Passage has eight paragraphs A-H. Which paragraph contains the following information?  Select the correct option, A–H.
            </b>
            <br/><br/>
                <Quiz/></section></section>
            </section>

);
    }
}
export default QuestionView;