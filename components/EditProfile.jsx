import React, { useState, useContext, use } from "react";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { axiosInstance } from "../src/axiosInstance";
import { getAuth } from "@firebase/auth";
import { app } from "../src/firebase";
import { UserContext } from "@/src/userContext";
import defaultImage from "../public/images/mock/astronaut.png";

export function EditProfile(props) {
  const { updateUserData, userData } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData?.userImage || null);
  const {
    username,
    firstName,
    lastName,
    birthDate,
    gender,
    city,
    weight,
    height,
  } = userData || {};

  const auth = getAuth(app);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageSizeError, setImageSizeError] = useState(false);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check the file size
    if (selectedFile.size > 10 * 1024 * 1024) {
      setImageSizeError(true);
      setImageFile(null);
      setPreviewImage(userData?.userImage || null);
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

  const onSubmit = async (data) => {
    let userInfo = {
      userId: auth.currentUser.uid,
      username: data.username,

      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      gender: data.gender,
      city: data.city,
      height: data.height,
      weight: data.weight,
    };

    if (imageFile) {
      userInfo = {
        ...userInfo,
        userImage: imageFile,
      };
    } else if (userData.userImage) {
      userInfo = {
        ...userInfo,
        userImage: userData.userImage,
      };
    }

    console.log(userInfo);
    axiosInstance
      .put(`api/users/${auth.currentUser.uid}`, userInfo)
      .then(async (response) => {
        setSuccess(true);
        console.log("response: ", response);
        await updateUserData();
        props.onClose();
      })
      .catch((error) => {
        setError(error.message);
        console.log("error: " + error.message);
      });
  };

  return (
    <div className=" w-full h-full flex justify-center">
      <div className="w-4/5 text-white">
        <h2 className="text-center text-[50px] font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
          <div className="flex flex-col items-center py-4">
            <div className="w-[200px] h-[200px]">
              {previewImage ? (
                <img
                  style={{ objectFit: "cover" }}
                  className="rounded-full h-full w-full"
                  src={previewImage}
                  alt="Profile Preview"
                />
              ) : (
                <img
                  style={{ objectFit: "cover" }}
                  className="rounded-full h-full w-full"
                  src={previewImage || defaultImage}
                  alt="Profile Preview"
                />
              )}
            </div>
            {imageSizeError && (
              <span className="text-red-500 text-sm">
                Image size is too large
              </span>
            )}
            <label className="text-xl py-4">Choose an image</label>
            <input
              id="imageUpload"
              type="file"
              onChange={handleImageChange}
              lang="en"
            />
          </div>
          <div className="flex items-center py-2">
            <p className=" w-3/12 py-3 text-xl font-semibold">Display Name :</p>
            <input
              className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
              placeholder="e.g. johndoe123"
              type="text"
              {...register("username", {
                required: true,
                minLength: 8,
                maxLength: 12,
              })}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm">
              Display name must be between 8 and 12 characters long.
            </p>
          )}
          <div className="flex w-full gap-4 py-2">
            <div className="flex w-full  items-center">
              <p className="w-6/12 py-3 text-xl font-semibold">First Name :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-lg shadow-black"
                placeholder="e.g. John"
                type="text"
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                defaultValue={firstName || ""}
              />
            </div>
            <div className="flex w-full items-center">
              <p className="w-6/12 py-3 text-xl font-semibold">Last Name :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                placeholder="e.g. Doe"
                type="text"
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                defaultValue={lastName || ""}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {errors.firstName || errors.lastName ? (
              <span className="text-red-500 text-sm">
                Your name or lastname must not contain number or symbol
              </span>
            ) : null}
          </div>
          <div className="flex w-full gap-4 py-2">
            <div className="flex w-full items-center">
              <p className="w-6/12 py-3 text-xl font-semibold">Birth Date :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 pr-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                placeholder="Birth Date"
                type="date"
                {...register("birthDate", { required: true })}
                lang="en"
                defaultValue={birthDate || ""}
              />
            </div>
            <div className="flex w-full items-center">
              <p className="w-6/12 py-3 text-xl font-semibold">Gender :</p>
              <select
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                {...register("gender", { required: true })}
                defaultValue={gender || ""}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Prefer not to answer</option>
              </select>
            </div>
          </div>
          <div className="flex items-center py-2">
            <p className=" w-1/12 py-3 text-xl font-semibold">City :</p>
            <input
              className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
              placeholder="e.g. Bangkok"
              type="text"
              {...register("city", { required: true, pattern: /^[A-Za-z]+$/i })}
              defaultValue={city || ""}
            />
          </div>
          <div>
            {errors.city || errors.lastName ? (
              <span className="text-red-500 text-sm">
                City must not contain number or symbol
              </span>
            ) : null}
          </div>
          <div className="flex w-full gap-4 py-4">
            <div className="flex w-full items-center">
              <p className="w-4/12 py-3 text-xl font-semibold">Weight :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                placeholder="e.g. 70"
                type="number"
                {...register("weight", { required: true })}
                defaultValue={weight || ""}
              />
            </div>
            <div className="flex w-full items-center">
              <p className="w-4/12 py-3 text-xl font-semibold">Height :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                placeholder="e.g. 170"
                type="number"
                {...register("height", { required: true })}
                defaultValue={height || ""}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className=" text-lg font-semibold text-black border border-green-900 flex w-[100px] my-8 py-2 bg-green-600 items-center rounded-md hover:bg-black hover:text-green-500 shadow-lg shadow-black"
            disabled={imageSizeError}
          >
            <FaRegSave className="ml-2 mr-2" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
