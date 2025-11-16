'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconReload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ProductDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive" className="flex flex-col justify-start items-center">
        <AlertTitle className="flex items-center justify-center gap-2">
          <IconAlertCircle />
          Connection failed.
        </AlertTitle>
        <AlertDescription>
          <p>Check your network connection and try again.</p>
        </AlertDescription>
        <Button
          onClick={() => {
            window.location.reload()
            reset();
          }}
          variant="secondary"
        >
          <IconReload />
          Try Again
        </Button>
      </Alert>
    </div>
  );
}


