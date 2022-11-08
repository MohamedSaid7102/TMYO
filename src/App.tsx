import React from 'react';
import { Idea } from '@components/';

import '@styles/main.css';
import { notifyUser } from '@utils/index';

function App() {
  function handleAddNewIdea() {
    notifyUser();
  }
  return (
    <div className="w-full max-w-4xl m-auto my-6 shadow-md sm:text-[200%]">
      <header
        className="text-white text-2xl text-center py-8 px-2
      sm:text-5xl"
      >
        <h1 className="sm:text-[60px]">Share your ideas..</h1>
      </header>
      <main className="max-w-[640px] m-auto mt-4">
        {/* Ideas */}
        <div className="px-2 sm:px-5 flex flex-col gap-4 pb-[10rem]">
          <Idea text="Masry" upVotes={4} />
          <Idea text="Hello world" upVotes={2} />
          <Idea text="Output" upVotes={10} />
          <Idea text="Hola" upVotes={4} />
          <Idea text="Masry" upVotes={4} />
          <Idea text="Hello world" upVotes={2} />
          <Idea text="Output" upVotes={10} />
          <Idea text="Hola" upVotes={4} />
          <Idea text="Masry" upVotes={4} />
          <Idea text="Hello world" upVotes={2} />
          <Idea text="Output" upVotes={10} />
          <Idea text="Hola" upVotes={4} />
          <Idea text="Masry" upVotes={4} />
          <Idea text="Hello world" upVotes={2} />
          <Idea text="Output" upVotes={10} />
          <Idea text="Hola" upVotes={4} />
        </div>
        <div className="fixed bottom-0 sm:bottom-7 left-0 right-0 p-3 max-w-[740px] m-auto">
          <form action="#!" className="flex flex-row flex-nowrap gap-2">
            <input
              type="text"
              name="idea"
              id="ideaInput"
              aria-label="what is your idea"
              className="w-full bg-secondaryLight rounded-lg px-2 sm:px-5 py-4"
              placeholder="What is your idea.."
            />
            <button
              type="submit"
              className="text-white bg-accent hover:bg-slate-700 focus:bg-slate-700 outline-slate-200 outline-offset-4 rounded-lg px-5"
              onClick={handleAddNewIdea}
            >
              Add
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;

