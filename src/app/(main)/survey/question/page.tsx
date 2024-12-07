"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

      try {
        const { data, error: fetchError } = await supabase
          .from("question_and_answer")
          .select("*");

        if (fetchError) {
          console.error("Error fetching data:", fetchError);
          setError("Failed to fetch questions.");
        } else if (data?.length > 0) {
          setQuestions(data);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
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

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const userKey = localStorage.getItem("user_key") || "";

      const answerData: { user_key: string; [key: string]: any } = { user_key: userKey };
      answers.forEach((answer, index) => {
        answerData[`answer_${index}`] = answer;
      });

      try {
        const { error: submitError } = await supabase
          .from("user_answer")
          .insert([answerData]);

        if (submitError) {
          console.error("Error submitting answers:", submitError);
          setError("Failed to submit answers.");
        } else {
          console.log("Answers submitted successfully!");
          router.push(`/survey/results/${userKey}`);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred during submission.");
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (questions.length === 0) return <div className="text-center p-4">No questions available.</div>;

  const currentQuestionData = questions[currentQuestion];
  const answersArray = [
    currentQuestionData.answer_0,
    currentQuestionData.answer_1,
    currentQuestionData.answer_2,
    currentQuestionData.answer_3,
  ].filter((answer) => !!answer);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 mx-auto">
        {/* Question Title */}
        <div className="text-lg font-semibold text-gray-800 mb-4">
          {currentQuestion + 1}. {currentQuestionData.question}
        </div>

        {/* Question Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {answersArray.length > 0 ? (
            answersArray.map((answer: string, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`answer_${index}`}
                  name="answer"
                  value={index}
                  onChange={handleAnswerChange}
                  checked={answers[currentQuestion] === index}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  required
                />
                <label
                  htmlFor={`answer_${index}`}
                  className="text-gray-700 text-base"
                >
                  {answer}
                </label>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No answers available.</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currentQuestion < questions.length - 1 ? ">  다음" : "결과 확인하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyQuestion;
