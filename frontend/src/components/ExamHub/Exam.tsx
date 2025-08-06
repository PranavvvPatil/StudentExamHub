import { useEffect, useState, useCallback } from "react"; // 1. Import useCallback
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface Question {
  _id: string;
  questionText: string;
  options: string[];
}
interface Answers {
  [key: string]: number;
}

export default function Exam() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [current, setCurrent] = useState(0);
  const [timer, setTimer] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQ() {
      try {
        const res = await axios.post("https://student-exam-api.onrender.com/api/exam/start", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setQuestions(res.data.questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    }
    fetchQ();
  }, []);

  
  const handleSubmit = useCallback(async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, selected]) => ({
          questionId,
          selected
        }))
      };
      const res = await axios.post("https://student-exam-api.onrender.com/api/exam/start", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      localStorage.setItem("score", String(res.data.score));
      navigate("/result");
    } catch (error) {
      console.error("Failed to submit exam:", error);
    }
  }, [isSubmitted, answers, navigate]); 

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isSubmitted) {
      handleSubmit();
    }
    
  }, [timer, isSubmitted, handleSubmit]);

  const handleAnswer = (selectedIndex: number) => {
    const questionId = questions[current]._id;
    setAnswers({ ...answers, [questionId]: selectedIndex });
  };
  
  if (!questions.length) return <div>Loading...</div>;

  
  return (
    <div className="max-w-xl mx-auto md:mt-[141.5px] md:mb-[146.5px] mt-auto mb-auto bg-white p-8 shadow rounded">
      <div className="flex justify-between">
        <span>Time Left: {Math.floor(timer / 60)}:{("0" + timer % 60).slice(-2)}</span>
        <button onClick={handleSubmit} className="text-red-500">Submit Exam</button>
      </div>
      <div className="mt-6">
        {questions[current] && (
          <>
            <div className="font-bold mb-2">{questions[current].questionText}</div>
            {questions[current].options.map((opt: string, idx: number) => (
              <div key={idx} className="mb-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={questions[current]._id}
                    checked={answers[questions[current]._id] === idx}
                    onChange={() => handleAnswer(idx)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button disabled={current === 0} onClick={() => setCurrent(current - 1)}
          className="py-1 px-4 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <button disabled={current === questions.length - 1} onClick={() => setCurrent(current + 1)}
          className="py-1 px-4 bg-blue-400 text-white rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
