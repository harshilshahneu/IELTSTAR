import { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import Quiz from "./Quiz";
import { useUser } from "@auth0/nextjs-auth0/client";

const QuestionView = ({ exams }) => {
  const [test, setTest] = useState({});
  const [email, setEmail] = useState("");
  const user = useUser().user;
  console.log(user);

  useEffect(() => {
    if (exams.length > 0) {
      setTest(exams[0]);
    }
  }, [exams]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const getNextTest = () => {
    let index = exams.findIndex((item) => item._id === test._id);
    if (index < exams.length - 1) {
      setTest(exams[index + 1]);
    }
    else {
      //fire score dialog here
    }
  };

  return (
    <section>
      <Timer />
      <Quiz test={test} getNextTest={getNextTest} user={email} />
    </section>
  );
};

export default QuestionView;
