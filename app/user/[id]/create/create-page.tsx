"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  IconArrowLeft,
  IconCancel,
  IconCheck,
  IconLoader2,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createPost } from "@/app/utility/action";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
const formSchema = z.object({
  title: z.string().min(1).max(30, {
    message: "Title must be between 1-30 characters",
  }),
  content: z
    .string()
    .min(1, { message: "Content should atleast have 1 character" })
    .max(2048, { message: "Content cannot be more than 2048 characters" }),
  image: z.string().optional(),
});

export const CreatePageForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const HandleGoingBack = () => {
    router.push("/");
  };

  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  // useEffect(() => {
  //   if (!isLoading) return;
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   setIsLoading(true);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [isLoading]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    createPost({
      title: value.title,
      content: value.content,
      images: [value.image ? value.image : ""],
      authorId: id as string,
    })
      .then((val) => {
        if (val.success) {
          toast({
            title: (
              <div className="flex justify-start items-center gap-1">
                <IconCheck width={16} height={16} />
                <span>Sucess</span>
              </div>
            ),
            description: "It might take some time for your post to appear",
            action: <ToastAction altText="...">Close</ToastAction>,
          });
        } else {
          toast({
            title: (
              <div className="flex justify-start items-center gap-1">
                <IconX width={16} height={16} />
                <span>Failure</span>
              </div>
            ),

            description: "Failed creating new post" + val.error,
            action: <ToastAction altText="...">Close</ToastAction>,
          });
        }
      })
      .catch((error) => {
        toast({
          title: (
            <div className="flex justify-start items-center gap-1">
              <IconX width={16} height={16} />
              <span>Failure</span>
            </div>
          ),

          description: "Failed creating new post" + error,
          action: <ToastAction altText="...">Close</ToastAction>,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const { id } = useParams();
  const [verified, setVerified] = useState<
    "loading" | "unverified" | "verified"
  >("loading");

  useEffect(() => {
    if (session.data?.user.id) {
      if (session.data.user.id === id) {
        setVerified("verified");
      } else {
        setVerified("unverified");
      }
    }
  }, [session.data?.user.id]);

  if (verified === "loading") {
    return <div>Loading</div>;
  } else if (verified === "unverified") {
    setTimeout(() => {
      router.push("/");
    }, 2000);
    return <div>Unauthorized, Redirecting...</div>;
  }
  return (
    <div
      className="w-[800px] h-full border-x-2 mx-[50px]  overflow-y-auto custom-scrollbar dark:custom-scrollbar-dark 
    p-5 
    "
    >
      <span className="text-xl">Create Post</span>
      <Separator className="my-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your Post Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your Post Content"
                    {...field}
                    className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      className="cursor-pointer"
                      {...field}
                      accept="image/jpeg, image/png ,image/jpg"
                    />
                    <Button
                      onClick={() => {
                        field.onChange("");
                      }}
                      className="absolute bottom-0 right-0"
                    >
                      <IconCancel />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Image is optional.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            {!isLoading ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button type="submit" disabled>
                <IconLoader2 className="w-4 h-4 animate-spin" />
                Submitting
              </Button>
            )}
            <Button
              variant={"outline"}
              type={"button"}
              onClick={HandleGoingBack}
            >
              <IconArrowLeft />
              Go Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
