"use client";

import { useState } from "react";
import Link from "next/link";

export default function SkinTypeForm() {
  const [skinType, setSkinType] = useState("");
  const [category, setCategory] = useState({ time: "", product: "" });
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field changes
  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSkinType(value);
    if (error) setError(null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
    if (error) setError(null);
  };

  // Validate SkinType input
  const validateSkinType = (input: string) => {
    const skinTypePattern = /^[DN]{1}[RS]{1}[NP]{1}[TW]{1}$/i;
    return skinTypePattern.test(input);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSkinType(skinType)) {
      setError(
        "피부타입은 4개의 알파벳으로 이루어져야 합니다. (D/N, R/S, N/P, T/W)"
      );
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log({ skinType, category, itemName });
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
        나의 루틴 체크!
      </h1>
      <p className="text-sm text-center text-gray-600 mb-4">
        여러분의 피부 타입과 제품 정보를 입력하면
        <br /> 성분들이 피부타입에 잘 맞는지 보여드립니다.
      </p>
      {submitted ? (
        <div className="text-center text-green-600 font-medium">
          Thank you for your submission!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="skinType"
              className="block text-lg font-medium text-gray-700"
            >
              피부타입은?
            </label>
            <input
              type="text"
              id="skinType"
              value={skinType}
              onChange={handleSkinTypeChange}
              placeholder="피부타입을 입력해주세요 (ex. DSPT)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="product"
                className="block text-lg font-medium text-gray-700"
              >
                제품 카테고리는?
              </label>
              <select
                id="product"
                name="product"
                value={category.product}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                required
              >
                <option value="">Select Product</option>
                <option value="클렌저">클렌저</option>
                <option value="토너">토너</option>
                <option value="세럼">세럼</option>
                <option value="수분크림">수분크림</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="itemName"
              className="block text-lg font-medium text-gray-700"
            >
              상품명을 입력해주세요
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={handleItemNameChange}
              placeholder="상품명을 입력해주세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}
          {/* Original Submit Button (disabled) */}
          <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
            <button
              type="submit"
              className="w-3/4 py-3 text-white font-semibold bg-gray-400 rounded-lg"
              disabled
            >
              제출하기
            </button>

            {/* New Button to Link to External URL */}
            <a
              href="https://open.kakao.com/o/gboZj02g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-3/4"
            >
              <button
                type="button"
                className="w-full py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
              >
                <span className="text-sm">
                  "루틴 체크!" 기능 업데이트 소식 받기 <br /> 12월 구현 예정
                  (카카오톡으로 이동)
                </span>
              </button>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
