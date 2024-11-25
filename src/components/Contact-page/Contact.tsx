"use client";
import React from "react";
import Image from "next/image";
import { ContactItem } from "./types/constant";

interface MainLayoutProps {
  contactData: ContactItem;
}

const Contact: React.FC<MainLayoutProps> = ({ contactData }) => {
  const caption = contactData?.contact[0]?.caption;
  const Contactcaption = contactData?.contact[0]?.Contactcaption;
  const message = contactData?.contact[0]?.message;
  const contact = contactData?.contact[0]?.contactInfo;
  const imagesOnSide = contactData?.contact[0]?.imagesOnSide;
  return (
    <div className="h-full bg-gray-100 items-center flex flex-col font-poppins relative">
      {/* Main content */}
      {/* <div className="mt-12 p-5">
        {content.mainContent.map((item: MainContentItem, index: number) => (
          <p
            key={index}
            className="font-poppins font-semibold lg:text-lg text-lg flex items-center justify-center w-full "
          >
            {item.textBeforeImage && <span>{item.textBeforeImage}</span>}
            {<span className="ml-1">{item.textHighlighted}</span>}
            <span className="h-[3rem] lg:w-[5rem] ml-1 lg:rounded-xl rounded-2xl">
              <Image
                src={item.image.src}
                height={item.image.height}
                width={item.image.width}
                alt={item.image.alt}
                className="lg:rounded-xl rounded-2xl lg:object-cover object-cover h-full w-full"
              />
            </span>
            
            {item.textAfterImage && <span className="text-[#483d73] ml-1 ">{item.textAfterImage}</span>}
            
          </p>
        ))}
      </div> */}
      <div className="mt-11 p-5 flex flex-col items-center justify-center">
        {/* <p className="text-black font-medium text-sm">{caption}</p> */}
        <p className="text-[#483d73] font-semibold text-5xl">
          {Contactcaption}
        </p>
      </div>

      <div className=" text-sm ">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                id="name"
                className="block w-[20rem] h-[4rem] border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                className="block  w-[20rem] h-[4rem]  border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="text"
                id="phone"
                className="block  w-[20rem] h-[4rem]  border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
                placeholder="Phone"
              />
            </div>
            <div>
              <input
                type="text"
                id="subject"
                className="block  w-[20rem] h-[4rem]  border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
                placeholder="Subject"
              />
            </div>
            <div className="md:col-span-2">
              <textarea
                id="message"
                className="block  w-full border-[1.75px] border-[#483d73] h-[6rem] rounded-xl shadow-sm p-2"
                placeholder="Message"
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="mt-5">
            <button
              aria-label="submit button"
              type="submit"
              className="w-full bg-[#483d73] text-white p-3 rounded-xl transition duration-200 font-bold"
            >
              GET IN TOUCH
            </button>
          </div>
          <p className="text-xs font-regular text-center mt-2">{message}</p>
        </form>
      </div>

      <div className="lg:p-2 p-8">
        <div className="bg-[#483d73] border flex lg:flex-row flex-col rounded-3xl p-5 lg:gap-5 gap-3">
          {contact?.map((info: any, index: number) => (
            <div key={index} className="flex lg:w-[33%] relative">
              <Image
                src={info?.image}
                alt={info?.title}
                height={100}
                width={100}
                className="h-[2.5rem] w-[2.5rem]"
              />
              <div className="flex flex-col w-full">
                <h1 className="text-white font-semibold text-center lg:text-lg text-xs">
                  {info?.title}
                </h1>
                <p className="text-white font-regular lg:text-sm text-xs text-center mt-3">
                  {info?.description}
                </p>
              </div>

              {/* Add vertical border between items, except after the last one */}
              {index < contact.length - 1 && (
                <div className="absolute -right-3 top-0 lg:h-[6rem] h-full border-r border-gray-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Render side images */}
      {imagesOnSide?.map((img: any, index: number) => (
        <div key={index} className={img?.className}>
          <Image
            src={img?.src}
            alt={img?.alt}
            height={img?.height}
            width={img?.width}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Contact;




// "use client";

// import { useState } from "react";
// import Image from "next/image";
// // import { IoIosArrowForward } from "react-icons/io";
// import styles from "./contact.module.css";
// import { contactContent } from "../Constants/contact/Contact";

// interface FormData {
//   SingleLine: string;
//   Email: string;
//   PhoneNumber_countrycode: string;
//   SingleLine1: string;
//   MultiLine: string;
// }



// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     SingleLine: "",
//     Email: "",
//     PhoneNumber_countrycode: "",
//     SingleLine1: "",
//     MultiLine: "",
//   });


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission with validation
//   };

//   return (
    
//     <section
//       className={`${styles.contact} lg:left-9 left-2 mt-[7rem] bottom-10 rounded-[2rem] bg-red-200`}
//     >
//       <div className={`${styles.contactshape}`}></div>
//       <div className="container mx-auto p-6">
//         <div className="flex flex-col lg:flex-row">
//           <div className="lg:w-1/2">
//             <p className="text-3xl font-poppins font-medium text-black mt-3">
//               {contactContent.heading}
//             </p>
//             <h1 className="text-3xl text-black font-poppins font-regular mt-3">
//               {contactContent.subheading}
//             </h1>
//             <div className="mt-8">
//               <div className="flex items-start mb-6">
//                 <Image
//                   src="https://res.cloudinary.com/dlti4o10e/image/upload/v1732005261/location_jqqcij.png"
//                   alt="Marker"
//                   width={80}
//                   height={80}
//                   className="w-10 h-10 mr-4 mt-10"
//                 />
//                 <div className="ml-2">
//                   <h2 className="text-xl font-medium font-poppins text-[#3a2a79] mb-1">
//                     {contactContent.office.title}
//                   </h2>
//                   <a
//                     href={contactContent.office.mapLink}
//                     className="text-black font-poppins font-regular text-sm"
//                   >
//                     {contactContent.office.address
//                       .split("\n")
//                       .map((line, index) => (
//                         <span key={index}>
//                           {line}
//                           <br />
//                         </span>
//                       ))}
//                   </a>
//                 </div>
//               </div>
//               <hr className="border-gray-400 border-[0.10rem] -ml-6 lg:w-[35rem] " />
//               <div className="flex items-start mb-6">
//                 <Image
//                   src="https://res.cloudinary.com/dlti4o10e/image/upload/v1732005262/email_htjgie.png"
//                   alt="Email"
//                   width={80}
//                   height={80}
//                   className="w-10 h-10 mr-4 mt-7"
//                 />
//                 <div className="">
//                   <h2 className="text-xl font-semibold font-poppins text-[#3a2a79] mt-5 mb-1 ml-2">
//                     {contactContent.email.title}
//                   </h2>
//                   <a
//                     href={contactContent.email.emailLink}
//                     className="text-black ml-2 text-sm font-regular font-poppins"
//                   >
//                     {contactContent.email.address}
//                   </a>
//                 </div>
//               </div>
//               <hr className="border-gray-400 border-[0.10rem] -ml-6 lg:w-[35rem]" />
//               <div className="flex items-start">
//                 <Image
//                   src="https://res.cloudinary.com/dlti4o10e/image/upload/v1732005262/call_pmtrk9.png"
//                   alt="Phone"
//                   width={80}
//                   height={80}
//                   className="w-10 h-10 mr-4 mt-10"
//                 />
//                 <div className="ml-2">
//                   <h2 className="text-xl font-medium font-poppins text-[#3a2a79] mt-3 mb-1 ">
//                     {contactContent.phone.title}
//                   </h2>
//                   {contactContent.phone.numbers.map((number, index) => (
//                     <a
//                       href={`tel:${number}`}
//                       className="text-black font-regular font-poppins text-sm"
//                       key={index}
//                     >
//                       {number}
//                       <br />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="lg:w-1/2 mt-10">
//             <form onSubmit={handleSubmit} className="bg-white p-8">
//               <div className="grid grid-cols-1 gap-4">
//                 {/* First row */}
//                 <div className="grid grid-cols-1 gap-4">
//                   <input
//                     type="text"
//                     name="SingleLine"
//                     value={formData.SingleLine}
//                     onChange={handleChange}
//                     placeholder={contactContent.form.placeholders.name}
//                     className="p-2  border-none rounded-xl h-[5rem] bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
//                   />
//                   <input
//                     type="text"
//                     name="Email"
//                     value={formData.Email}
//                     onChange={handleChange}
//                     placeholder={contactContent.form.placeholders.email}
//                     className="p-2 border-none rounded-xl bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
//                   />
//                 </div>

//                 {/* Second row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="PhoneNumber_countrycode"
//                     value={formData.PhoneNumber_countrycode}
//                     onChange={handleChange}
//                     placeholder={contactContent.form.placeholders.phone}
//                     className="p-2 border-none rounded-xl h-[5rem] bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
//                   />
//                   <input
//                     type="text"
//                     name="SingleLine1"
//                     value={formData.SingleLine1}
//                     onChange={handleChange}
//                     placeholder={contactContent.form.placeholders.subject}
//                     className="p-2 border-none rounded-xl bg-[#f5f5f5] placeholder-black placeholder-top font-poppins text-sm font-regular"
//                   />
//                 </div>

//                 {/* Third row */}
//                 <input
//                   type="text"
//                   name="MultiLine"
//                   value={formData.MultiLine}
//                   onChange={handleChange}
//                   placeholder={contactContent.form.placeholders.message}
//                   className="p-2 border-none rounded-xl w-full h-[10rem] bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
//                 />
//               </div>
//               <button
//                 aria-label="Send Message"
//                 type="submit"
//                 className="mt-6 text-xl flex items-center text-white py-4 px-9 rounded-xl bg-gradient-to-b from-[#171033] to-[#300675] transition"
//               >
//                 <p>{contactContent.form.buttonText}</p>

//                 {/* <IoIosArrowForward
//                   className="ml-2 text-[#300675] bg-white rounded-full p-1 "
//                   style={{ fontSize: "1.4rem" }}
//                 /> */}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;
