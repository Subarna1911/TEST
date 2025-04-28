import React from "react";
import image from '../assets/cat.jpg'

export default function MovieFetcher({title,releaseDate}) {

    const onFavoriteClick = ()=>{
        console.log("button is clicked");

    }
  return (
    <>
    <div className="bg-purple-600 flex max-w-sm m-auto justify-center items-center rounded-lg text-white flex-col relative mt-8 shadow-2xl ">
        <button onClick={onFavoriteClick} className="absolute top-4 right-4 font-bold text-2xl">🤍</button>
        <div>
          <img className="bg-center bg-no-repeat  bg-cover rounded-b-0 rounded-t-md shadow-2xl" src={image} alt={title} />
        </div>
        <div className="p-6 max-h-[200px] text-lg">
          <h1 className="font-bold text-lg uppercase">{title}</h1>
          <p className="font-medium">{releaseDate}</p>
        </div>
      </div>
    </>
  );
}
