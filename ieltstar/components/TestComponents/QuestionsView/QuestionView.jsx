import React, {Component} from 'react';
import Timer from '../Timer/Timer';
import Quiz from './Quiz_Reading';

class QuestionView extends Component {
    render() {
        return (
            <section><Timer/>
                <Quiz/>
            </section>

);
    }
}
export default QuestionView;