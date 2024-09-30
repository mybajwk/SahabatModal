import React from 'react';

// interface ArticleCardProps {
//   imageSrc: string;
//   title: string;
//   time: string;
//   likes: string;
// }

// const ArticleCard: React.FC<ArticleCardProps> =({ imageSrc, title, time, likes }) => (
//   <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 m-4">
//     {/* <img src={imageSrc} alt={title} className="w-40 h-40 object-cover rounded-lg mb-4" /> */}
//     <div className="text-sm text-gray-500">{time} - {likes} likes</div>
//     <h3 className="text-lg font-bold text-center mt-2">{title}</h3>
//   </div>
// );

const InspiringSection = () => {
    const articles = [
      {
        title: 'What Is the Role of Manufacturing in the Business Supply Chain?',
        imageSrc: '/artikel.png',
        time: '6 jam yang lalu',
        likes: '1200 likes',
      },
      {
        title: 'What Is the Role of Manufacturing in the Business Supply Chain?',
        imageSrc: '/artikel.png',
        time: '6 jam yang lalu',
        likes: '1200 likes',
      },
      {
        title: 'What Is the Role of Manufacturing in the Business Supply Chain?',
        imageSrc: '/artikel.png',
        time: '6 jam yang lalu',
        likes: '1200 likes',
      },
    ];
  
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold mb-12" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Inspiring The Future Insight For You
          </h2>
  
          {/* Create a grid layout for three articles in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.map((article, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                {/* <img src={article.imageSrc} alt={article.title} className="w-full h-40 object-cover rounded-md mb-4" /> */}
                <p className="text-gray-500 text-sm">{article.time} - {article.likes}</p>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              </div>
            ))}
          </div>
  
          {/* View All Button */}
          <div className="mt-6 -mb-20">
          <a href="#viewAll">
            {/* <img
              src="/button gradient-2.png" // Ensure the image is placed in the public folder or correct path
              alt="View All Artikel"
              className="mx-auto"
              style={{ width: '400px', height: 'auto' }} // Adjust the size of the button image if needed
            /> */}
          </a>
        </div>
        </div>
      </section>
    );
  };
  
  export default InspiringSection;