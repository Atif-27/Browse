import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateUploadState, uploadVideo } from "@/store/slices/videoSlice";
interface FieldsType {
  title: string;
  description: string;
  video: File;
  thumbnail: File;
}
const UploadVideo = () => {
  const [fields, setFields] = useState<FieldsType>({
    title: "",
    description: "",
    video: new File([], ""),
    thumbnail: new File([], ""),
  });
  const dispatch = useAppDispatch();
  const video = useAppSelector((state) => state.video);
  useEffect(() => {
    dispatch(updateUploadState());
  }, []);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.type === "file" && e.target.files?.length) {
      const file = e.target.files[0];
      setFields({ ...fields, [e.target.id]: file });

      return;
    }
    setFields({ ...fields, [e.target.id]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(uploadVideo(fields));
  }
  return (
    <section>
      <h1 className="text-4xl font-bold  text-light_orange">Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex h-full ">
          <div className="md:w-1/2">
            <div className="flex flex-col gap-5 mt-10 ">
              <Label htmlFor="title" className=" text-xl  ">
                Title
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter Video Title"
                className="max-w-2xl w-full rounded-3xl p-2 px-5 text-black"
                onChange={handleChange}
                value={fields.title}
              />
            </div>
            <div className="flex flex-col gap-5 mt-10">
              <Label htmlFor="description" className=" text-xl  ">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                className="max-w-2xl w-full rounded-3xl p-2 px-5 text-black"
                placeholder="Enter Video Description"
                onChange={handleChange}
                value={fields.description}
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className=" bg-green-200 w-full h-full relative ">
              <Input
                type="file"
                id="video"
                className="asolute top-0 left-0 w-full h-full opacity-0"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5 ">
          <Label htmlFor="thumbnail" className=" text-xl  ">
            Thumbnail
          </Label>
          <div className=" bg-green-200 w-full  relative max-w-xl  h-60 ">
            <Input
              type="file"
              id="thumbnail"
              className="asolute top-0 left-0 w-full h-full opacity-0"
              onChange={handleChange}
            />
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-primary_orange w-40 mt-10" type="submit">
              Upload
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                Uploading Your Video
              </AlertDialogTitle>
              <AlertDialogDescription className="flex pt-4 ">
                {fields.thumbnail.name && (
                  <img
                    src={URL.createObjectURL(fields.thumbnail)}
                    alt="thumbnail"
                    className=" w-48 aspect-video object-cover rounded-lg"
                  />
                )}
                <div className="ml-5">
                  <div className=" text-xl font-bold">{fields.title}</div>
                  <div>{fields.description}</div>
                  {video.uploading && <p>Uploading.....</p>}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction disabled={video.uploading}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </section>
  );
};

export default UploadVideo;
