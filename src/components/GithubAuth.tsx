"use client";

import * as React from "react";
import { Button } from "./ui/button"; // Assuming you use shadcn/ui
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

// It's good practice to use a dedicated icon component
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-2.34 5.66c-.3.56-.46.98-.46 1.43v1.36c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1.03c0-.39-.16-.78-.44-1.06A6.01 6.01 0 0 1 8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6z" />
  </svg>
);

const GitHubAuth: React.FC = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGitHub = async () => {
    setIsLoading(true);
    try {

      await signIn("github");
      toast.success("You are now signed in!");
    } catch (error) {
toast.error("something went wrong");
      console.error("Failed to initiate login with GitHub:", error);
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div {...props}>
      <Button
        variant="outline"
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGitHub}
        disabled={isLoading}
      >
        {isLoading ? null : <GitHubIcon className="mr-2 h-4 w-4" />}
        GitHub
      </Button>
    </div>
  );
};

export default GitHubAuth;
