import { CardItem } from "@/components/CardItem";
// import { CreateActivity } from "./CreateActivity";

export function HomeContent() {
  return (
    <>
      <CardItem
        profileName="Abdula.raf"
        profileImage="/images/mock/man.png"
        // imageUrl="/images/mock/man.png"
        imageUrl={null}
        duration={{ hr: 4, min: 23 }}
        distance="4.6"
        date="07/03/2030"
        title="We Can Do It!"
        description="View this so good."
      />
      {/* <CreateActivity /> */}
    </>
  );
}
