import useServerStatus from "../../hooks/useServerStatus";
import OfflineState from "../OfflineState";
import StorageStatus from "../StorageStatus";
import NewMenu from "../NewMenu";
import api from "../../api/axios";

export default function Home() {
  const isOnline = useServerStatus();

  if (isOnline === false) {
    return <OfflineState onRetry={() => window.location.reload()} />;
  }

  if (isOnline === null) {
    return (
      <p className="text-sm text-gray-400 py-12 text-center">
        Checking your NAS…
      </p>
    );
  }

  const handleCreateFolder = async (name) => {
    try {
      const response = await api.post("/folders", {
        name,
        path: "",
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // TODO: refresh the file list / show a success toast
    } catch (err) {
      console.error(
        "Failed to create folder:",
        err.response?.data?.message || err.message
      );
    }
  };

  const handleUploadFiles = async (files) => {
    for (const file of files) {
      const formData = new FormData();

      formData.append("path", "");
      formData.append("file", file);

      try {
        const response = await api.post("/upload", formData);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      } catch (err) {
        console.error(
          "Failed to upload file:",
          err.response?.data?.message || err.message
        );
      }
    }

    // TODO: refresh the file list / show a success toast
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <StorageStatus
          usedBytes={3.4 * 1024 ** 3}
          totalBytes={1 * 1024 ** 4}
        />

        <NewMenu
          onCreateFolder={handleCreateFolder}
          onUploadFiles={handleUploadFiles}
        />
      </div>
    </div>
  );
}