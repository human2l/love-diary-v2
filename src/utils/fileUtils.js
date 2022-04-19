const getFileExtensionName = (fileName) => {
  const splittedName = fileName.split(".");
  return splittedName[splittedName.length - 1];
};

const encodeBase64 = (data) => {
  return Buffer.from(data).toString("base64");
};
const decodeBase64 = (data) => {
  return Buffer.from(data, "base64").toString("ascii");
};

export { getFileExtensionName, encodeBase64, decodeBase64 };
