
/**
 * Centralized error handling utility for the application
 */

import { toast } from "@/hooks/use-toast";

type ErrorOptions = {
  title?: string;
  duration?: number;
  showToast?: boolean;
  logToConsole?: boolean;
};

/**
 * Handle API errors in a consistent way throughout the application
 */
export const handleApiError = (
  error: Error | unknown,
  options: ErrorOptions = {}
) => {
  const {
    title = "Operation Failed",
    duration = 5000,
    showToast = true,
    logToConsole = true,
  } = options;

  // Extract error message
  const errorMessage = error instanceof Error 
    ? error.message 
    : (error as any)?.message || 'An unexpected error occurred';

  // Log to console for debugging
  if (logToConsole) {
    console.error("API error:", error);
  }

  // Show user-friendly toast
  if (showToast) {
    toast({
      title,
      description: errorMessage,
      variant: "destructive",
      duration,
    });
  }

  return { error, message: errorMessage };
};

/**
 * Try to execute an API call safely and handle errors
 */
export const trySafe = async <T>(
  apiCall: () => Promise<T>,
  options: ErrorOptions = {}
): Promise<{ data: T | null; error: Error | null }> => {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch (error) {
    handleApiError(error, options);
    return { data: null, error: error as Error };
  }
};
