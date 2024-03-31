import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dqvzda5xi",
  api_key: "577326229591495",
  api_secret: "ntBAdKJ7bASNg48J6kBPqWxN2E4",
});

async function uploadFile(localFilePath) {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}

async function deleteFile(url) {
  try {
    function getPublicIdFromUrl(url) {
      const parts = url.split("/");
      const publicIdWithExtension = parts[parts.length - 1]; // Extract the last part of the URL
      const publicId = publicIdWithExtension.split(".")[0]; // Remove the file extension
      return publicId;
    }
    url = getPublicIdFromUrl(url);
    const response = await cloudinary.uploader.destroy(url, {
      resource_type: "image",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { uploadFile, deleteFile };
