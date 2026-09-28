import { useEffect, useState } from "react";
import FileBrowser from "../FileBrowser";

// TODO: same base URL / token lookup as Home.jsx -- worth pulling both
// into a shared api.js helper once you have more than two call sites.
const API_BASE = "http://localhost:5000";

export default function MyCloud() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/files?path=`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setFiles(data.files.map((f) => ({ ...f, id: f.path })));
        }
      })
      .catch((err) => console.error("Failed to load files:", err));
  }, []);

  return <FileBrowser files={files} />;
}