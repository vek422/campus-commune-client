import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC, useEffect } from "react";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { LoadingButton } from "@/components/ui/loadingButton";
import { useLogin } from "@/hooks/api/useLogin";
import { useAppSelector } from "@/store/store";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const initialValues = {
  email: "",
  password: "",
};
const loginSchema = z.object({
  email: z.string().email("not a valid email"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export const LoginForm: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const form = useForm<typeof initialValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });
  const { login, isLoading, error } = useLogin();
  const onSubmit = (values: typeof initialValues) => {
    login(values);
  };
  useEffect(() => {
    if (error)
      toast({
        title: "Error While Logging",
        description: error,
        variant: "destructive",
      });
  }, [error, toast]);

  if (user) return <Navigate to="/" />;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isLoading} type="submit" className="w-full">
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};
