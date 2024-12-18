"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SurveyPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user information exists in localStorage
    const userKey = localStorage.getItem("user_key");

    if (!userKey) {
      // If user_key is not found, redirect to the user_info page
      router.push("/");
    } else {
      // Otherwise, redirect to the question page
      router.push("/survey/question");
    }
  }, [router]);

  return null; // Or add a loading spinner if needed
};

export default SurveyPage;
