
"use client"; // This line ensures the component is treated as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { processUserAnswer } from "@/lib/processUserAnswer";
import "@/lib/result.css"; // Ensure this file contains the necessary CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head"; // Import Head for dynamic metadata

interface UserData {
  user_key: string;
  // Add other properties based on your user data structure
}

const baumannCategories = [
  ["O", "D"],
  ["S", "R"],
  ["P", "N"],
  ["W", "T"],
];

// ResultsPage Component
const ResultsPage: React.FC = () => {
  const router = useRouter();
  const { user_key } = useParams();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [processedResults, setProcessedResults] = useState<number[] | null>(
    null
  );
  const [baumannType, setBaumannType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kakao initialization code
  useEffect(() => {
    const kakaoJavascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoJavascriptKey);
      }
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
            const { processedData, baumannType } = await processUserAnswer(
              data[0]
            );
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

  if (loading) {
    return <div>Loading...</div>; // Consider using a spinner
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSuggestionButtonClick = () => {
    router.push(`/skintypes/${baumannType}`);
  };

  const handleRetryButtonClick = () => {
    localStorage.clear();
    router.push("/survey/user_info");
  };

  const handleShare = (sns: string) => {
    fn_sendFB(sns, baumannType);
  };

  return (
    <>
      <div className="survey-complete">
        <div className="title">
          <h1 className="survey-title">피부TI 테스트 결과</h1>
        </div>

        {baumannType && (
          <p className="survey-result">
            당신의 피부타입은{" "}
            <span className="baumann-type">{baumannType}</span>
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
                      className={
                        percent > 50 ? "left_percent" : "right_percent"
                      }
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
            onClick={() => handleShare("kakaotalk")}
          />
          <input
            type="button"
            id="btnTwitter"
            className="link-icon twitter"
            onClick={() => handleShare("twitter")}
          />
          <input
            type="button"
            id="btnFacebook"
            className="link-icon facebook"
            onClick={() => handleShare("facebook")}
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
    </>
  );
};

const fn_sendFB = (sns: string, baumannType: string | null) => {
  const thisUrl = document.URL;
  const snsTitle = "나의 피부 타입은?";
  const snsDescription = "피부TI 스무고개 테스트 하러가기";
  const imageUrl = `https://sigiskincare.vercel.app/_next/image?url=%2Fimg%2FskinType%2F${baumannType}.webp&w=384&q=75`;

  switch (sns) {
    case "facebook":
      window.open(
        `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          thisUrl
        )}`,
        "",
        "width=486,height=286"
      );
      break;
    case "twitter":
      window.open(
        `http://twitter.com/share?url=${encodeURIComponent(
          thisUrl
        )}&image=${encodeURIComponent(imageUrl)}`,
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
            description: snsDescription,
            imageUrl: imageUrl,
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

export default ResultsPage;


