import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateThread } from "@/hooks/api/useCreateThread";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@/components/ui/loadingButton";
import { useAppSelector } from "@/store/store";

const initialValues = {
  title: "",
  content: "",
};

interface formValues {
  title: string;
  content: string;
  images?: FileList;
  videos?: FileList;
}

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.optional(
    z.string().min(10, "Content must be at least 10 characters")
  ),
  images: z.any().optional(),
  videos: z.any().optional(),
});

export function CreateThreadForm({ closeDialog }: { closeDialog: () => void }) {
  const { thread, createThread, isLoading } = useCreateThread();
  const { channelId, communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const onSubmit = (values: formValues) => {
    createThread({
      ...values,
      channelId: channelId as string,
      communeId: commune?._id as string,
    });
  };
  useEffect(() => {
    if (thread) {
      closeDialog();
    }
  }, [thread]);

  const [imagePreviews, setImagePreviews] = useState<string[] | null>(null);

  const handleImagePreview = (file: FileList | null) => {
    if (file && file.length > 0) {
      Array.from(file).forEach((f) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews((prev) => [
            ...(prev ?? []),
            e.target?.result as string,
          ]);
        };
        reader.readAsDataURL(f);
      });
    }
  };
  const form = useForm<formValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="border-none focus-visible:border-none focus-visible:ring-0 text-xl font-bold shadow-none"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Content</FormLabel> */}
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Content"
                  className="border-none focus-visible:ring-0 font-semibold text-sm shadow-none max-h-80"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <>
                  <div className="w-full max-h-24  flex gap-5 overflow-scroll">
                    {imagePreviews?.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="preview"
                        className="aspect-square h-24 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleImagePreview(e.target.files);
                    }}
                  />
                </>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton variant={"default"} type="submit" isLoading={isLoading}>
          Post
        </LoadingButton>
      </form>
    </Form>
  );
}
