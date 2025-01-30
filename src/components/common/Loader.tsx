const Loader = () => (
  <div className="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="w-full border border-gray-200 rounded-lg shadow-md p-4 bg-white animate-pulse">
        <div className="w-full h-40 bg-gray-300 animate-pulse mb-4 rounded-lg" />
        <div className="w-full h-6 bg-gray-300 animate-pulse mb-2 rounded-md" />
        <div className="w-1/2 h-6 bg-gray-300 animate-pulse mb-2 rounded-md" />
        <div className="w-1/4 h-6 bg-gray-300 animate-pulse rounded-md" />
      </div>
    ))}
  </div>
);

export default Loader;
