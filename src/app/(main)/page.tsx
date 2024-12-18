"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const UserInfoPage = () => {
  const router = useRouter();

  const [gender, setGender] = useState("male");
  const [ageDecade, setAgeDecade] = useState("10");
  const [agePart, setAgePart] = useState("early");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ageGroup = `${ageDecade}-${agePart}`;
    const userKey = uuidv4();

    const { data, error } = await supabase
      .from("user")
      .insert([{ user_key: userKey, gender, age_group: ageGroup }]);

    if (error) {
      console.error("Error inserting data:", error);
      return;
    }

    localStorage.setItem("user_key", userKey);
    localStorage.setItem("gender", gender);
    localStorage.setItem("age_group", ageGroup);

    router.push("/survey/question");
  };

  return (
    <div className="flex justify-center p-4">
      {/* Adjust the outer container for better alignment */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
          피부TI 스무고개 테스트
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="gender"
              className="block text-lg font-medium text-gray-700"
            >
              성별
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-lg font-medium text-gray-700"
            >
              나이
            </label>
            <div className="flex gap-4 mt-1">
              <select
                id="age_decade"
                name="age_decade"
                value={ageDecade}
                onChange={(e) => setAgeDecade(e.target.value)}
                className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                value={agePart}
                onChange={(e) => setAgePart(e.target.value)}
                className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="early">초반</option>
                <option value="mid">중반</option>
                <option value="late">후반</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoPage;
