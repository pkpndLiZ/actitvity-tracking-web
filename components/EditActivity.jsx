import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../src/axiosInstance";
import { mutate } from "swr";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { UserContext } from "@/src/userContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function EditActivity(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const { userData } = useContext(UserContext);
  const [showImagePreview, setShowImagePreview] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const userId = localStorage.getItem("userId");
  const [imageSizeError, setImageSizeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existActivityImage, setExistActivityImage] = useState(
    props.item.userImage
  );

  const onSubmit = async (data) => {
    let newActivity = {
      userId: userId,
      username: userData?.username,
      userImage: userData?.userImage,
      type: data.activityType,
      duration: { hr: data.hours, min: data.minutes },
      distance: data.distance,
      date: data.date,
      title: data.title,
      description: data.description,
    };

    if (imageFile === null && existActivityImage === null) {
      newActivity = {
        ...newActivity,
        imageUrl: null,
      };
    } else if (props.item.posts.imageUrl) {
      newActivity = {
        ...newActivity,
        imageUrl: props.item.posts.imageUrl, // Use the existing image URL
      };
    } else if (imageFile) {
      newActivity = {
        ...newActivity,
        imageUrl: imageFile,
      };
    }

    setLoading(true);

    // console.log(newActivity);
    axiosInstance
      .put(`api/posts/${props.item.posts._id}`, newActivity)
      .then(async (response) => {
        setSuccess(true);
        // console.log("response: ", response);
        await mutate("api/posts");
        props.onClose();
        setPreviewImage(imageFile || props.item.imageUrl);
        setImageFile(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log("error: " + error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (props.item) {
      setValue("title", props.item.posts.title);
      setValue("activityType", props.item.posts.type);
      setValue("date", props.item.posts.date);
      setValue("hours", props.item.posts.duration.hr);
      setValue("minutes", props.item.posts.duration.min);
      setValue("distance", props.item.posts.distance);
      setValue("description", props.item.posts.description);

      if (!imageFile) {
        setPreviewImage(props.item.posts.imageUrl);
      }
    }
  }, [props.item, imageFile]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check the file size
    if (selectedFile.size > 10 * 1024 * 1024) {
      setImageSizeError(true);
      setImageFile(null);
      setPreviewImage(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setImageFile(reader.result);
      setPreviewImage(reader.result);
      setImageSizeError(false);
    };
  };

  const handleDeleteImage = (event) => {
    event.preventDefault();
    setPreviewImage(null);
    setImageFile(null);
    setShowImagePreview(false);
    setExistActivityImage(null);
  };

  return (
    <div className="form-container">
      <Backdrop open={loading} style={{ zIndex: 9999 }}>
        {/* You can customize the backdrop's content */}
        <CircularProgress />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Edit Activity</h3>
        <div className="image-container">
          <div>
            {showImagePreview && (previewImage || props.item.imageUrl) && (
              <div className="relative">
                <img
                  className="image-preview"
                  src={previewImage || props.item.imageUrl}
                  alt="Selected file"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                <div className="w-[35px] h-[35px] top-1 right-1 absolute">
                  <button
                    onClick={handleDeleteImage}
                    type="button"
                    className="flex items-center justify-center rounded-full w-full h-full bg-red-500 text-white"
                  >
                    <RxCross2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {imageSizeError && (
            <span className="text-red-500 text-sm">
              Image size is too large
            </span>
          )}
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
          <input type="text" id="activity-title" {...register("title")} />
          {errors.title && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
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
          {errors.activityType && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="date-container">
          <label htmlFor="activity-date">Activity Date:</label>
          <input
            type="date"
            id="activity-date"
            {...register("date", { required: true })}
          />
          {errors.date && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="duration-container">
          <label htmlFor="activity-start-time">Duration:</label>
          <div className="flex flex-col">
            <div className="flex gap-4">
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
            </div>
            <div>
              {errors.hours || errors.minutes ? (
                <span className="text-red-500 text-sm">
                  Hour and Minute are required
                </span>
              ) : null}
            </div>
          </div>
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
          <textarea id="activity-description" {...register("description")} />
          {errors.description && <span>This field is required</span>}
        </div>

        <div>
          <button
            className="submit-button"
            type="submit"
            onClick={handleSubmit}
            disabled={imageSizeError}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
