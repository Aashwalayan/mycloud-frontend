import useServerStatus from "../../hooks/useServerStatus";
import OfflineState from "../OfflineState";
import StorageStatus from "../StorageStatus";
import NewMenu from "../NewMenu";

// TODO: point this at your real backend base URL, and swap the
// localStorage key for wherever you actually store the JWT after login.
const API_BASE = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

export default function Home() {
  const isOnline = useServerStatus();

  if (isOnline === false) {
    return <OfflineState onRetry={() => window.location.reload()} />;
  }

  if (isOnline === null) {
    return <p className="text-sm text-gray-400 py-12 text-center">Checking your NAS…</p>;
  }

  const handleCreateFolder = async (name) => {
    try {
      const res = await fetch(`${API_BASE}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name, path: "" }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      // TODO: refresh the file list / show a success toast
    } catch (err) {
      console.error("Failed to create folder:", err);
    }
  };

  const handleUploadFiles = async (files) => {
    for (const file of files) {
      // "path" must be appended before "file" -- see the comment in upload.js
      const formData = new FormData();
      formData.append("path", "");
      formData.append("file", file);

      try {
        const res = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
          body: formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
      } catch (err) {
        console.error("Failed to upload file:", err);
      }
    }
    // TODO: refresh the file list / show a success toast
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* TODO: pass real usedBytes/totalBytes once you have a storage-stats endpoint */}
        <StorageStatus usedBytes={3.4 * 1024 ** 3} totalBytes={1 * 1024 ** 4} />
        <NewMenu onCreateFolder={handleCreateFolder} onUploadFiles={handleUploadFiles} />
      </div>
    </div>
  );
}