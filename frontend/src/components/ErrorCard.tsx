import React from "react";

interface ErrorCardProps {
  errorMessage: string;
  // reset: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage }) => {
  return (
    <div className="flex justify-center">
      <div className="card min-w-sm max-w-sm border border-gray-100 transition-shadow shadow-lg hover:shadow-shadow-xl w-full bg-red-600 text-purple-50 rounded-md">
        <div className="flex items-center p-4">
          <div className="flex justify-center items-center w-96">
            <img
              src={"/error.svg"}
              alt="error_icon"
              className="fill-current h-32 w-32 text-yellow-300"
            />
          </div>
        </div>
        <div className="pt-4 pb-4 px-4">
          <div className="flex justify-center flex-col items-center">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ErrorCard };
