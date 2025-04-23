
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InfoSection: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">How MedSpeak AI Works</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p className="text-muted-foreground italic">
          A seamless translation experience powered by advanced AI technology.
        </p>
      </CardContent>
    </Card>
  );
};
