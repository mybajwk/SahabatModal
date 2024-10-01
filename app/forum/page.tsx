"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FeedCard from "./FeedCard";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import prisma from "@/app/libs/prismadb";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
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

const dummyData = [
  {
    date: "2023-12-25",
    avatarSrc: "https://randomuser.me/api/portraits/men/75.jpg",
    authorName: "John Doe",
    username: "johndoe123",
    title: "My Christmas Experience",
    content:
      "This Christmas was amazing! I spent time with family and friends, ate delicious food, and watched Christmas movies.",
    tags: ["Christmas", "Family", "Friends", "Food", "Movies"],
    comments: [
      {
        author: "Jane Smith",
        username: "janesmith456",
        content: "Sounds like you had a wonderful Christmas!",
      },
      {
        author: "Michael Johnson",
        username: "michaeljohnson789",
        content:
          "I'm so jealous! I wish I could have spent Christmas with my family.",
      },
    ],
  },
  {
    date: "2024-01-15",
    avatarSrc: "https://randomuser.me/api/portraits/women/75.jpg",
    authorName: "Jane Smith",
    username: "janesmith456",
    title: "My New Year's Resolution",
    content:
      "I'm excited to share my New Year's resolution. I'm going to start working out more and eating healthier.",
    tags: ["New Year's Resolution", "Fitness", "Health", "Diet"],
    comments: [
      {
        author: "John Doe",
        username: "johndoe123",
        content: "That's a great resolution! I'm sure you'll achieve it.",
      },
      {
        author: "Emily Davis",
        username: "emilydavis101",
        content: "I'm rooting for you! Good luck with your new goals.",
      },
    ],
  },
  {
    date: "2024-02-10",
    avatarSrc: "https://randomuser.me/api/portraits/men/76.jpg",
    authorName: "Michael Johnson",
    username: "michaeljohnson789",
    title: "My Travel Experience",
    content:
      "I recently went on a trip to Bali and it was amazing! I loved the beaches, the food, and the culture.",
    tags: ["Travel", "Bali", "Beaches", "Food", "Culture"],
    comments: [
      {
        author: "David Wilson",
        username: "davidwilson124",
        content: "Bali sounds amazing! I've always wanted to go there.",
      },
      {
        author: "David Wilson",
        username: "davidwilson124",
        content: "Bali sounds amazing! I've always wanted to go there.",
      },
      {
        author: "Emily Davis",
        username: "emilydavis101",
        content: "I'm jealous! I need to plan a trip somewhere warm.",
      },
    ],
  },
  {
    date: "2024-03-20",
    avatarSrc: "https://randomuser.me/api/portraits/women/76.jpg",
    authorName: "Emily Davis",
    username: "emilydavis101",
    title: "My Favorite Book",
    content:
      "My favorite book is 'The Great Gatsby'. I love the characters, the story, and the setting.",
    tags: ["Books", "Literature", "The Great Gatsby", "Fiction"],
    comments: [
      {
        author: "Jane Smith",
        username: "janesmith456",
        content:
          "I've never read 'The Great Gatsby'. I should definitely check it out.",
      },
      {
        author: "Michael Johnson",
        username: "michaeljohnson789",
        content:
          "I've read 'The Great Gatsby' a few times. It's one of my favorite books too.",
      },
    ],
  },
  {
    date: "2024-04-05",
    avatarSrc: "https://randomuser.me/api/portraits/men/77.jpg",
    authorName: "David Wilson",
    username: "davidwilson124",
    title: "My New Hobby",
    content:
      "I recently started learning how to play the guitar and I'm really enjoying it. It's a great way to relax and have fun.",
    tags: ["Hobbies", "Music", "Guitar", "Learning"],
    comments: [
      {
        author: "John Doe",
        username: "johndoe123",
        content:
          "That's great! Learning a new instrument is a great way to challenge yourself.",
      },
      {
        author: "Jane Smith",
        username: "janesmith456",
        content:
          "I've always wanted to learn how to play the guitar. Maybe I should give it a try.",
      },
    ],
  },
];

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must not be empty.",
  }),
  content: z.string().min(1, {
    message: "Content must not be empty.",
  }),
  tags: z.string().min(1, {
    message: "At least 1 tag.",
  }),
});

function ForumPage() {
  const { data: session, status } = useSession();

  console.log("session", session);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>; // You can replace this with a spinner or loading animation
  }

  const router = useRouter();

  if (!session) {
    router.refresh();
    router.push("/login");
    return null;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                      name="content"
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
        {dummyData.map((item, index) => {
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
