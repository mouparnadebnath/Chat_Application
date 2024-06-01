import React from "react";
import useConversation from "../../zustand/useConversation";
import useImg from "../../../../api/useImg";

export default function MessageContainer({ item }) {
  const { selectedConversation } = useConversation();
  const { imageUrl } = useImg();
  console.log(imageUrl)
  const me = JSON.parse(localStorage.getItem("user"));
  const chatClassName = item.sender_Id === me._id ? "chat-end" : "chat-start";
  const profilepic =
    item.sender_Id === me._id ? me.profilePic : selectedConversation.profilePic;
  const name =
    item.sender_Id === me._id ? me.fullName : selectedConversation.fullName;
  console.log("messages:", item);
  const timeString = item.createdAt;

  // Parse the UTC time string into a Date object
  const dateObject = new Date(timeString);

  // Extract hours (adjust for 12-hour format)
  let hours = dateObject.getHours();
  const isAm = hours < 12; // Flag for AM/PM

  // Convert to 12-hour format if necessary
  hours = hours % 12 || 12; // Convert to 12-hour clock (or 12 if 0)

  // Extract minutes and seconds with leading zero padding
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  // Format the time string in 12-hour format
  const formattedTime = `${hours}:${minutes} ${isAm ? "AM" : "PM"}`;

  return (
    <>
      <div className="mr-2  text-white">
        {item.message && (
          <div className={`chat ${chatClassName}`} key={item._id}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={profilepic} />
              </div>
            </div>
            <div className="chat-header">{name}</div>
            <div
              className="chat-bubble text-sm bg-purple-900  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 text-white"
              style={{ maxWidth: "80%" }}
            >
   {item.message.startsWith("data:image/") ? (
        <img src={item.message} width={"180rem"} height={"180rem"} />
      ) : (
        <p>{item.message}</p>
      )}            </div>
            <div className="chat-footer opacity-50 flex flex-row">
              <time className="text-xs opacity-50">{formattedTime}</time>
              {item.sender_Id === me._id && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    stroke="white"
                    strokeWidth={"2"}
                    class="bi bi-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}
       
      </div>
    </>
  );
}
