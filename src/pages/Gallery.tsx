// import React, { useState } from 'react';

// type GalleryItem = {
//   id: number;
//   type: 'photo' | 'video';
//   title: string;
//   location: string;
//   url: string;
// };

// const galleryData: GalleryItem[] = [
//   {
//     id: 1,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953339/IMG-20250719-WA0030_s0ttpu.jpg',
//   },
//   {
//     id: 2,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Near Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752954083/VID-20250719-WA0011_jqjvfq.mp4',
//   },
 
// //   {
// //     id: 3,
// //     type: 'photo',
// //     title: 'House Construction',
// //     location: 'Chikmagalur',
// //     url: 'https://res.cloudinary.com/demo/image/upload/house.jpg',
// //   },
//   {
//     id: 4,
//     type: 'video',
//     title: 'Compound Wall Build',
//     location: 'Mysuru',
//     url: 'https://res.cloudinary.com/demo/video/upload/wall.mp4',
//   },
//     {
//     id: 5,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752954083/VID-20250719-WA0011_jqjvfq.mp4',
//   },
//      {
//     id: 6,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953752/VID-20250719-WA0009_hwqwap.mp4',
//   },
//     {
//     id: 7,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953695/VID-20250719-WA0008_pdgaav.mp4',
//   },
//     {
//     id: 8,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953685/VID-20250719-WA0002_e8pu3c.mp4',
//   },
//      {
//     id: 9,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953608/VID-20250719-WA0001_nvsy9o.mp4',
//   },
//       {
//     id: 10,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953608/VID-20250719-WA0003_x3hz4f.mp4',
//   },
//        {
//     id: 10,
//     type: 'video',
//     title: 'Fencing Project - Farm',
//     location: 'Doddaballapura',
//     url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953547/VID-20250719-WA0004_hr612n.mp4',
//   },
//    {
//     id: 11,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953366/IMG-20250719-WA0056_mjsaxy.jpg',
//   },
//     {
//     id: 12,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953340/IMG-20250719-WA0032_pdkbf7.jpg',
//   },
//   {
//     id: 13,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953311/IMG-20250719-WA0029_fugql0.jpg',
//   },
//     {
//     id: 14,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953299/IMG-20250719-WA0031_koqzs2.jpg',
//   },
//      {
//     id: 15,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952399/IMG-20250719-WA0035_dx43tf.jpg',
//   },
//      {
//     id: 16,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952323/IMG-20250719-WA0034_ac9h6s.jpg',
//   },
//    {
//     id: 17,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952200/IMG-20250719-WA0033_jd8nvd.jpg',
//   },
//    {
//     id: 18,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752951780/IMG-20250719-WA0027_ozdbrh.jpg',
//   },
//    {
//     id: 19,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752951759/IMG-20250719-WA0036_eeqsj8.jpg',
//   },
//    {
//     id: 20,
//     type: 'photo',
//     title: 'Fencing Project - Farm',
//     location: 'Tumkur',
//     url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952399/IMG-20250719-WA0035_dx43tf.jpg',
//   },
  
//];
  

// const Gallery = () => {
//   const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

//   const filteredData =
//     filter === 'all'
//       ? galleryData
//       : galleryData.filter((item) => item.type === filter);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Malleshwara Constructions – Project Gallery
//       </h1>

//       {/* Filter Tabs */}
//       <div className="flex justify-center gap-4 mb-8">
//         {['all', 'photo', 'video'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab as 'all' | 'photo' | 'video')}
//             className={`px-4 py-2 rounded-xl text-sm font-medium ${
//               filter === tab
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
//             }`}
//           >
//             {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredData.map((item) => (
//           <div
//             key={item.id}
//             className="relative rounded-xl overflow-hidden shadow-lg group"
//           >
//             {item.type === 'photo' ? (
//               <img
//                 src={item.url}
//                 alt={item.title}
//                 className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
//               />
//             ) : (
//               <video
//                 src={item.url}
//                 controls
//                 className="w-full h-60 object-cover"
//               />
//             )}

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 text-white p-4 flex flex-col justify-end">
//               <h2 className="text-lg font-semibold">{item.title}</h2>
//               <p className="text-sm mb-2">📍 {item.location}</p>
//               <a
//                 href={item.url}
//                 download
//                 className="bg-white text-black px-3 py-1 rounded w-fit text-sm hover:bg-gray-200"
//               >
//                 ⬇ Download
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;
import React, { useState } from 'react';

