export const getFileExtensionName = (fileName) => {
  const splittedName = fileName.split(".");
  return splittedName[splittedName.length - 1];
};
