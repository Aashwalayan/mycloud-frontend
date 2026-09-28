import { HardDrive } from "lucide-react";

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

// TODO: replace usedBytes/totalBytes props with real numbers from your
// backend, e.g. a GET /storage route that reports disk usage on the NAS.
export default function StorageStatus({ usedBytes = 0, totalBytes = 1 }) {
  const percent = Math.min(100, (usedBytes / totalBytes) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 max-w-sm w-full">
      <div className="flex items-center gap-2 mb-3">
        <HardDrive className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Storage</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {formatBytes(usedBytes)} of {formatBytes(totalBytes)} used
      </p>
    </div>
  );
}