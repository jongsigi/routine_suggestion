import { supabase } from "@/lib/supabase"; // Import supabase instance

const numAnswer = 4; // Number of possible answers per question (0 to 3)

// Function to fetch answer weights
const fetchAnswerWeights = async (): Promise<number[][]> => {
  const { data, error } = await supabase
    .from("answer_weight")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Error fetching answer weights: ${error.message}`);
  }

  const weightMatrix: number[][] = data.map((row: any) => {
    return [
      row.Oily, // Should now be 0 or a valid value
      row.Dry,
      row.Sensitive,
      row.Resistant,
      row.Pigmented,
      row.Non_Pigmented,
      row.Wrinkle,
      row.Tight,
    ];
  });

  return weightMatrix;
};

// Function to convert matrix result to Baumann type
const calculateBaumannType = (result: number[]): string => {
  const baumannTypeList = [];
  const baumannCategories = [
    ["O", "D"],
    ["S", "R"],
    ["P", "N"],
    ["W", "T"],
  ];

  // Iterating over each pair (Oily-Dry, Sensitive-Resistant, etc.)
  for (let i = 0; i < result.length / 2; i++) {
    const firstValue = result[2 * i];
    const secondValue = result[2 * i + 1];

    if (firstValue > secondValue) {
      baumannTypeList.push(baumannCategories[i][0]); // First value dominates
    } else {
      baumannTypeList.push(baumannCategories[i][1]); // Second value dominates
    }
  }

  // Convert to string like "OSPN"
  return baumannTypeList.join("");
};

// Function to calculate percentages between pairs of numbers
const calculatePercentages = (arr: number[]): number[] => {
  const percentages: number[] = [];

  // Iterate through the list except for the last item
  for (let i = 0; i < arr.length - 1; i += 2) {
    const currentItem = arr[i];
    const nextItem = arr[i + 1];

    // Calculate the percentage, multiply by 100, and round to the nearest integer
    const percentage = Math.round((currentItem / (currentItem + nextItem)) * 100);
    percentages.push(percentage);
  }

  return percentages;
};

// Function to update the baumann_type in Supabase
const updateBaumannType = async (
  userKey: string,
  baumannType: string,
  column: string
): Promise<void> => {
  if (column === "baumannType") {
    const { data, error } = await supabase
      .from("user")
      .update({ baumann_type: baumannType })
      .eq("user_key", userKey);
  
    if (error) {
      console.error("Error details:", error);
      throw new Error(`Error updating baumann_type: ${error.message}`);
    }
  } else if (column === "metaBaumannType") {
    const { data, error } = await supabase
      .from("user")
      .update({ meta_baumann_type: baumannType }) // meta_baumann_type 업데이트
      .eq("user_key", userKey);
  
    if (error) {
      console.error("Error details:", error);
      throw new Error(`Error updating meta_baumann_type: ${error.message}`);
    }
  }
};

// Define types for user answers and result
type UserAnswers = number[];
type WeightMatrix = number[][];

// Define the return type for processUserAnswer
interface ProcessUserAnswerResult {
  processedData: number[]; // An array of processed data
  baumannType: string; // A string for the baumann type
}

// 바우만 타입 변환 중 반복 과정 함수화
async function calculateAnswerMatrix(
  userAnswers: UserAnswers,
  numAnswer: number
): Promise<{ result: number[]; baumannType: string }> {
  // Step 2: Convert userAnswers into a binary list
  const binaryList: number[] = [];
  userAnswers.forEach((answer) => {
    const binaryAnswer = new Array(numAnswer).fill(0);
    binaryAnswer[answer] = 1;
    binaryList.push(...binaryAnswer);
  });

  // Step 3: Fetch answer weights
  const weightMatrix: WeightMatrix = await fetchAnswerWeights();

  // Step 4: Perform matrix multiplication
  const result: number[] = new Array(8).fill(0);
  for (let i = 0; i < weightMatrix.length; i++) {
    for (let j = 0; j < weightMatrix[i].length; j++) {
      result[j] += binaryList[i] * weightMatrix[i][j];
    }
  }

  // Step 5: Calculate Baumann type based on result
  const baumannType = calculateBaumannType(result);

  // Return both result and baumannType
  return {
    result,
    baumannType,
  };
}

// Function to process user answers and update baumann_type
export const processUserAnswer = async (userData: any): Promise<ProcessUserAnswerResult> => {
  const userKey = userData.user_key;

  if (!userKey) {
    throw new Error("User key is missing!");
  }

  // Step 1: Extract user answers into an array
  const userAnswers: number[] = [];
  for (let i = 0; i < 20; i++) {
    const answer = userData[`answer_${i}`];
    if (answer !== undefined) {
      userAnswers.push(answer);
    }
  }

  // Meta Data를 위한 처리
  const metaUserAnswers: number[] = [];
  for (let i = 0; i < 20; i++) {
    if (i % 5 === 0) {
      const metaAnswer = userData[`answer_${i}`];
      if (metaAnswer !== undefined) {
        metaUserAnswers.push(metaAnswer);
      }
    }
  }
  
  // Calculate answer matrix and get both result and baumannType
  const { result, baumannType } = await calculateAnswerMatrix(
    userAnswers,
    numAnswer
  );

  // Note: you likely want to use a different set of answers for the meta calculation
  const { baumannType: metabaumannType } = await calculateAnswerMatrix(
    metaUserAnswers,
    numAnswer
  );

  const processedData: number[] = calculatePercentages(result);

  // Step 6 : Update Baumann type in the user table in Supabase
  await updateBaumannType(userKey, baumannType, "baumannType");
  await updateBaumannType(userKey, metabaumannType, "metaBaumannType");

  return { processedData, baumannType }; // Return the result of matrix multiplication
};
