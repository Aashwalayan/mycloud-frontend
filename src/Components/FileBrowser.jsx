import { useMemo, useState } from "react";
import {
  Grid2X2,
  List,
  ArrowUpDown,
  Folder,
  FileText,
  Image as ImageIcon,
  File as FileIcon,
} from "lucide-react";

function fileIcon(type) {
  if (type === "folder") return Folder;
  if (type === "image") return ImageIcon;
  if (type === "document") return FileText;
  return FileIcon;
}

function formatBytes(bytes) {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

const SORT_OPTIONS = [
  { key: "name", label: "Name" },
  { key: "modifiedAt", label: "Date modified" },
  { key: "size", label: "Size" },
];

// Expects files as: { id, name, type: "folder" | "image" | "document" | "file", size, modifiedAt }
export default function FileBrowser({ files = [] }) {
  const [view, setView] = useState("grid");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const sortedFiles = useMemo(() => {
    const copy = [...files];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      if (sortKey === "modifiedAt") cmp = new Date(a.modifiedAt) - new Date(b.modifiedAt);
      if (sortKey === "size") cmp = (a.size || 0) - (b.size || 0);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [files, sortKey, sortDir]);

  const toggleSortDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                Sort by {opt.label}
              </option>
            ))}
          </select>
          <button
            onClick={toggleSortDir}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            title={sortDir === "asc" ? "Ascending" : "Descending"}
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-md ${view === "grid" ? "bg-white shadow-sm" : ""}`}
          >
            <Grid2X2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded-md ${view === "list" ? "bg-white shadow-sm" : ""}`}
          >
            <List className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {sortedFiles.length === 0 ? (
        <p className="text-sm text-gray-400 py-12 text-center">
          No files yet — upload something to get started.
        </p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedFiles.map((file) => {
            const Icon = fileIcon(file.type);
            return (
              <div
                key={file.id}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <Icon className="w-8 h-8 text-blue-500" />
                <span className="text-xs text-gray-700 text-center line-clamp-2">{file.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_100px] px-4 py-2 text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
            <span>Name</span>
            <span>Modified</span>
            <span>Size</span>
          </div>
          {sortedFiles.map((file) => {
            const Icon = fileIcon(file.type);
            return (
              <div
                key={file.id}
                className="grid grid-cols-[1fr_120px_100px] items-center px-4 py-2.5 text-sm hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
              >
                <span className="flex items-center gap-2 text-gray-700">
                  <Icon className="w-4 h-4 text-blue-500 shrink-0" />
                  {file.name}
                </span>
                <span className="text-gray-400 text-xs">
                  {file.modifiedAt ? new Date(file.modifiedAt).toLocaleDateString() : "—"}
                </span>
                <span className="text-gray-400 text-xs">{formatBytes(file.size)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}