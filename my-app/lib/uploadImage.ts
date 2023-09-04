import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUpload = await storage.createFile(
    "64f0a6ef04a5f9c55cdb",
    ID.unique(),
    file
  );
  return fileUpload;
};
export default uploadImage;
