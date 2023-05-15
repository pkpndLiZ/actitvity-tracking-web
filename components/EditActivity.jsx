import React, { useState } from "react";
import { useForm } from "react-hook-form";

export function EditActivity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onSubmit = (data) => {
    const newActivity = {
      imageUrl: imageUrl,
      title: data.title,
      type: data.activityType,
      date: data.date,
      description: data.description,
      duration: { hour: `${data.hours} hr`, minute: `${data.minutes} minute` },
      distance: `${data.distance}km`,
    };

    console.log(newActivity);
    reset();
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Activity</h3>
        <div className="image-container">
          <div>
            {imageUrl && (
              <img
                className="image-preview"
                src={imageUrl}
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
