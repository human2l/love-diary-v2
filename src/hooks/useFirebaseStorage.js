import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../services/firebase/firebaseConfig";

const useFirebaseStorage = () => {
  const [fileMetadata, setFileMetadata] = useState(null);

  // Helper to trigger file selection
  const selectFile = (accept = "image/*") => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error("No file selected"));
        }
      };
      input.click();
    });
  };

  const uploadFile = async (file, folder = "images") => {
    try {
      if (file.size > 5 * 1024 * 1024) {
         throw new Error("File too big, select something smaller than 5MB");
      }
      const timestamp = new Date().getTime();
      // Sanitize filename: remove all non-alphanumeric chars except dots
      // This prevents issues with spaces or special characters, and ensures the URL matches what we expect
      // We also prefix a timestamp to ensure uniqueness even if the sanitized name collides
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.]/g, "");
      const storageRef = ref(storage, `${folder}/${timestamp}_${sanitizedFilename}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const metadata = {
          handle: downloadURL, // Use URL as handle for compatibility
          filename: file.name,
          mimetype: file.type,
          size: file.size,
          source: "firebase"
      };
      
      setFileMetadata(metadata);
      return metadata;
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed: " + error.message);
      throw error;
    }
  };

  const openFilePicker = async (fileUploadedCallback) => {
    setFileMetadata(null);
    try {
        const file = await selectFile();
        const metadata = await uploadFile(file);
        if (fileUploadedCallback) {
            fileUploadedCallback(metadata);
        }
    } catch (error) {
        // Error handling already done in uploadFile or selectFile
    }
  };

  const openBackgroundImagePicker = async (fileUploadedCallback) => {
    setFileMetadata(null);
    try {
        const file = await selectFile();
        const metadata = await uploadFile(file, "backgrounds");
        if (fileUploadedCallback) {
            fileUploadedCallback(metadata);
        }
    } catch (error) {
        
    }
  };

  const openWishImagePicker = async (fileUploadedCallback) => {
      try {
        const file = await selectFile();
        if (file.size > 1 * 1024 * 1024) {
             throw new Error("File too big, select something smaller than 1MB");
        }
        const metadata = await uploadFile(file, "wishes");
         if (fileUploadedCallback) {
            fileUploadedCallback(metadata.handle);
        }
      } catch (error) {
          if (error.message.includes("smaller than 1MB")) {
             alert(error.message);
          }
      }
  };


  const getAuthImgUrl = (handle) => {
    if (!handle) return "";
    return handle;
  };

  const getBackgroundImgUrl = (handle, height, width) => {
    if (!handle) return "";
    return handle;
  };

  return {
    fileMetadata,
    openFilePicker,
    openBackgroundImagePicker,
    openWishImagePicker,
    getAuthImgUrl,
    getBackgroundImgUrl,
  };
};

export default useFirebaseStorage;
