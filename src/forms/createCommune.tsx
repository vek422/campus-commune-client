import { Button } from "@/components/ui/button";
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
import { LoadingButton } from "@/components/ui/loadingButton";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCommune } from "@/hooks/api/useCreateCommune";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const initialValues = {
  name: "",
  description: "",
  profileImage: null, // We'll handle this as a file, not a string URL
};

const schema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
  description: z.string().min(10, "description must be at least 10 characters"),
  profileImage: z.any().optional(),
});

export const CreateCommuneForm: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  //TODO: Add a toast message for success and error
  const { createCommune, isLoading, error, data } = useCreateCommune();
  console.log("Error : ", error);
  const form = useForm<typeof initialValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: typeof initialValues) => {
    createCommune({
      ...values,
      createdBy: user?._id as string,
      profileUri: values?.profileImage?.name,
    });
  };
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImagePreview = (file: FileList | null) => {
    if (file && file[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file[0]);
    }
  };
  if (data != null && data?._id) {
    return <Navigate to={`/commune/${data._id}`} />;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commune Name</FormLabel>
              <FormControl>
                <Input placeholder="commune name" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <>
                  {imagePreview && (
                    <div className="w-96 h-40 border border-muted rounded-md relative">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-scale-down"
                      />
                      <Button
                        className="absolute top-0 right-0 cursor-pointer p-1"
                        variant={"ghost"}
                        onClick={() => {
                          setImagePreview(null);
                          form.setValue("profileImage", null);
                        }}
                      >
                        <X className="" />
                      </Button>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImagePreview(e.target.files);
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </>
              </FormControl>
              <FormDescription>
                Upload an image for the profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isLoading} type="submit" className="mt-10">
          Create Commune
        </LoadingButton>
      </form>
    </Form>
  );
};
