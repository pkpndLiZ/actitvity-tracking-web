import { CardItem } from "@/components/CardItem";
import { CardItemList } from "@/src/fixture/card-item-mock";

export function HomeContent() {
  return (
    <div className="pl-[1rem] pt-[1rem] gap-1 columns-1 md:columns-2 xl:columns-3 2xl:columns-3 space-y-4 w-full h-fit">
      {CardItemList.map((item, index) => {
        return (
          <CardItem
            key={index}
            profileName={item.profileName}
            profileImage={item.profileImage}
            imageUrl={item.imageUrl}
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
