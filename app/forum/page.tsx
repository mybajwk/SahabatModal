"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FeedCard from "./FeedCard";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { FormattedForum } from "../utils/PostFeeds";

import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must not be empty.",
  }),
  description: z.string().min(1, {
    message: "Content must not be empty.",
  }),
  tags: z.union([
    z.string().min(1, { message: "At least 1 tag." }),
    z.array(z.string()).min(1, { message: "At least 1 tag." }),
  ]),
});

function ForumPage() {
  const { data: session, status } = useSession();

  const [forumData, setForumData] = useState<FormattedForum[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/forum");
        setForumData(response.data.data);
      } catch (error) {
        console.error("Error fetching forum data:", error);
      }
    };

    fetchData();
    toast({
      variant: "default",
      title: "Feeds posted",
    });
  }, []);

  console.log("session", session);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>; // You can replace this with a spinner or loading animation
  }

  // const router = useRouter();

  // if (!session) {
  //   router.refresh();
  //   router.push("/login");
  //   return null;
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const tags_list: string[] =
      typeof values.tags === "string"
        ? values.tags.split(",").map((tag) => tag.trim())
        : values.tags;

    await axios
      .post("/api/forum", {
        ...values,
        tags: tags_list,
      })
      .then(function (response) {
        setForumData(response.data.data);
        toast({
          variant: "default",
          title: "Feeds posted",
        });
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: "Fail to post",
        });
        console.log(error);
      });
  }

  return (
    <div className="bg-white min-h-screen w-full flex justify-center relative">
      <Dialog>
        <DialogTrigger className="fixed opacity-65 hover:opacity-100 bottom-5 right-5 bg-[#18D3A7] w-24 p-7 aspect-square rounded-full hover:cursor-pointer flex justify-center items-center">
          <FaPlus className="text-white w-full h-auto aspect-square" />
        </DialogTrigger>
        <DialogContent className="bg-white text-black font-lexend w-[90%] rounded-lg">
          <DialogHeader className="space-y-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogTitle>Post Feeds</DialogTitle>
                <DialogDescription className="flex flex-col space-y-3">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1 items-start">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1 items-start">
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1 items-start">
                          <FormLabel>Tags (Ex: Finance, Marketing)</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" className="bg-[#18D3A7]">
                      Post
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="w-[90%] p-4 space-y-5 flex-col items-center max-w-[600px]">
        <div className="flex flex-col space-y-2">
          {/* <SearchBar onSearchChange={setQuery} /> */}
          <Button>Filter</Button>
        </div>
        {forumData.map((item, index) => {
          return (
            <FeedCard
              key={index}
              date={item.date}
              avatarSrc={item.avatarSrc}
              authorName={item.authorName}
              username={item.username}
              title={item.title}
              content={item.content}
              tags={item.tags}
              comments={item.comments}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ForumPage;
