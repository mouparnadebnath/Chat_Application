import React from "react";
import SearchInput from "./SearchInput";
import Conversation from "./Conversation";
import Logout from "./Logout";
import useGetConversation from "../../../../api/getConversations";
import Skeleton from "../Skeleton";
export default function Sidebar() {
  const { loading, conversation } = useGetConversation();
  console.log(conversation);


  return (
    <div className="max-h-3/5 p-10  bg-green-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
      
      <SearchInput />
      <div className="divider"></div>
      <div className="overflow-y-auto max-h-56  ">
      {loading && <Skeleton/>}

        {!loading && conversation?.length !== 0 && (
          <>
          <ul>
            {conversation.map((conversations) => (
              <li key={conversations._id}>                
                <Conversation
                  key={conversations._id}
                  conversations={conversations}
                />
              </li>
            ))}
          </ul>
          </>
        )}
      </div>
      <Logout />
    </div>
  );
}
