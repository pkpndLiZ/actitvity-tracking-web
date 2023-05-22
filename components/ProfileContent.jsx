import React, { useState } from "react";
import { fetch } from "../src/axiosInstance";
import useSWR from "swr";
import { CardItem } from "@/components/CardItem";
import { FiEdit } from "react-icons/fi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { EditProfile } from "./EditProfile";
import Image from "next/image";

export default function Profile() {
  const [name, setName] = useState("John doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [uid, setUid] = useState("123456789");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [bmi, setBmi] = useState("24");
  const [gender, setGender] = useState("John doe");
  const [dob, setDob] = useState("24/06/1998");
  const [city, setCity] = useState("John doe");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "900px",
    bgcolor: "#1F2021",
    // border: "2px solid #000",
    // boxShadow: 24,
  };

  // const handleEditProfileClick = (EditProfileState) => {
  //   if (EditProfileState === true) {
  //     handleModalOpen();
  //   } else if (EditProfileState === false) {
  //     handleModalClose();
  //   }
  // };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const { data: posts, error } = useSWR("api/posts", fetch);
  if (error) {
    return <div>Error loading activities: {error}</div>;
  }

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-white py-8">Profile</h1>

          <button
            onClick={handleModalOpen}
            className=" text-purple-400 flex items-center border border-purple-400 rounded-md p-1 hover:text-gray-800 hover:border-gray-800 hover:bg-purple-400 duration-500"
          >
            <FiEdit size={30} />
            <p className="text-md pl-[6px]">Edit Profile</p>
          </button>
        </div>
        <div className="profile-section-container text-white py-4 border rounded-xl shadow-md h-full bg-black-800 px-2 max-w-[1140px] w-full mx-auto">
          <div className="profile-top-section h-1/2">
            <div className="top-section-container flex h-full ">
              <div className="top-left-section w-2/6 flex flex-col py-4 items-center justify-center border-r border-gray-700">
                <div className="left-img-container relative h-[180px] w-[180px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
                    className="absolute h-full w-full  rounded-full"
                    alt=""
                  />
                </div>
                <p className="py-4 w-full text-center text-xl">{name}</p>
              </div>
              <div className="top-right-container flex flex-col w-4/6">
                <div className="half-top-section h-1/2 flex flex-col justify-center gap-4 px-8 border-b border-gray-700">
                  <div className="flex">
                    <p className="font-bold">Email:</p>
                    <p className="px-4">{email}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">User Id:</p>
                    <p className="px-4">{uid}</p>
                  </div>
                </div>
                <div className="half-bot-section grid grid-cols-3 grid-rows-2 h-1/2 px-8">
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-lg">Weight</p>
                    <p>{weight}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-lg">height</p>
                    <p>{height}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-lg">BMI</p>
                    <p>{bmi}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-lg">Gender</p>
                    <p>{gender}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-lg">Date of birth</p>
                    <p>{dob}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-lg">City</p>
                    <p>{city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-bot-section h-1/2 ">
            <div className="w-full h-full mx-4 my-4 border-t  border-gray-700">
              <h2 className="text-xl font-bold my-4">Your Activity</h2>
              <div>
                <div className="pl-[1rem] pt-[1rem] gap-1 columns-1 md:columns-2 xl:columns-3 2xl:columns-3 space-y-4 w-full h-fit">
                  {posts.map((item, index) => {
                    return (
                      <CardItem
                        item={item}
                        key={index}
                        username={item.username}
                        // userImage={item.userImage}
                        imageUrl={item.imageUrl}
                        type={item.type}
                        duration={item.duration}
                        distance={item.distance}
                        date={item.date}
                        title={item.title}
                        description={item.description}
                      />
                    );
                  })}
                  {/* {CardItemList.map((item, index) => {
                    return (
                      <CardItem
                        key={index}
                        username={item.profileName}
                        // userImage={item.userImage}
                        imageUrl={item.imageUrl}
                        // type={item.type}
                        duration={item.duration}
                        distance={item.distance}
                        date={item.date}
                        title={item.title}
                        description={item.description}
                      />
                    );
                  })} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={modalIsOpen}
          onClose={handleModalClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...modalStyle }}>
            <EditProfile onClose={handleModalClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
