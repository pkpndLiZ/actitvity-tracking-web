import { CardItem } from "@/components/CardItem";
import { CardItemList } from "@/src/fixture/card-item-mock";
import { fetch } from "../src/axiosInstance";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import UserProfile from "@/pages/profile";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

export function HomeContent() {
  const router = useRouter();
  const activity = router.query.activity;
  const { data: posts, error } = useSWR("api/posts", (path) => {
    return fetch(path + (activity ? `?activity=${activity}` : ""));
  });

  useEffect(() => {
    // console.log("Loading posts...");
    mutate("api/posts");
  }, [activity]);

  if (error) {
    return <div>Error loading activities: {error}</div>;
  }

  if (!posts) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Backdrop />
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="pl-[1rem] pt-[1rem] gap-1 columns-1 md:columns-2 xl:columns-3 2xl:columns-3 space-y-4 w-full h-fit">
      {posts.map((item, index) => {
        if (item.post_status === false) {
          return null;
        }
        return (
          <CardItem
            item={item}
            key={index}
            username={item.username}
            userImage={item.userImage}
            imageUrl={item.posts.imageUrl}
            type={item.posts.type}
            duration={item.posts.duration}
            distance={item.posts.distance}
            date={item.posts.date}
            title={item.posts.title}
            description={item.posts.description}
          />
        );
      })}
    </div>
  );
}
