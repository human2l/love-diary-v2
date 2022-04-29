import * as filestack from "filestack-js";
import { useState } from "react";

const useFilestack = () => {
  const [fileMetadata, setFileMetadata] = useState(null);

  const clientOptions = {
    security: {
      policy: process.env.REACT_APP_FILESTACK_POLICY,
      signature: process.env.REACT_APP_FILESTACK_SIGNATURE,
    },
  };
  const client = filestack.init(
    process.env.REACT_APP_FILESTACK_API_KEY,
    clientOptions
  );

  const openFilePicker = async (fileUploadedCallback) => {
    setFileMetadata(null);
    const options = {
      fromSources: [
        "local_file_system",
        "imagesearch",
        "unsplash",
        "webcam",
        "video",
        "audio",
      ],
      onFileSelected: (file) => {
        // If you throw any error in this function it will reject the file selection.
        // The error message will be displayed to the user as an alert.
        if (file.size > 5 * 1000 * 1000) {
          throw new Error("File too big, select something smaller than 5MB");
        }
      },
      onUploadDone: (response) => {
        setFileMetadata(response.filesUploaded[0]);
        fileUploadedCallback();
      },
    };
    await client.picker(options).open();
    return;
  };

  const getAuthImgUrl = (handle) => {
    return `https://cdn.filestackcontent.com/${handle}?policy=${process.env.REACT_APP_FILESTACK_POLICY}&signature=${process.env.REACT_APP_FILESTACK_SIGNATURE}`;
  };

  return { fileMetadata, openFilePicker, getAuthImgUrl };
};
export default useFilestack;
