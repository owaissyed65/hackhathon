"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be 5 in characters",
    })
    .max(50),
  description: z
    .string()
    .min(100, {
      message: "Description must be 100 in characters",
    })
    .max(3000),
});

const DashboardForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values) => {
    try {
      const post = await axios.post("/api/dashboard", values);
      router.refresh();
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-4 md:pr-14 h-full">
      <div className="bg-white w-[70%] shadow-xl p-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center px-6 gap-8 mt-4 w-full "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-[80%] ">
                  <FormControl>
                    <Input
                      placeholder="Title..."
                      {...field}
                      className="outline-none border-none px-4 w-full ring-2 ring-offset-2 ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-[80%] ">
                  <FormControl>
                    <Textarea
                      placeholder="Whats in your mind..."
                      className="outline-none border-none px-4 w-full ring-2 ring-offset-2 ring-blue-500 h-16 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full ">
              <Button type="submit" className="mb-4" disabled={isLoading}>
                Publish Blog
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DashboardForm;
