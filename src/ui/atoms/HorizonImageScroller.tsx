// // components/HorizontalScroll.tsx

// import { FC, useRef } from "react";

// const HorizontalScroll: FC = () => {
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="flex items-center">
//       <button
//         className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//         onClick={scrollLeft}
//       >
//         Left
//       </button>
//       <div
//         ref={scrollContainerRef}
//         className="flex overflow-x-auto space-x-4 w-full px-4"
//       >
//         <div className="flex-shrink-0 w-48 h-48 bg-gray-300 flex items-center justify-center">
//           Item 1
//         </div>
//         <div className="flex-shrink-0 w-48 h-48 bg-gray-400 flex items-center justify-center">
//           Item 2
//         </div>
//         <div className="flex-shrink-0 w-48 h-48 bg-gray-500 flex items-center justify-center">
//           Item 3
//         </div>
//         <div className="flex-shrink-0 w-48 h-48 bg-gray-600 flex items-center justify-center">
//           Item 4
//         </div>
//         <div className="flex-shrink-0 w-48 h-48 bg-gray-700 flex items-center justify-center">
//           Item 5
//         </div>
//       </div>
//       <button
//         className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//         onClick={scrollRight}
//       >
//         Right
//       </button>
//     </div>
//   );
// };

// export default HorizontalScroll;
