"use client";

import { useState } from "react";

export default function SkinTypeForm() {
  const [skinType, setSkinType] = useState("");
  const [category, setCategory] = useState({ time: "", product: "" });
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form field changes
  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convert input to uppercase
    setSkinType(value);
    if (error) setError(null); // Clear error when the user starts typing
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
    if (error) setError(null); // Clear error when the user starts typing
  };

  // Validate SkinType input (case-insensitive)
  const validateSkinType = (input: string) => {
    const skinTypePattern = /^[DN]{1}[RS]{1}[NP]{1}[TW]{1}$/i; // Use 'i' flag for case-insensitivity
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
    setIsSubmitting(true); // Disable button while submitting

    // Simulate form submission (e.g., call API)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      console.log({ skinType, category, itemName });
    }, 2000); // Simulate network delay
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
        나의 루틴 체크!
      </h1>
      <p className="text-sm text-center text-gray-600 mb-4">
        이 페이지에서는 여러분의 피부 타입과 제품 정보를 입력하여<br /> 피부타입과 잘 맞는 성분이 얼마나 함유되었는지 보여드립니다.
      </p>
      {submitted ? (
        <div className="text-center text-green-600 font-medium">
          Thank you for your submission!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SkinType Input */}
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

          {/* Category Select */}
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

          {/* Item Name Input */}
          <div>
            <label
              htmlFor="itemName"
              className="block text-lg font-medium text-gray-700"
            >
              상품명!
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

          {/* Error message */}
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? "제출 중..." : "제출하기"}
          </button>
        </form>
      )}
    </div>
  );
}
