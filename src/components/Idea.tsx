import React from 'react';
import { HeartStraight, CaretDown } from 'phosphor-react';
import { notifyUser } from '@utils/index';

type Props = {
  text: string;
  upVotes: number;
};

function Idea({ text, upVotes }: Props) {
  function handleLikeIdea() {
    notifyUser();
  }

  function handleDisLikeIdea() {
    notifyUser();
  }

  return (
    <div className="bg-secondary rounded-md p-2 sm:p-5 flex justify-between items-center">
      <span className="sm:text-[30px]">{text}</span>
      <div className="flex justify-between items-center gap-2 sm:gap-4">
        {/* Up votes */}
        <span className="text-[10px] sm:text-[20px] text-slate-300 text-center ml-2 cursor-default select-none">
          {upVotes}
        </span>
        {/* Votedown button */}
        <button
          className="cursor-pointer p-1 sm:p-4 rounded-full
          hover:bg-[#38bff84a] focus-visible:bg-[#38bff84a] active:bg-[#38bff84a] outline-none"
          aria-label="dislike this idea"
          onClick={handleDisLikeIdea}
        >
          <CaretDown
            className="sm:scale-150"
            size={20}
            color="#38bdf8"
            weight="light"
          />
        </button>
        {/* Like button */}
        <button
          className="cursor-pointer p-1 sm:p-4 rounded-full
          hover:bg-[#c01c2756] focus-visible:bg-[#c01c2756] active:bg-[#c01c2756] outline-none"
          aria-label="like this idea"
          onClick={handleLikeIdea}
        >
          <HeartStraight
            className="sm:scale-150"
            size={20}
            color="#c01c28"
            weight="light"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

export default Idea;
