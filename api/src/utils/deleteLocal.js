import fs from "fs";

const deleteLocal = (localFilePath) => {
  try {
    fs.unlinkSync(localFilePath);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default deleteLocal;
