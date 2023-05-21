import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import { axiosInstance } from "../src/axiosInstance";
import { getAuth } from "@firebase/auth";
import { app } from "../src/firebase";
import { mutate } from "swr";

export function EditProfile(props) {
  const { register, handleSubmit } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const auth = getAuth(app);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setImageFile(reader.result);
      setPreviewImage(reader.result);
    };
  };

  const onSubmit = async (data) => {
    const userInfo = {
      userId: auth.currentUser.uid,
      username: data.username,
      userImage: imageFile,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      gender: data.gender,
      city: data.city,
      height: data.height,
      weight: data.weight,
    };

    console.log(userInfo);
    axiosInstance
      .put(`api/users/${auth.currentUser.uid}`, userInfo)
      .then(async (response) => {
        setSuccess(true);
        console.log("response: ", response);
        await mutate(`api/users/${auth.currentUser.uid}`);
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
              {previewImage && (
                <img
                  className="rounded-full w-full h-full"
                  src={previewImage}
                  alt="Profile Preview"
                />
              )}
            </div>
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
              {...register("username", { required: true })}
            />
          </div>
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
              />
            </div>
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
              />
            </div>
            <div className="flex w-full items-center">
              <p className="w-6/12 py-3 text-xl font-semibold">Gender :</p>
              <select
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                {...register("gender", { required: true })}
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
              {...register("city", { required: true })}
            />
          </div>
          <div className="flex w-full gap-4 py-4">
            <div className="flex w-full items-center">
              <p className="w-4/12 py-3 text-xl font-semibold">Weight :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                placeholder="e.g. 70"
                type="number"
                {...register("weight", { required: true })}
              />
            </div>
            <div className="flex w-full items-center">
              <p className="w-4/12 py-3 text-xl font-semibold">Height :</p>
              <input
                className="text-[20px] w-full h-[40px] pl-2 text-white bg-[#403f3f] rounded-md border-[#292828] shadow-xl shadow-black"
                placeholder="e.g. 170"
                type="number"
                {...register("height", { required: true })}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className=" text-lg font-semibold text-black border border-green-900 flex w-[100px] my-8 py-2 bg-green-600 items-center rounded-md hover:bg-black hover:text-green-500 shadow-lg shadow-black"
          >
            <FaRegSave className="ml-2 mr-2" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
