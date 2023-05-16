import Image from "next/image";
import CardMenu from "./CardMenu";
// import "@/styles/card-item.module.css";

function ImageContent(props) {
  return (
    <>
      <div className="image-content">
        <div className="card-image">
          <Image
            src={props?.imageUrl}
            fill
            style={{ objectFit: "cover" }}
            alt="card-image"
          />
        </div>
        <div className="activity-detail-container">
          <ActivityDetail
            duration={props.duration}
            distance={props.distance}
            type={props.type}
          />
        </div>
      </div>
    </>
  );
}

function TextContent(props) {
  return (
    <div className="text-content">
      <ActivityDetail
        duration={props.duration}
        distance={props.distance}
        type={props.type}
      />
    </div>
  );
}

function ActivityDetail(props) {
  return (
    <div className="activity-detail">
      <div className="distance-duration">
        <div className="icon">
          <Image
            // className="icon"
            priority
            src="/images/icons/distance.svg"
            height={15}
            width={15}
            alt="distance-icon"
          />
        </div>
        <p>{props.distance} km</p>
      </div>
      <div className="distance-duration">
        <div className="icon">
          <Image
            // className="icon"
            priority
            src="/images/icons/clock-solid.svg"
            height={11}
            width={11}
            alt="duration-icon"
          />
        </div>
        <p>
          {props.duration?.hr} Hr {props.duration?.min} min
        </p>
      </div>
      <div className="activity-tag">
        <button>{props.type}</button>
      </div>
    </div>
  );
}

export function CardItem(props) {
  return (
    <div className="card-item">
      <div className="card-header">
        <div className="card-profile">
          <div className="profile-img">
            <Image
              src={props?.userImage ?? "/images/mock/astronaut.png"}
              width={22}
              height={22}
              style={{ objectFit: "cover" }}
              alt="profile-icon"
            />
          </div>
          <p>{props.username}</p>
        </div>
        {/* <Image
          id="card-config"
          src="/images/icons/config.svg"
          width={15}
          height={15}
          alt="heart-icon"
          className="bg-red"
        /> */}
        <CardMenu id="card-config" />
      </div>
      {props?.imageUrl ? (
        <ImageContent
          imageUrl={props.imageUrl}
          duration={props.duration}
          distance={props?.distance ?? "-"}
          type={props.type}
        />
      ) : (
        <TextContent
          imageUrl={props.imageUrl}
          duration={props.duration}
          distance={props?.distance ?? "-"}
          type={props.type}
        />
      )}

      <div className="post-content">
        <p className="date">{props.date}</p>
        <p className="title">{props.title}</p>
        <p className="description">{props.description}</p>
      </div>
      <div className="user-interact">
        <Image
          src="/images/icons/heart.svg"
          width={12}
          height={12}
          alt="heart-icon"
        />
        <Image
          src="/images/icons/comment.svg"
          width={12}
          height={12}
          alt="heart-icon"
        />
        <Image
          src="/images/icons/share.svg"
          width={12}
          height={12}
          alt="heart-icon"
        />
      </div>
    </div>
  );
}
