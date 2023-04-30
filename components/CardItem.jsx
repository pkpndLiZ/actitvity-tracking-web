import Image from "next/image";
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
          <ActivityDetail duration={props.duration} distance={props.distance} />
        </div>
      </div>
    </>
  );
}

function TextContent(props) {
  return (
    <div className="text-content">
      <ActivityDetail duration={props.duration} distance={props.distance} />
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
            src="/images/mock/person-biking-solid.svg"
            height={20}
            width={20}
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
            height={12}
            width={12}
            alt="duration-icon"
          />
        </div>
        <p>
          {props.duration.hr} hr {props.duration.min} min
        </p>
      </div>
      <div className="activity-tag">
        <button>Bicycle</button>
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
              src={props.profileImage}
              width={22}
              height={22}
              style={{ objectFit: "cover" }}
              alt="profile-icon"
            />
          </div>
          <p>{props.profileName}</p>
        </div>
        <Image
          id="card-config"
          src="/images/icons/config.svg"
          width={15}
          height={15}
          alt="heart-icon"
          className="bg-red"
        />
      </div>
      {props?.imageUrl ? (
        <ImageContent
          imageUrl={props.imageUrl}
          duration={props.duration}
          distance={props.distance}
        />
      ) : (
        <TextContent
          imageUrl={props.imageUrl}
          duration={props.duration}
          distance={props.distance}
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
          className="bg-black"
        />
        <Image
          src="/images/icons/comment.svg"
          width={12}
          height={12}
          alt="heart-icon"
          className="bg-black"
        />
        <Image
          src="/images/icons/share.svg"
          width={12}
          height={12}
          alt="heart-icon"
          className="bg-black "
        />
      </div>
    </div>
  );
}
