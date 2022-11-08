import React, { MouseEventHandler } from 'react';
import { HeartStraight, CaretDown } from 'phosphor-react';
import { notifyUser } from '@utils/index';

type Props = {
  id?: string;
  text?: string;
  likes?: number;
  dislikes?: number;
  handleLikeIdea: Function;
  handleDisLikeIdea: Function;
};

function Idea({
  text,
  likes,
  dislikes,
  handleLikeIdea,
  handleDisLikeIdea,
}: Props) {
  return (
    <div
      id="ideaWrapper"
      className="bg-secondary rounded-md mb-4 p-2 sm:p-5 flex justify-between items-center"
    >
      <span className="sm:text-[30px]">{text}</span>
      <div className="flex justify-between items-center gap-2 sm:gap-4">
        {/* Up votes */}
        <span className="text-[10px] sm:text-[20px] text-slate-300 text-center ml-2 cursor-default select-none">
          {likes}
        </span>
        {/* Votedown button */}
        <button
          className="cursor-pointer p-1 sm:p-4 rounded-full
          hover:bg-[#38bff84a] focus-visible:bg-[#38bff84a] active:bg-[#38bff84a] outline-none"
          aria-label="dislike this idea"
          onClick={(e) => handleDisLikeIdea()}
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
          onClick={(e) => handleLikeIdea()}
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
