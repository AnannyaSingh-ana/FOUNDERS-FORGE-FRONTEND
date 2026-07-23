"use client";

import { useState } from "react";
import BusinessIdeaForm from "@/components/BusinessIdeaForm";
import LoadingState from "@/components/LoadingState";
import PlanResults from "@/components/PlanResults";
import { generatePlan } from "@/lib/api";
import { BusinessPlan, PlanFormInput } from "@/lib/types";

type ViewState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [plan, setPlan] = useState<BusinessPlan | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(input: PlanFormInput) {
    setViewState("loading");
    setErrorMessage(null);

    try {
      const response = await generatePlan(input);

      if (response.success && response.plan) {
        setPlan(response.plan);
        setViewState("success");
      } else {
        setErrorMessage(response.error || "The crew couldn't finish the plan. Please try again.");
        setViewState("error");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setViewState("error");
    }
  }

  function handleStartOver() {
    setPlan(null);
    setErrorMessage(null);
    setViewState("idle");
  }

  if (viewState === "loading") {
    return <LoadingState />;
  }

  if (viewState === "success" && plan) {
    return <PlanResults plan={plan} onStartOver={handleStartOver} />;
  }

  return (
    <BusinessIdeaForm
      onSubmit={handleSubmit}
      errorMessage={viewState === "error" ? errorMessage : null}
    />
  );
}
