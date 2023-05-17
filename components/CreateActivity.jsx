import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/axiosInstance";
import { mutate } from "swr";

export function CreateActivity(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    const newActivity = {
      userId: "1123455667",
      username: "somngiNGuy",
      userImage: "myImg",
      type: data.activityType,
      imageUrl: imageFile,
      duration: { hr: data.hours, min: data.minutes },
      distance: data.distance,
      date: data.date,
      title: data.title,
      description: data.description,
    };

    console.log(newActivity);
    axiosInstance
      .post("/posts", newActivity)
      .then(async (response) => {
        setSuccess(true);
        console.log("response: ", response);
        await mutate("/posts");
        props.onClose();
        setPreviewImage(null);
        setImageFile(null);
      })
      .catch((error) => {
        setError(error.message);
        console.log("error: " + error.message);
      });
  };

  // async function getServerSideProps() {
  //   const { data } = await axiosInstance.post("/api/data");
  //   return { props: { data } };
  // }

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setImageFile(reader.result);
      setPreviewImage(reader.result);
    };
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Create Activity</h3>
        <div className="image-container">
          <div>
            {previewImage && (
              <img
                className="image-preview"
                src={previewImage}
                alt="Selected file"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </div>
          <label htmlFor="image">Choose an image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="title-container">
          <label htmlFor="activity-name">Title:</label>
          <input
            type="text"
            id="activity-title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
        </div>
        <div className="type-container">
          <label htmlFor="activity-type">Activity Type:</label>
          <select
            id="activity-type"
            placeholder="Choose an activity type"
            {...register("activityType", { required: true })}
          >
            <option value="">Select an activity type</option>
            <option value="Biking">Biking</option>
            <option value="Walking">Walking</option>
            <option value="Swimming">Swimming</option>
            <option value="Hiking">Hiking</option>
            <option value="Running">Running</option>
          </select>
          {errors.activityType && <span>This field is required</span>}
        </div>
        <div className="date-container">
          <label htmlFor="activity-date">Activity Date:</label>
          <input
            type="date"
            id="activity-date"
            {...register("date", { required: true })}
          />
          {errors.date && <span>This field is required</span>}
        </div>
        <div className="duration-container">
          <label htmlFor="activity-start-time">Duration:</label>
          <div className="hour-container">
            <select
              id="activity-hour"
              {...register("hours", { required: true })}
            >
              <option value="">hr</option>
              {Array.from(Array(13).keys()).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div className="minute-container">
            <select
              id="activity-minutes"
              {...register("minutes", { required: true })}
            >
              <option value="">min</option>
              {Array.from(Array(60).keys()).map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
          {errors.hours && <span>This field is required</span>}
          {errors.minutes && <span>This field is required</span>}
        </div>
        <div className="distance-container">
          <label htmlFor="distance">Distance(KM)</label>
          <input
            type="text"
            id="activity-distance"
            {...register("distance", {
              required: true,
              pattern: /^\d*\.?\d*$/,
            })}
          />
          {errors.distance && (
            <span>This field is required and should contain a number</span>
          )}
        </div>
        <div className="description-container">
          <label htmlFor="description">Description:</label>
          <textarea
            id="activity-description"
            {...register("description", { required: true })}
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <button
            className="submit-button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
