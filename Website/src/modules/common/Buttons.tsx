import { MouseEventHandler } from "react";
export type ButtonColor = 'red' | 'indigo';

export const FormButton: React.FC<{ message: string, color: ButtonColor, onClick?: MouseEventHandler<HTMLInputElement>}> = ({ message, color, onClick }) => {
  return (
    <input
      type="submit"
      value={message}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
      onClick={onClick}
    />
  );
};

// TODO: Do this in a better way
export const ForExport = () => {
  return (
    <input
      type="submit"
      className={`bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`}
    />
  );
};