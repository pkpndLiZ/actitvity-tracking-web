import { CardItem } from "@/components/CardItem";
import { CardItemList } from "@/src/fixture/card-item-mock";
import { fetch } from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export function HomeContent() {
  const [success, setSuccess] = useState(false);

  const { data: posts, error } = useSWR("/posts", fetch);
  if (error) {
    return <div>Error loading activities: {error}</div>;
  }

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pl-[1rem] pt-[1rem] gap-1 columns-1 md:columns-2 xl:columns-3 2xl:columns-3 space-y-4 w-full h-fit">
      {posts.map((item, index) => {
        return (
          <CardItem
            key={index}
            username={item.username}
            // userImage={item.userImage}
            imageUrl={item.imageUrl}
            type={item.type}
            duration={item.duration}
            distance={item.distance}
            date={item.date}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </div>
  );
}
