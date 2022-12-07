import { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import Quiz from "./Quiz";

const QuestionView = ({ exams }) => {
  const [test, setTest] = useState({});

  useEffect(() => {
    if (exams.length > 0) {
      setTest(exams[1]);
    }
  }, [exams]);

  const getNextTest = () => {
    let index = exams.findIndex((item) => item._id === test._id);
    if (index < exams.length - 1) {
      setTest(exams[index + 1]);
    }
  };

  return (
    <section>
      <Timer />
      <Quiz test={test} getNextTest={getNextTest} />
    </section>
  );
};

export default QuestionView;
