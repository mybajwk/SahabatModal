"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Eye, X } from "lucide-react";
import { Article, articles } from "./dummyData";

interface PopupProps {
  article: Article;
  onClose: () => void;
}
const Popup: React.FC<PopupProps> = ({ article, onClose }) => {
  // Function to sanitize HTML (basic implementation, consider using a library for production)
  const sanitizeHTML = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerHTML;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{article.title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          <div className="relative h-80 mb-6">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex justify-between text-gray-400 text-sm mb-6">
            <span className="flex items-center">
              <Eye size={16} className="mr-1" />
              {article.views} views
            </span>
            <span className="flex items-center">
              <Heart size={16} className="mr-1" />
              {article.likes} likes
            </span>
          </div>
          <div
            className="text-white space-y-4 article-content"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(article.detail) }}
          />
        </div>
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d3748;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: bold;
        }
        .article-content h1 {
          font-size: 1.5em;
        }
        .article-content h2 {
          font-size: 1.3em;
        }
        .article-content h3 {
          font-size: 1.1em;
        }
        .article-content p {
          margin-bottom: 1em;
        }
        .article-content ul,
        .article-content ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }
        .article-content li {
          margin-bottom: 0.5em;
        }
        .article-content a {
          color: #63b3ed;
          text-decoration: underline;
        }
        .article-content a:hover {
          color: #4299e1;
        }
      `}</style>
    </div>
  );
};
function Page() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openPopup = (article: Article) => {
    console.log(article);
    setSelectedArticle(article);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 px-10">
      <h1 className="text-2xl font-bold text-white mb-6 border-b border-blue-500 pb-2">
        DAFTAR ARTIKEL
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105"
            onClick={() => openPopup(article)}
          >
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Article
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white mb-2">
                {article.title}
              </h2>
              <div className="flex justify-between text-gray-400 text-sm">
                <span className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  {article.views} views
                </span>
                <span className="flex items-center">
                  <Heart size={16} className="mr-1" />
                  {article.likes} likes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedArticle && (
        <Popup article={selectedArticle} onClose={closePopup} />
      )}
    </div>
  );
}

export default Page;
