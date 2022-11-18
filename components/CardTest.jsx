// import React from "react";
// import styled from "styled-components";

// const CardTest = () => {
//   return (
//     <Card>
//       <section className="section">
//         <h3 className="browseCat">Card Example</h3>
//         <div className="row">
//           <div className="col">
//             <div className="card">
//               <div className="card-side card-side-front card-side-front-1">
//                 <div className="card-picture card-picture-1">&nbsp;</div>
//                 <h4 className="card-heading">
//                   <span className="card-heading-span-1">Card Title</span>
//                 </h4>
//                 <div className="card-details">
//                   <ul>
//                     <li>List Item 1</li>
//                     <li>List Item 2</li>
//                     <li>List Item 3</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="card-side card-side-back card-side-back-1">
//                 <div className="card-cta">
//                   <div className="card-box">
//                     <div className="card-description">
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Sed, recusandae?
//                       </p>
//                     </div>
//                   </div>
//                   <a href="#" className="btn white-btn">
//                     btn
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <div className="card">
//               <div className="card-side card-side-front card-side-front-2">
//                 <div className="card-picture card-picture-2">&nbsp;</div>
//                 <h4 className="card-heading">
//                   <span className="card-heading-span-2">Card Title</span>
//                 </h4>
//                 <div className="card-details">
//                   <ul>
//                     <li>List Item 1</li>
//                     <li>List Item 2</li>
//                     <li>List Item 3</li>
//                     <li>List Item 4</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="card-side card-side-back card-side-back-2">
//                 <div className="card-cta">
//                   <div className="card-box">
//                     <div className="card-description">
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Reiciendis, perspiciatis.
//                       </p>
//                     </div>
//                   </div>
//                   <a href="#" className="btn white-btn">
//                     btn
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col">
//             <div className="card">
//               <div className="card-side card-side-front card-side-front-3">
//                 <div className="card-picture card-picture-3">&nbsp;</div>
//                 <h4 className="card-heading">
//                   <span className="card-heading-span-3">Card Title</span>
//                 </h4>
//                 <div className="card-details">
//                   <ul>
//                     <li>List Item 1</li>
//                     <li>List Item 2</li>
//                     <li>List Item 3</li>
//                     <li>List Item 4</li>
//                     <li>List Item 5</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="card-side card-side-back card-side-back-3">
//                 <div className="card-cta">
//                   <div className="card-box">
//                     <div className="card-description">
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Tempora, sint.
//                       </p>
//                     </div>
//                   </div>
//                   <a href="#" className="btn white-btn">
//                     btn
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Card>
//   );
// };

// const Card = styled.div`
//   .section {
//     margin-top: -20rem;
//     padding-top: 25rem;
//   }
//   .center-text {
//     text-align: center;
//   }

//   .row {
//     max-width: 95rem;
//     margin: 0 auto;
//   }
//   .row .col {
//     width: calc((100% - 2 * 5rem) / 3);
//   }

//   .row::after {
//     content: "";
//     display: table;
//     clear: both;
//   }

//   .row .col {
//     float: left;
//   }

//   .row .col:not(:last-child) {
//     margin-right: 3rem;
//   }

//   .card {
//     perspective: 150rem;
//     -moz-perspective: 150rem;
//     position: relative;
//     height: 40rem;
//   }

//   .card-side {
//     color: #fff;
//     font-size: 2rem;
//     height: 30rem;
//     transition: all 0.8s ease;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     backface-visibility: hidden;
//     border-radius: 3px;
//     overflow: hidden;
//     box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
//   }

//   .card-side-front {
//     background-color: #fff;
//   }

//   .card-side-back {
//     transform: rotateY(180deg);
//   }

//   .card-side-back-1 {
//     background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
//   }

//   .card-side-back-2 {
//     background-image: linear-gradient(315deg, #7c69f8 0%, #3c327b 74%);
//   }

//   .card-side-back-3 {
//     background-image: linear-gradient(147deg, #44b4f9 0%, #4d4855 74%);
//   }

//   .card:hover .card-side-front {
//     transform: rotateY(-180deg);
//   }

//   .card:hover .card-side-back {
//     transform: rotateY(0deg);
//   }

//   .card-picture {
//     background-size: cover;
//     background-position: center center;
//     height: 12rem;
//     background-blend-mode: soft-light;
//     -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
//     clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
//   }

