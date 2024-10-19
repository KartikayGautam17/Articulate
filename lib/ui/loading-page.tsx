"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export const Loading = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress === 100) return;
    const temp_timeout = setTimeout(() => {
      setProgress(progress + 1);
    }, 50);
    return () => clearTimeout(temp_timeout);
  }, [progress]);
  return (
    <div>
      <Progress value={progress} className="w-[100px]" />
    </div>
  );
};
