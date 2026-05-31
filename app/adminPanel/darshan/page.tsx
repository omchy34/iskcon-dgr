"use client";

import { useState, useEffect, useRef } from "react";

interface DarshanFolder {
  _id: string;
  date: string;
  tithi?: string;
  cover: string;
  images: string[];
  createdAt: string;
}

export default function DarshanAdminPage() {
  const [folders, setFolders] = useState<DarshanFolder[]>([]);
  const [date, setDate] = useState("");
  const [tithi, setTithi] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  async function fetchFolders() {
    setLoading(true);
    const res = await fetch("/api/darshan");
    const data = await res.json();
    setFolders(data);
    setLoading(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  }

  function removeFile(index: number) {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  }

  async function handleSubmit() {
    setError("");
    setSuccess("");

    if (!date) return setError("Please enter a date.");
    if (selectedFiles.length === 0) return setError("Please select at least one image.");

    setUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload all files to ImageKit via server-side route
      const formData = new FormData();
      selectedFiles.forEach((f) => formData.append("files", f));

      setUploadProgress(30);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "Upload failed");
      }

      const results: { url: string; fileId: string }[] = await uploadRes.json();
      setUploadProgress(70);

      // 2. Save folder metadata to MongoDB
      const saveRes = await fetch("/api/darshan", {
        method: "POST",
        body: JSON.stringify({
          date,
          tithi,
          cover: results[0].url,
          images: results.map((f) => f.url),
          imageKitFileIds: results.map((f) => f.fileId),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.error || "Failed to save folder");
      }

      setUploadProgress(100);

      // Reset form
      setDate("");
      setTithi("");
      setSelectedFiles([]);
      setPreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess(`✅ "${date}" uploaded with ${results.length} images!`);
      fetchFolders();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function handleDelete(id: string, date: string) {
    if (!confirm(`Delete the "${date}" folder? This cannot be undone.`)) return;
    const res = await fetch(`/api/darshan/${id}`, { method: "DELETE" });
    if (res.ok) {
      setFolders((prev) => prev.filter((f) => f._id !== id));
    } else {
      alert("Failed to delete folder.");
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🛕 Darshan Upload</h1>
        <p className="text-gray-500 mt-1">Upload deity darshan photos by date</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Add New Darshan Folder</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 12 March 2026"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tithi <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Phalguna Purnima"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              value={tithi}
              onChange={(e) => setTithi(e.target.value)}
            />
          </div>
        </div>

        {/* File Upload Zone */}
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors mb-4"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-4xl mb-2">📸</div>
          <p className="text-gray-600 font-medium">Click to select images</p>
          <p className="text-gray-400 text-sm mt-1">JPG, PNG, WebP supported • Multiple files allowed</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {selectedFiles.length} image(s) selected — first image will be the cover
            </p>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {previews.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="" className="w-full aspect-square object-cover rounded-lg" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-white text-xs px-1 rounded">
                      Cover
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Uploading images...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          {uploading ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Uploading {uploadProgress}%...
            </>
          ) : (
            "Upload Folder"
          )}
        </button>
      </div>

      {/* Existing Folders */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          All Darshan Folders ({folders.length})
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : folders.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            No folders yet. Upload your first darshan above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div key={folder._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-44">
                  <img src={folder.cover} alt={folder.date} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm">{folder.date}</p>
                    {folder.tithi && <p className="text-amber-300 text-xs">{folder.tithi}</p>}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                    {folder.images.length} photos
                  </div>
                </div>
                <div className="p-4">
                  <button
                    onClick={() => handleDelete(folder._id, folder.date)}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 rounded-xl transition-colors"
                  >
                    Delete Folder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}