type GalleryItem = {
  id: number;
  type: 'photo' | 'video';
  title: string;
  location: string;
  url: string;
};

const galleryData: GalleryItem[] = [
   {
    id: 1,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953339/IMG-20250719-WA0030_s0ttpu.jpg',
  },
  {
    id: 2,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Near Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752954083/VID-20250719-WA0011_jqjvfq.mp4',
  },
 
//   {
//     id: 3,
//     type: 'photo',
//     title: 'House Construction',
//     location: 'Chikmagalur',
//     url: 'https://res.cloudinary.com/demo/image/upload/house.jpg',
//   },
//   {
//     id: 4,
//     type: 'video',
//     title: 'Compound Wall Build',
//     location: 'Mysuru',
//     url: 'https://res.cloudinary.com/demo/video/upload/wall.mp4',
//   },
    {
    id: 5,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752954083/VID-20250719-WA0011_jqjvfq.mp4',
  },
     {
    id: 6,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953752/VID-20250719-WA0009_hwqwap.mp4',
  },
    {
    id: 7,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953695/VID-20250719-WA0008_pdgaav.mp4',
  },
    {
    id: 8,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953685/VID-20250719-WA0002_e8pu3c.mp4',
  },
     {
    id: 9,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953608/VID-20250719-WA0001_nvsy9o.mp4',
  },
      {
    id: 10,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953608/VID-20250719-WA0003_x3hz4f.mp4',
  },
       {
    id: 10,
    type: 'video',
    title: 'Fencing Project - Farm',
    location: 'Doddaballapura',
    url: 'https://res.cloudinary.com/dwlb2meec/video/upload/v1752953547/VID-20250719-WA0004_hr612n.mp4',
  },
   {
    id: 11,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953366/IMG-20250719-WA0056_mjsaxy.jpg',
  },
    {
    id: 12,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953340/IMG-20250719-WA0032_pdkbf7.jpg',
  },
  {
    id: 13,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953311/IMG-20250719-WA0029_fugql0.jpg',
  },
    {
    id: 14,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752953299/IMG-20250719-WA0031_koqzs2.jpg',
  },
     {
    id: 15,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952399/IMG-20250719-WA0035_dx43tf.jpg',
  },
     {
    id: 16,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952323/IMG-20250719-WA0034_ac9h6s.jpg',
  },
   {
    id: 17,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952200/IMG-20250719-WA0033_jd8nvd.jpg',
  },
   {
    id: 18,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752951780/IMG-20250719-WA0027_ozdbrh.jpg',
  },
   {
    id: 19,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752951759/IMG-20250719-WA0036_eeqsj8.jpg',
  },
   {
    id: 20,
    type: 'photo',
    title: 'Fencing Project - Farm',
    location: 'Tumkur',
    url: 'https://res.cloudinary.com/dwlb2meec/image/upload/v1752952399/IMG-20250719-WA0035_dx43tf.jpg',
  },
];

const Gallery = () => {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredData =
    filter === 'all' ? galleryData : galleryData.filter((item) => item.type === filter);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Malleshwara Constructions – Project Gallery
      </h1>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {['all', 'photo', 'video'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as 'all' | 'photo' | 'video')}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              filter === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
          >
            {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden shadow-lg group"
          >
            {item.type === 'photo' ? (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-60 object-cover pointer-events-none"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 text-white p-4 flex flex-col justify-end">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm mb-2">📍 {item.location}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-200"
                >
                  🔍 View
                </button>
                <a
                  href={item.url}
                  download
                  className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-200"
                >
                  ⬇ Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl p-4">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-500"
            >
              &times;
            </button>

            <div className="bg-white rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-2">{selectedItem.title}</h2>
              <p className="text-sm text-gray-600 mb-4">📍 {selectedItem.location}</p>

              {selectedItem.type === 'photo' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

