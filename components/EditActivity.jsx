import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/axiosInstance";
import { mutate } from "swr";

export function EditActivity(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    let newActivity = {
      userId: "1123455667",
      username: "somngiNGuy",
      userImage: "myImg",
      type: data.activityType,
      duration: { hr: data.hours, min: data.minutes },
      distance: data.distance,
      date: data.date,
      title: data.title,
      description: data.description,
    };

    if (imageFile) {
      newActivity = {
        ...newActivity,
        imageUrl: imageFile,
      };
    } else if (props.item.imageUrl) {
      newActivity = {
        ...newActivity,
        imageUrl: props.item.imageUrl,
      };
    }

    console.log(newActivity);
    axiosInstance
      .put(`api/posts/${props.item._id}`, newActivity)
      .then(async (response) => {
        setSuccess(true);
        console.log("response: ", response);
        await mutate("api/posts");
        props.onClose();
        setPreviewImage(imageFile || props.item.imageUrl);
        setImageFile(null);
      })
      .catch((error) => {
        setError(error.message);
        console.log("error: " + error.message);
      });
  };

  useEffect(() => {
    if (props.item) {
      setValue("title", props.item.title);
      setValue("activityType", props.item.type);
      setValue("date", props.item.date);
      setValue("hours", props.item.duration.hr);
      setValue("minutes", props.item.duration.min);
      setValue("distance", props.item.distance);
      setValue("description", props.item.description);

      if (!imageFile) {
        setPreviewImage(props.item.imageUrl);
      }
    }
  }, [props.item, imageFile]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setImageFile(reader.result);
      setPreviewImage(reader.result); // Set the preview image to the selected image
    };
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Activity</h3>
        <div className="image-container">
          <div>
            {(previewImage || props.item.imageUrl) && (
              <img
                className="image-preview"
                src={previewImage || props.item.imageUrl}
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
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
