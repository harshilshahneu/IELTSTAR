import React, {Component} from 'react';
import Timer from '../Timer/Timer';
import Quiz from './Quiz';

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