//   .card-picture-1 {
//     background-color: #7f5a83;
//     background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
//   }

//   .card-picture-2 {
//     background-color: #7a7adb;
//     background-image: linear-gradient(315deg, #6047fd 0%, #4d32fc 74%);
//   }

//   .card-picture-3 {
//     background-color: #a399b2;
//     background-image: linear-gradient(147deg, #44b4f9 0%, #2482fa 74%);
//   }

//   .card-heading {
//     font-size: 2.8rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     text-align: right;
//     color: #fff;
//     position: absolute;
//     top: 2rem;
//     right: 2rem;
//     width: 70%;
//     line-height: 3.5rem;
//   }

//   .card-heading-span {
//     padding: 1rem 1.5rem;
//     -webkit-box-decoration-break: clone;
//     box-decoration-break: clone;
//   }

//   .card-heading-span-1 {
//     background-color: transparent;
//   }

//   .card-heading-span-2 {
//     background-color: transparent;
//   }

//   .card-heading-span-3 {
//     background-color: transparent;
//   }

//   .card-details {
//     padding: 1rem 3rem;
//     color: darkslategrey;
//   }

//   .card-details ul {
//     list-style: none;
//     width: 80%;
//     margin: 0 auto;
//   }

//   .card-details li {
//     text-align: center;
//     font-size: 1.5rem;
//     padding: 0.5rem;
//   }

//   .card-details li:not(:last-child) {
//     border-bottom: 1px solid #eee;
//   }

//   .card-cta {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 80%;
//     text-align: center;
//   }

//   .card-box {
//     text-align: center;
//   }

//   .card-description {
//     font-size: 1.8rem;
//     margin-bottom: 1.5rem;
//     text-transform: uppercase;
//   }

//   .btn:link,
//   .btn:visited {
//     text-transform: uppercase;
//     text-decoration: none;
//     padding: 1.5rem 4rem;
//     display: inline-block;
//     border-radius: 10rem;
//     transition: all 0.2s;
//     font-size: 1.6rem;
//     margin-top: 50px;
//   }

//   .btn:hover {
//     transform: translateY(-0.3rem);
//     box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.21);
//   }

//   .btn:active {
//     transform: translateY(-0.1rem);
//     box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.21);
//   }

//   .white-btn {
//     background-color: #fff;
//     color: #777;
//   }

//   @media (max-width: 900px) {
//     .row:not(:last-child) {
//       margin-bottom: 0;
//     }
//   }

//   @media (max-width: 900px) {
//     .row {
//       max-width: 100% !important;
//     }
//   }

//   @media (max-width: 900px) {
//     .row .col:not(:last-child) {
//       margin-right: 0;
//       margin-bottom: 3rem;
//     }
//   }

//   @media (max-width: 900px) {
//     .row .col {
//       width: 100% !important;
//     }
//   }

//   @media (max-width: 900px) {
//     .card {
//       height: auto;
//       border-radius: 3px;
//       background-color: #fff;
//       box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);

//       width: 100%;
//     }
//     .card-side {
//       height: auto;
//       position: relative;
//       box-shadow: none;
//     }
//     .card-side-back {
//       transform: rotateY(0);
//       clip-path: polygon(0 7%, 100% 0, 100% 100%, 0 100%);
//     }
//     .card:hover .card-side-front {
//       transform: rotateY(0);
//     }
//     .card .card-details {
//       padding: 1rem 3rem;
//     }
//     .card-cta {
//       position: relative;
//       top: 0%;
//       left: 0%;
//       transform: translate(0);
//       width: 100%;
//       padding: 7rem 4rem 4rem 4rem;
//     }
//     .card-box {
//       text-align: center;
//     }
//     .card-heading {
//       font-size: 75%;
//     }
//     .card-details li {
//       font-size: 50%;
//     }
//     .card-description {
//       font-size: 50%;
//     }
//     .btn:link,
//     .btn:visited {
//       text-transform: uppercase;
//       text-decoration: none;
//       padding: 1rem 2rem;
//       display: inline-block;
//       border-radius: 10rem;
//       transition: all 0.2s;
//       font-size: 1.6rem;
//       margin-top: 50px;
//     }
//   }
// `;

// export default CardTest;
