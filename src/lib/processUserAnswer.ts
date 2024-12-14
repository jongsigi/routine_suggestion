import { supabase } from "@/lib/supabase";

const numAnswer = 4; // Number of possible answers per question (e.g., 0 to 3)
const numQuestions = 20; // Total number of questions

// Function to fetch the weight matrix from the database
const fetchAnswerWeights = async (): Promise<number[][]> => {
  const { data, error } = await supabase
    .from("answer_weight")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(`Error fetching answer weights: ${error.message}`);
  }

  // Transform data into a matrix for calculations
  return data.map((row: any) => [
    row.Oily,
    row.Dry,
    row.Sensitive,
    row.Resistant,
    row.Pigmented,
    row.Non_Pigmented,
    row.Wrinkle,
    row.Tight,
  ]);
};

// Function to construct a binary list
const generateBinaryList = (
  answers: number[],
  method: "total" | "meta"
): number[] => {
  const binaryList = new Array(numQuestions * numAnswer).fill(0);

  answers.forEach((answer, questionIndex) => {
    if (method === "meta" && questionIndex % 5 !== 0) return; // Only every 5th question for "meta"
    const binaryIndex = questionIndex * numAnswer + answer;
    binaryList[binaryIndex] = 1; // Mark the specific index as 1
  });

  return binaryList;
};

// Function to calculate the Baumann type from matrix results
const calculateBaumannType = (result: number[]): string => {
  const baumannCategories = [
    ["O", "D"],
    ["S", "R"],
    ["P", "N"],
    ["W", "T"],
  ];

  const baumannTypeList = baumannCategories.map(([positive, negative], index) =>
    result[2 * index] > result[2 * index + 1] ? positive : negative
  );

  return baumannTypeList.join("");
};

// Function to perform the weighted matrix multiplication
const calculateAnswerMatrix = async (
  binaryList: number[],
  numAnswer: number
): Promise<{ result: number[]; baumannType: string }> => {
  const weightMatrix = await fetchAnswerWeights();

  const result = new Array(8).fill(0); // Predefine output length (8 categories)
  binaryList.forEach((binaryValue, binaryIndex) => {
    if (binaryValue === 1) {
      // Apply weights when binaryValue is 1
      weightMatrix[binaryIndex].forEach((weight, weightIndex) => {
        result[weightIndex] += weight;
      });
    }
  });

  const baumannType = calculateBaumannType(result);
  return { result, baumannType };
};

// Calculate percentages for the result
const calculatePercentages = (arr: number[]): number[] => {
  const percentages = [];
  for (let i = 0; i < arr.length - 1; i += 2) {
    const percentage = Math.round(
      (arr[i] / (arr[i] + arr[i + 1])) * 100
    );
    percentages.push(percentage);
  }
  return percentages;
};

const updateBaumannType = async (
  userKey: string,
  baumannType: string,
  column: string
): Promise<void> => {
  // Define columnMap with explicit types
  const columnMap: { [key in 'baumannType' | 'metaBaumannType']: string } = {
    baumannType: "baumann_type",
    metaBaumannType: "meta_baumann_type",
  };

  // Check if the column passed exists in the columnMap
  if (!(column in columnMap)) {
    throw new Error(`Invalid column name: ${column}`);
  }

  // Ensure column is a valid key of columnMap for proper dynamic key access
  const mappedColumn = columnMap[column as keyof typeof columnMap];

  // Perform the update
  const { data, error } = await supabase
    .from("user")
    .update({ [mappedColumn]: baumannType }) // using the validated mapped column name
    .eq("user_key", userKey);

  // Handle any error during the update
  if (error) {
    console.error("Error details:", error);
    throw new Error(`Error updating ${mappedColumn}: ${error.message}`);
  }
};


// Main processing function
export const processUserAnswer = async (userData: any) => {
  const userKey = userData.user_key;
  if (!userKey) throw new Error("User key is missing!");

  // Extract user answers
  const userAnswers: number[] = [];
  for (let i = 0; i < numQuestions; i++) {
    const answer = userData[`answer_${i}`];
    if (answer !== undefined) {
      userAnswers.push(answer);
    }
  }

  // Generate binary lists
  const binaryListUser = generateBinaryList(userAnswers, "total");
  const binaryListMeta = generateBinaryList(userAnswers, "meta");

  // Perform matrix calculations
  const { result: userResult, baumannType } = await calculateAnswerMatrix(
    binaryListUser,
    numAnswer
  );
  const { result: metaResult, baumannType: metaBaumannType } =
    await calculateAnswerMatrix(binaryListMeta, numAnswer);

  // Update the database
  await updateBaumannType(userKey, baumannType, "baumannType");
  await updateBaumannType(userKey, metaBaumannType, "metaBaumannType");

  // Return processed percentages
  const processedData = calculatePercentages(userResult);
  return { processedData, baumannType };
};
