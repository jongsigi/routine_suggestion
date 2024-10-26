"use client"; // Ensures the component is treated as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { processUserAnswer } from "@/lib/processUserAnswer";
import "@/lib/result.css"; // Ensure this file contains the necessary CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const kakaoJavascriptKey = process.env.KAKAO_JAVASCRIPT_KEY || ''

interface UserData {
  user_key: string;
}

const baumannCategories = [
  ["O", "D"],
  ["S", "R"],
  ["P", "N"],
  ["W", "T"],
];

const ResultsPage: React.FC = () => {
  const router = useRouter();
  const { user_key } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [processedResults, setProcessedResults] = useState<number[] | null>(null);
  const [baumannType, setBaumannType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch and process user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user_key) return;

      const { data, error: fetchError } = await supabase
        .from("user_answer")
        .select("*")
        .eq("user_key", user_key);

      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
        setError("Failed to fetch user data.");
      } else {
        setUserData(data?.[0] || null);
        if (data && data.length > 0) {
          try {
            const { processedData, baumannType } = await processUserAnswer(data[0]);
            setProcessedResults(processedData);
            setBaumannType(baumannType);
          } catch (err) {
            console.error("Error processing user data:", err);
            setError("Failed to process user data.");
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user_key]);

  // Initialize Kakao SDK when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoJavascriptKey); // Replace with your actual Kakao JavaScript key
      }
    };
    document.body.appendChild(script);
  }, []);

  // Share function for Facebook, Twitter, and KakaoTalk
  const fn_sendFB = (sns: string) => {
    const thisUrl = document.URL;
    const snsTitle = "피부 MBTI 결과 공유하기";

    switch (sns) {
      case "facebook":
        window.open(
          `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(thisUrl)}`,
          "",
          "width=486,height=286"
        );
        break;
      case "twitter":
        window.open(
          `http://twitter.com/share?url=${encodeURIComponent(thisUrl)}&text=${encodeURIComponent(snsTitle)}`,
          "tweetPop",
          "width=486,height=286,scrollbars=yes"
        );
        break;
      case "kakaotalk":
        if (window.Kakao && window.Kakao.isInitialized()) {
          window.Kakao.Link.createDefaultButton({
            container: "#btnKakao",
            objectType: "feed",
            content: {
              title: snsTitle,
              description: snsTitle,
              imageUrl: thisUrl, // Set a custom image URL if needed
              link: {
                mobileWebUrl: thisUrl,
                webUrl: thisUrl,
              },
            },
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSuggestionButtonClick = () => {
    router.push(`/main/skintypes/${baumannType}`);
  };

  const handleRetryButtonClick = () => {
    localStorage.clear();
    router.push("/main/survey/user_info");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="survey-complete">
      <div className="title">
        <h1 className="survey-title">피부TI 테스트 결과</h1>
      </div>

      {baumannType && (
        <p className="survey-result">
          당신의 피부타입은 <span className="baumann-type">{baumannType}</span>
        </p>
      )}
      <div className="skills_bar">
        {processedResults ? (
          processedResults.map((percent, index) => (
            <div className="percent_box" key={index}>
              <div className="bar">
                <div className="percent_value_box">
                  <span className="left_percent_value">
                    {baumannCategories[index][0]}
                  </span>
                  <span className="right_percent_value">
                    {baumannCategories[index][1]}
                  </span>
                </div>
                <div className="progress_line percent">
                  <span
                    className={percent > 50 ? "left_percent" : "right_percent"}
                    style={{
                      width: `${percent > 50 ? percent : 100 - percent}%`,
                      transformOrigin: percent > 50 ? "left" : "right",
                      [percent > 50 ? "left" : "right"]: 0,
                    }}
                    data-percent={percent > 50 ? percent : 100 - percent}
                  ></span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No processed results available.</div>
        )}
      </div>

      <div className="link-icon-box">
        <input
          type="button"
          id="btnKakao"
          className="link-icon kakao"
          onClick={() => fn_sendFB("kakaotalk")}
        />
        <input
          type="button"
          id="btnTwitter"
          className="link-icon twitter"
          onClick={() => fn_sendFB("twitter")}
        />
        <input
          type="button"
          id="btnFacebook"
          className="link-icon facebook"
          onClick={() => fn_sendFB("facebook")}
        />
      </div>
      <div className="button_box">
        <button
          style={{ color: "#8834db" }}
          className="button survey-button"
          type="button"
          onClick={handleSuggestionButtonClick}
        >
          {baumannType}의 추천 스킨케어 루틴
        </button>
      </div>

      <div className="button_box">
        <button
          className="button survey-button"
          type="button"
          onClick={handleRetryButtonClick}
        >
          <FontAwesomeIcon icon={faRotateRight} /> 테스트 다시하기
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
