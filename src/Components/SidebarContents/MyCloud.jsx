import { useEffect, useState } from "react";
import FileBrowser from "../FileBrowser";
import api from "../../api/axios";

export default function MyCloud() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await api.get("/files", {
          params: {
            path: "",
          },
        });

        const data = response.data;

        if (data.success) {
          setFiles(
            data.files.map((file) => ({
              ...file,
              id: file.path,
            }))
          );
        }
      } catch (err) {
        console.error(
          "Failed to load files:",
          err.response?.data?.message || err.message
        );
      }
    };

    loadFiles();
  }, []);

  return <FileBrowser files={files} />;
}