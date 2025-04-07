import { AlertTriangle } from 'lucide-react';

export default function SignUpError() {
  return (
    <div className="flex items-center justify-center mt-6 mb-6 animate-slide-in px-4">
      <div className="flex items-center bg-red-600 max-w-md w-full rounded-lg px-4 py-3 shadow-lg gap-3">
        <AlertTriangle className="text-white w-6 h-6" />
        <p className="text-white text-sm sm:text-base font-semibold">
          There was an error signing up. Please try again later.
        </p>
      </div>
    </div>
  );
}
