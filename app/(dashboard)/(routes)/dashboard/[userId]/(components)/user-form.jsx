"use client";

import ImageUpload from "@/components/image-upload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Must contain an image",
  }),
});
const UserForm = ({ userId, profile}) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: profile
      ? {
          imageUrl: profile.imageUrl,
        }
      : {
          imageUrl: "",
        },
  });
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values) {
    try {
      const res = await axios.post(`/api/dashboard/${userId}`, values);

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>
        <div className="w-full bg-white pb-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full grid grid-cols-2 pb-4"
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="col-span-2 pb-2">
                    <FormControl>
                      <ImageUpload
                        onChange={(url) => field.onChange(url)}
                        value={field.value}
                        onRemove={() => {
                          field.onChange("");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button disabled={isLoading} className="ml-4">Update</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
