import React, { useState, useEffect } from 'react';
import useGetConversation from '../../../../api/getConversations';
import useConversation from '../../zustand/useConversation';
export default function SearchInput() {
  const [chat, setChat] = useState('');
  const [searchData, setSearchData] = useState([]);
  const { conversation } = useGetConversation();
  
const {setSelectedConversation}=useConversation()
  const getChats = (e) => {
    const searchChats = e.target.value.toLowerCase(); // Corrected: Use toLowerCase()
    setChat(searchChats);
    
  };

  useEffect(() => {
    if (chat) {
      const filteredChats = conversation.filter((item) =>
        item.fullName.toLowerCase().includes(chat)
      );
      setSearchData(filteredChats);
    } else {
      setSearchData([]); // Clear search results when chat is empty
    }
  }, [chat]);

  return (
    <div>
      <label
        className="input flex items-center gap-2 bg-purple-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 z-10"
      >
        <input
          type="text"
          className="grow xl:w-72 lg:w-64 md:w-52 h-10 p-4"
          placeholder="Search Chats"
          value={chat}
          onChange={getChats}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {chat && (
        <ul className=' z-20 absolute w-64 h-auto overflow-y-auto text-white gap-2 bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 max-h-60'>
          {searchData.map((item) => (
            <li key={item.id} onClick={()=>{setSelectedConversation(item);setChat('')}} className='cursor-pointer p-3 text-lg hover:bg-green-300  hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 hover:rounded-3xl'>
             <div >
            
             <div className='ml-5'>
              {item.fullName}
             </div>
             </div>
            <div className='divider m-0'></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
