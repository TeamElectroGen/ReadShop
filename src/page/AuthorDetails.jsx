"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

const AuthorDetails = () => {
  const [following, setFollowing] = useState(false);
  const [author, setAuthor] = useState(null);

  // Toggle follow/unfollow state
  const toggleFollow = () => {
    setFollowing(!following);
  };

  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1") 
      .then((response) => response.json())
      .then((data) => {
        // Map data to match our component's structure
        const mappedAuthor = {
          name: data.name,
          biography: `${data.name} is a renowned author based in ${data.address.city}.`,
          birthDate: "January 1, 1970", 
          birthPlace: `${data.address.city}, ${data.address.suite}`,
          nationality: "American", 
          image: "/assets/cover.jpg", 
          famousWorks: [
            { title: "The Journey of Life", description: "An exploration of the human experience." },
            { title: "Mysteries of the Universe", description: "A thrilling look into the unknown." },
          ],
          awards: ["Pulitzer Prize", "National Book Award"],
          socialMedia: {
            twitter: "https://twitter.com/authorprofile",
            linkedin: "https://linkedin.com/in/authorprofile",
          },
        };
        setAuthor(mappedAuthor);
      })
      .catch((error) => console.error("Error fetching author data:", error));
  }, []);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex items-start md:items-center">
          <Image
            src={author.image}
            alt={author.name}
            width={200}
            height={200}
            className="rounded-md shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-bold text-gray-800">{author.name}</h1>
            <p className="text-gray-600 mt-2">{author.biography}</p>
          </div>
        </div>
        <Button
          className={`mt-4 md:mt-0 rounded-lg px-6 py-2 text-lg font-semibold ${
            following
              ? "bg-red-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={toggleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      </div>

      {/* Author Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
          <ul className="mt-2 text-gray-600">
            <li><strong>Birth Date:</strong> {author.birthDate}</li>
            <li><strong>Birth Place:</strong> {author.birthPlace}</li>
            <li><strong>Nationality:</strong> {author.nationality}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Awards & Honors</h2>
          <ul className="mt-2 text-gray-600 list-disc list-inside">
            {author.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Famous Works */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Famous Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {author.famousWorks.map((work, index) => (
            <div key={index} className="bg-sky-50/40 rounded-lg shadow-lg shadow-black/10 backdrop-blur-md border border-white/30 p-6 ">
              <h3 className="text-xl font-bold text-gray-800">{work.title}</h3>
              <p className="mt-2 text-gray-600">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Connect with {author.name}</h2>
        <div className="flex space-x-6 mt-4">
          <a
            href={author.socialMedia.twitter}
            target="_blank"
            className="text-blue-600 hover:text-blue-800"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href={author.socialMedia.linkedin}
            target="_blank"
            className="text-blue-600 hover:text-blue-800"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
