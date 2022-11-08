import React, { useState, useEffect, useRef } from 'react';
import { Idea } from '@components/';

import '@styles/main.css';
import { notifyUser } from '@utils/index';
// firebase
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase-config';

type ideaFieldType = {
  text?: string | undefined;
  likes?: number;
  dislikes?: number;
};

type ideaType = {
  id: string;
  text?: string | undefined;
  likes: number;
  dislikes?: number;
};

type ideasType = ideaType[];

function App() {
  const [newIdea, setNewIdea] = useState<string>('');
  const [ideas, setIdeas] = useState<ideasType>([]);
  // make a reference to a collection in the database
  const ideasCollectionRef = collection(db, 'ideas');

  useEffect(() => {
    const getIdeas = async () => {
      const data = await getDocs(ideasCollectionRef);
      // Get the data and sort them to mek most liked at the top
      let ideas = data.docs
        .map((doc) => ({ id: doc.id, likes: doc.data().likes, ...doc.data() }))
        .sort((a, b) => b.likes - a.likes);

      setIdeas(ideas);
    };
    getIdeas();
  }, [ideas]);

  const handleAddNewIdea = async () => {
    if (newIdea.length == 0) return;
    setNewIdea(''); //empty input feild
    await addDoc(ideasCollectionRef, {
      text: newIdea,
      likes: 0,
      dislikes: 0,
    });
    notifyUser();
  };

  const handleLikesUpdate = async (
    operation: 'Inc' | 'Dec',
    idea: ideaType | undefined
  ) => {
    if (idea == undefined) return;

    const ideaDoc = doc(db, 'ideas', idea.id);
    const newFields: ideaFieldType = {
      text: idea.text,
      dislikes: idea.dislikes,
      likes: operation == 'Inc' ? idea.likes + 1 : idea.likes - 1,
    };

    await updateDoc(ideaDoc, newFields);
  };

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
          {ideas.map((idea) => (
            <Idea
              key={idea.id}
              text={idea.text}
              dislikes={idea.dislikes}
              likes={idea.likes}
              handleLikeIdea={() => handleLikesUpdate('Inc', idea)}
              handleDisLikeIdea={() => handleLikesUpdate('Dec', idea)}
            />
          ))}
        </div>
        <div className="fixed bottom-0 sm:bottom-7 left-0 right-0 p-3 max-w-[740px] m-auto">
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddNewIdea();
            }}
            className="flex flex-row flex-nowrap gap-2"
          >
            <input
              type="text"
              name="idea"
              id="ideaInput"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              aria-label="what is your idea"
              className="w-full bg-secondaryLight rounded-lg px-2 sm:px-5 py-4"
              placeholder="What is your idea.."
            />
            <button
              type="submit"
              className="text-white bg-accent hover:bg-slate-700 focus:bg-slate-700 outline-slate-200 outline-offset-4 rounded-lg px-5"
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

