// import { signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { FC, ReactNode } from "react";

// interface NavbarProps {
//   children: ReactNode;
// }

// const Navbar: FC<NavbarProps> = ({ children }) => {
//   const { data: sessionData } = useSession();
//   console.log(sessionData);

//   return (
//     <>
//       <div className="drawer  ">
//         <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content mb-5 flex flex-col ">
//           <div className="navbar w-full bg-base-100 px-5 xl:px-[110px]">
//             <div className="flex-none lg:hidden">
//               <label
//                 htmlFor="nav-drawer"
//                 className=" btn-ghost  btn-square btn"
//               >
//                 <svg
//                   className="swap-off fill-current"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="32"
//                   height="32"
//                   viewBox="0 0 512 512"
//                 >
//                   <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
//                 </svg>
//               </label>
//             </div>
//             <div className="mx-2 flex-1 px-2">
//               <Link href={"/"} className="btn-ghost btn">
//                 Answered
//               </Link>
//             </div>
//             <div className="hidden flex-none lg:block">
//               <ul className="menu menu-horizontal space-x-5">
//                 <li>
//                   <Link href={"/about-us"}>About us</Link>
//                 </li>
//                 <li>
//                   <Link href={"/questions"}>Questions</Link>
//                 </li>

//                 {!sessionData && (
//                   <li>
//                     <button onClick={() => signIn()} className="btn">
//                       Get started
//                     </button>
//                   </li>
//                 )}
//               </ul>
//             </div>
//             {sessionData && (
//               <div className="dropdown-end dropdown">
//                 <label
//                   tabIndex={0}
//                   className="btn-ghost btn-circle avatar btn ml-3"
//                 >
//                   <div className="flex w-10 items-center justify-center rounded-full border">
//                     <Image
//                       src={sessionData?.user?.image || ""}
//                       height={32}
//                       width={32}
//                       alt={"profile image"}
//                     />
//                   </div>
//                 </label>
//                 <ul
//                   tabIndex={0}
//                   className="dropdown-content menu rounded-box menu-compact mt-3   bg-base-100 p-2 shadow"
//                 >
//                   <li>
//                     <Link href={"/profile"} className="justify-between">
//                       Profile
//                       <span className="badge">New</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href={"/settings"} className="w-full">
//                       Settings
//                     </Link>
//                   </li>
//                   <li>
//                     <button onClick={() => signOut()} className="w-full">
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="mx-5 mt-5 bg-base-300 xl:px-[110px]">{children}</div>
//         </div>
//         <div className="drawer-side">
//           <label htmlFor="nav-drawer" className="drawer-overlay"></label>
//           <ul className="menu flex flex-col space-y-3 bg-base-100 p-4 min-[330px]:w-80">
//             <label htmlFor="nav-drawer" className="btn-ghost btn-square btn">
//               <svg
//                 className="swap-on fill-current"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="32"
//                 height="32"
//                 viewBox="0 0 512 512"
//               >
//                 <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
//               </svg>
//             </label>
//             <li>
//               <Link href="/about-us">About us</Link>
//             </li>
//             <li>
//               <Link href="/questions">Questions</Link>
//             </li>
//             {!sessionData && (
//               <li>
//                 <Link href="/" className="btn">
//                   Get started
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { FC } from "react";

const Navbar: FC = ({}) => {
  return <div>Navbar</div>;
};

export default Navbar;
