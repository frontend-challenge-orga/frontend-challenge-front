import { useState } from "react";

export const useFormMessage = (message: string) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (errorMessage) {
    setErrorMessage(errorMessage);
  }

  if (successMessage) {
    setSuccessMessage(message);
  }
  return { errorMessage, setErrorMessage, successMessage };
};
