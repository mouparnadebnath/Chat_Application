import React, { useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../../../api/sendMessage";
import { GoFileMedia } from "react-icons/go";
import { IoMicOutline } from "react-icons/io5";
import useImg from "../../../../api/useImg";
import { ClipLoader } from 'react-spinners'; // Example loader
export default function MessageInput() {
  const imgRef = useRef(null);
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false)
  const { sendMessage } = useSendMessage();
  const { handleImageChange, imageUrl, setImageUrl } = useImg();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!message && !imageUrl) return;
    await sendMessage(message || imageUrl);
    setmessage("");
    setLoading(false)
    setImageUrl("");

    console.log(message);
  };

  return (
    <div className="z-10">
      {/* input */}
      <div className="flex ">
        <form
          onSubmit={handleSendMessage}
          className="input flex flex-row justify-stretch w-11/12   gap-2  bg-purple-200 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10 "
        >
            <input
              type="text"
              className="grow  h-10 p-4  placeholder-white text-white font-medium"
              placeholder="Messages"
              onChange={(e) => setmessage(e.target.value)}
              value={message}
            />

        </form>
        <div className="flex flex-row ">
            <GoFileMedia
              className="w-5 h-5 fill-white mr-3 mt-3 ml-2 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <input
              type="file"
              hidden
              ref={imgRef}
              onChange={handleImageChange}
            />

            <IoMicOutline className="w-6 h-6 stroke-white ml-1 mt-3 " />

          <button
            className="border-none rounded-3xl p-2 ml-2  bg-green-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30"
            type="submit"
          >
            <IoMdSend className="w-8 h-8 fill-white" />
          </button>
          </div>
        <dialog
          id="my_modal_3"
          className="modal"
          open={imageUrl}
          onClose={() => {
            setImageUrl("");
          }}
        >
          <div className="modal-box h-auto flex flex-col justify-center items-center">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <img src={imageUrl} className="w-96 mt-5 " />
            <button>
              {loading===true?<ClipLoader color="white" className="ml-96 mt-4"/>:
              <IoMdSend
                className="w-7 h-7 fill-white ml-96 mt-4 "
                onClick={handleSendMessage}
              />
              
              }

            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
