"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import "@/lib/question.css";

const SurveyQuestion = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(Array(20).fill(null));
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("question_and_answer")
        .select("*");

      if (fetchError) {
        console.error("Error fetching data:", fetchError);
        setError("Failed to fetch questions.");
      } else if (data && data.length > 0) {
        setQuestions(data);
      } else {
        setError("No data found.");
      }
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnswer = parseInt(event.target.value);
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = selectedAnswer;
      return updatedAnswers;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Navigate to the next question if not the last one
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Final submission to Supabase
      const userKey = localStorage.getItem("user_key") || ""; // Provide a fallback if user_key is null

      const answerData: { user_key: string; [key: string]: any } = { user_key: userKey };
      answers.forEach((answer, index) => {
        answerData[`answer_${index}`] = answer;
      });

      const { error: submitError } = await supabase.from("user_answer").insert([answerData]);

      if (submitError) {
        console.error("Error submitting answers:", submitError);
        setError("Failed to submit answers.");
      } else {
        console.log("Answers submitted successfully!");
        router.push(`/survey/results/${userKey}`);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (currentQuestion >= questions.length) return <div>No more questions available.</div>;

  const currentQuestionData = questions[currentQuestion];
  const answersArray = [
    currentQuestionData.answer_0,
    currentQuestionData.answer_1,
    currentQuestionData.answer_2,
    currentQuestionData.answer_3,
  ].filter(Boolean);

  return (
    <div>
      <div className="question-title">
        <div className="question-title-inner">
          <span className="question-title-span">
            {currentQuestion + 1}. {currentQuestionData.question}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        {answersArray.length > 0 ? (
          answersArray.map((answer: string, index: number) => (
            <div key={index} className="question-form__field">
              <input
                type="radio"
                id={`answer_${index}`}
                name="answer"
                value={index}
                aria-labelledby={`answer_label_${index}`}
                className="question-form__input"
                required
                onChange={handleAnswerChange}
                checked={answers[currentQuestion] === index}
              />
              <label
                id={`answer_label_${index}`}
                htmlFor={`answer_${index}`}
                className="question-form__label"
              >
                {answer}
              </label>
            </div>
          ))
        ) : (
          <div>No answers available.</div>
        )}

        <button type="submit" className="button question-form__submit">
          <span className="button__text">
            {currentQuestion < questions.length - 1 ? ">  다음" : "결과 확인하기"}
          </span>
          <i className="button__icon fas fa-chevron-right"></i>
        </button>
      </form>
    </div>
  );
};

export default SurveyQuestion;
