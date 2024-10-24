"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Ensure the import path is correct
import { useRouter } from "next/navigation"; // Ensure you're importing useRouter
import "@/lib/question.css"; // Ensure this file contains the necessary CSS

const SurveyQuestion = () => {
  const [questions, setQuestions] = useState<any[]>([]); // Store all questions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(null)); // Initialize answers array
  const router = useRouter(); // Initialize router for navigation

  // Fetch all questions from Supabase on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("question_and_answer") // Ensure this matches your actual table name
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
      updatedAnswers[currentQuestion] = selectedAnswer; // Store answer at the current question index
      return updatedAnswers;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentQuestion < questions.length - 1) {
      // Move to the next question
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // All questions answered; handle the final submission
      const userKey = localStorage.getItem("user_key"); // Retrieve the user_key from localStorage

      // Construct the object to insert
      const answerData = { user_key: userKey }; // Use the defined type
      answers.forEach((answer, index) => {
        answerData[`answer_${index}`] = answer; // Add answers to the object dynamically
      });

      const { error: submitError } = await supabase
        .from("user_answer") // Ensure this matches the actual table name in Supabase
        .insert([answerData]);

      if (submitError) {
        console.error("Error submitting answers:", submitError);
        setError("Failed to submit answers.");
      } else {
        console.log("Answers submitted successfully!");
        // Redirect to the results page with user_key as a query parameter
        router.push(`/main/survey/results/${userKey}`);
      }
    }
  };

  // Loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if there's an issue
  }

  if (currentQuestion >= questions.length) {
    return <div>No more questions available.</div>; // Handle case where no more questions are available
  }

  const currentQuestionData = questions[currentQuestion];
  const answersArray = [
    currentQuestionData.answer_0,
    currentQuestionData.answer_1,
    currentQuestionData.answer_2,
    currentQuestionData.answer_3,
  ].filter(Boolean); // Ensure answers are filtered for any undefined values

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
                value={index} // Assuming you want to send the index
                aria-labelledby={`answer_label_${index}`}
                className="question-form__input"
                required
                onChange={handleAnswerChange}
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
            {currentQuestion < questions.length - 1
              ? ">  다음"
              : "결과 확인하기"}
          </span>
          <i className="button__icon fas fa-chevron-right"></i>
        </button>
      </form>
    </div>
  );
};

export default SurveyQuestion;
