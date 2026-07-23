import { GeneratePlanResponse, PlanFormInput } from "./types";

// Change this if your backend runs somewhere other than localhost:8000
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
  
export async function generatePlan(
  input: PlanFormInput
): Promise<GeneratePlanResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/generate-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch (networkError) {
    // Most common cause for a beginner: FastAPI server isn't running,
    // or is running on a different port.
    throw new Error(
      "Could not reach the backend at " +
        API_BASE_URL +
        ". Make sure your FastAPI server (uvicorn) is running."
    );
  }

  if (!response.ok) {
    throw new Error(`Backend returned an error (status ${response.status}).`);
  }

  const data: GeneratePlanResponse = await response.json();
  return data;
}
