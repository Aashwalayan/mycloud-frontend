import { useState, useRef, useEffect } from "react";
import { Plus, FolderPlus, FileUp, FileText, Image as ImageIcon, X } from "lucide-react";

export default function NewMenu({ onCreateFolder, onUploadFiles }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerUpload = (accept) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept || "";
      fileInputRef.current.click();
    }
    setOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      onUploadFiles?.(Array.from(e.target.files));
    }
    e.target.value = "";
  };

  const handleCreateFolder = () => {
    // TODO: swap this window.prompt for a proper inline dialog when you
    // have time -- kept it quick for now since that was the priority.
    const name = window.prompt("Folder name");
    setOpen(false);
    if (name && name.trim()) {
      onCreateFolder?.(name.trim());
    }
  };

  const items = [
    { label: "New folder", icon: FolderPlus, action: handleCreateFolder },
    { label: "Upload file", icon: FileUp, action: () => triggerUpload() },
    { label: "Upload document", icon: FileText, action: () => triggerUpload(".pdf,.doc,.docx,.txt") },
    { label: "Upload image", icon: ImageIcon, action: () => triggerUpload("image/*") },
  ];

  return (
    <div ref={menuRef} className="relative inline-block">
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full pl-4 pr-5 py-2.5 text-sm font-medium text-gray-700 hover:shadow-md transition-shadow"
      >
        <span
          className="flex items-center justify-center transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          {open ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
        New
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20">
          {items.map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={action}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <Icon className="w-4 h-4 text-gray-500" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}