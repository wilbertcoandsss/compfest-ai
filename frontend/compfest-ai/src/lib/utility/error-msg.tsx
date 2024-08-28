import { useState, useEffect } from 'react';

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const [displayError, setDisplayError] = useState<string | null>(error);
  const [fadeClass, setFadeClass] = useState<string>('');

  useEffect(() => {
    if (error) {
      // If there's an error, show it with the fade-up animation
      setDisplayError(error);
      setFadeClass('fade-up');
    } else {
      // If there's no error, start the fade-down animation
      setFadeClass('fade-down');

      // After the animation duration, hide the error message
      const timer = setTimeout(() => {
        setDisplayError(null);
      }, 500); // 500ms should match the animation duration

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`text-red-600 text-2xl ${fadeClass}`}>
      {displayError && displayError}
    </div>
  );
};

export default ErrorMessage;
