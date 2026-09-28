import { WifiOff, RotateCw } from "lucide-react";

export default function OfflineState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <WifiOff className="w-7 h-7 text-gray-400" />
      </div>
      <h2 className="text-lg font-medium text-gray-800">Your NAS is offline</h2>
      <p className="text-sm text-gray-500 mt-1 max-w-xs">
        Turn on the machine running your server to access, upload, or manage your files.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        <RotateCw className="w-4 h-4" />
        Check again
      </button>
    </div>
  );
}