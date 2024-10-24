"use client"; // This line indicates that this component is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you're importing useRouter
import { supabase } from "@/lib/supabase"; // Adjust the import path based on your Supabase setup
import { v4 as uuidv4 } from "uuid"; // Import UUID
import "@/lib/user_info.css"; // Adjust the path based on your actual CSS file location

const UserInfoPage = () => {
  const router = useRouter(); // Define router for navigation

  const [gender, setGender] = useState("male");
  const [ageDecade, setAgeDecade] = useState("10");
  const [agePart, setAgePart] = useState("early");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ageGroup = `${ageDecade}-${agePart}`;
    const userKey = uuidv4(); // Generate UUID for user_key

    // Insert data into Supabase
    const { data, error } = await supabase
      .from("user") // Ensure this matches the actual table name in Supabase
      .insert([{ 
        user_key: userKey, 
        gender, 
        age_group: ageGroup 
      }]); // 'created_at' will be automatically handled by Supabase (set as default 'now()' in DB)

    if (error) {
      console.error("Error inserting data:", error);
      return; // Handle error accordingly
    }

    console.log("Inserted data:", data);

    // Save user info in localStorage (acting like a session)
    localStorage.setItem("user_key", userKey);
    localStorage.setItem("gender", gender);
    localStorage.setItem("age_group", ageGroup);

    // After saving, redirect to the survey/question page
    router.push("/main/survey/question");
  };

  return (
    <div>
      <div className="title-form">
        <div className="title">피부 MBTI 스무고개 테스트</div>
      </div>
      <form onSubmit={handleSubmit} className="user-info-form">
        <div className="user-info__field">
          <i className="login__icon fas fa-venus-mars"></i>
          <label htmlFor="gender" className="user-info__label">
            성별
          </label>
          <select
            id="gender"
            name="gender"
            className="user-info__input"
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div className="user-info__field">
          <i className="login__icon fas fa-birthday-cake"></i>
          <label htmlFor="age" className="user-info__label">
            나이
          </label>
          <div className="user-info__age-group">
            <select
              id="age_decade"
              name="age_decade"
              className="user-info__input user-info__input--age"
              required
              onChange={(e) => setAgeDecade(e.target.value)}
            >
              <option value="10">10대</option>
              <option value="20">20대</option>
              <option value="30">30대</option>
              <option value="40">40대</option>
              <option value="50">50대</option>
              <option value="60">60대</option>
            </select>
            <select
              id="age_part"
              name="age_part"
              className="user-info__input user-info__input--age"
              required
              onChange={(e) => setAgePart(e.target.value)}
            >
              <option value="early">초반</option>
              <option value="mid">중반</option>
              <option value="late">후반</option>
            </select>
          </div>
        </div>
        <button type="submit" className="button user-info__submit">
          <span className="button__text">시작하기</span>
          <i className="button__icon fas fa-chevron-right"></i>
        </button>
      </form>
    </div>
  );
};

export default UserInfoPage;
