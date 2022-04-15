// import {Deta} from "deta";

const getDetaDB = (dbName) => {
  return {};
  // const deta = Deta(process.env.REACT_APP_DETA_SECRET);
  // return deta.Base(dbName);
};

const getDetaDrive = (driveName) => {
  return {};
  // const deta = Deta(process.env.REACT_APP_DETA_SECRET);
  // return deta.Drive("diary_photos");
};

export { getDetaDB, getDetaDrive };
