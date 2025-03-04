// src/components/MovieBlogCard.jsx
const MovieBlogCard = ({ title, description, image, date }) => {
    return (
      <div className="bg-black text-white p-10 rounded-lg border border-gray-700 shadow-lg flex items-center gap-10 w-[1100px] mx-auto">
        <img src={image} alt={title} className="w-72 h-48 object-cover rounded-md" />
        <div>
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-lg text-gray-300 mt-3">{description}</p>
          <p className="text-md text-gray-500 mt-5">{date}</p>
        </div>
      </div>
    );
  };
  
export default MovieBlogCard;
