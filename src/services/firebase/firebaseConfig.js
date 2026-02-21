import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

let storageInstance = null;

export const initFirebase = async () => {
  if (storageInstance) return storageInstance;
  const res = await fetch("/api/firebaseConfig");
  const config = await res.json();
  const app = initializeApp(config);
  storageInstance = getStorage(app);
  return storageInstance;
};

export let storage = null;
