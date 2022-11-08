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
  const [ideas, setIdeas] = useState<ideasType>();
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
    console.log(`Adding new todo`);
    if (newIdea.length == 0) {
      console.log(`Empty todo`);

      return;
    }
    await addDoc(ideasCollectionRef, {
      text: newIdea,
      likes: 0,
      dislikes: 0,
    });
    console.log(`added to firebase`);
    setNewIdea(''); //empty input feild
    console.log(`empty input box`);
    notifyUser();
    console.log(`notify user`);
  };

  const handleLocalStorage = (operation: 'Inc' | 'Dec', id: string) => {
    const votedIdeas = 'votedIdeas';
    const delimiter = '|';

    let userVotedIdeas = localStorage.getItem(votedIdeas);

    if (operation == 'Inc') {
      // no votes yet
      if (userVotedIdeas == null) {
        localStorage.setItem(votedIdeas, id + delimiter);
        return;
      }
      // there is votes
      const newVotedIdeas = userVotedIdeas
        .split(delimiter)
        .concat(id)
        .join(delimiter);
      localStorage.setItem(votedIdeas, newVotedIdeas);
    } else {
      // incase of decrement
      // no votes yet
      if (userVotedIdeas == null) {
        return;
      }
      // there is votes
      const newVotedIdeas = userVotedIdeas
        .split(delimiter)
        .filter((voteId) => voteId != id)
        .join(delimiter);
      localStorage.setItem(votedIdeas, newVotedIdeas);
    }

    console.log(`Updated local storage`);
  };

  const didUserVotedForThisIdea = (
    operation: 'Inc' | 'Dec',
    id: string
  ): boolean => {
    const votedIdeas = 'votedIdeas';
    const delimiter = '|';

    let userVotedIdeas = localStorage.getItem(votedIdeas);

    if (userVotedIdeas == null && operation != 'Dec') return false;

    const idExistsInLocalStorage = userVotedIdeas
      ?.split(delimiter)
      .includes(id);

    if (operation == 'Inc' && idExistsInLocalStorage) return true;
    if (operation == 'Inc' && !idExistsInLocalStorage) return false;

    if (operation == 'Dec' && !idExistsInLocalStorage) return true;
    if (operation == 'Dec' && idExistsInLocalStorage) return false;

    return false;
  };

  const handleLikesUpdate = async (
    operation: 'Inc' | 'Dec',
    idea: ideaType | undefined
  ) => {
    console.log(`handle likes`);
    if (idea == undefined) {
      console.log(`ideas is undefined`);
      return;
    }

    if (didUserVotedForThisIdea(operation, idea.id)) {
      console.log(`You voted for that..!`);
      return;
    }

    const ideaDoc = doc(db, 'ideas', idea.id);
    const newFields: ideaFieldType = {
      text: idea.text,
      dislikes: idea.dislikes,
      likes: operation == 'Inc' ? idea.likes + 1 : idea.likes - 1,
    };

    await updateDoc(ideaDoc, newFields);
    console.log(`backend updated successfully`);

    // Update local storage
    handleLocalStorage(operation, idea.id);
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
          {ideas?.map((idea) => (
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
          <div className="flex flex-row flex-nowrap gap-2">
            <input
              type="text"
              name="idea"
              id="ideaInput"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              aria-label="what is your idea"
              className="w-full bg-secondaryLight rounded-lg px-2 sm:px-5 py-4"
              placeholder="What is your idea.."
              autoComplete="off"
            />
            <button
              type="submit"
              className="text-white bg-accent hover:bg-slate-700 focus:bg-slate-700 outline-slate-200 outline-offset-4 rounded-lg px-5"
              onClick={handleAddNewIdea}
            >
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

