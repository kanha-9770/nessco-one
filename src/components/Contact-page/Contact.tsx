"use client";
import React from "react";
import Image from "next/image";
import { ContactItem } from "./types/constant";

interface MainLayoutProps{
  contactData:ContactItem
}

const Contact: React.FC<MainLayoutProps> = ({contactData}) => {

  const caption=contactData?.contact[0]?.caption
  const Contactcaption=contactData?.contact[0]?.Contactcaption
  const getintouch=contactData?.contact[0]?.getintouch
 const message=contactData?.contact[0]?.message
 const contact=contactData?.contact[0]?.contactInfo
 const imagesOnSide=contactData?.contact[0]?.imagesOnSide
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
<div className="mt-16 p-5 flex flex-col items-center justify-center">
      <p className="text-black font-medium text-sm">{caption}</p>
      <p className="text-[#483d73] font-semibold text-5xl">{Contactcaption}</p>
      </div>

      <div className="p-5 text-sm ">
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
             {getintouch}
            </button>
          </div>
          <p className="text-xs font-regular text-center mt-2">
          {message}
          </p>
        </form>
      </div>

      <div className="lg:p-2 p-8">
  <div className="bg-[#483d73] border flex lg:flex-row flex-col rounded-3xl p-5 lg:gap-5 gap-3">
    {contact.map((info: any, index: number) => (
      <div key={index} className="flex lg:w-[33%] relative">
        <Image
          src={info.image}
          alt={info.title}
          height={100}
          width={100}
          className="h-[2.5rem] w-[2.5rem]"
        />
        <div className="flex flex-col w-full">
          <h1 className="text-white font-semibold text-center lg:text-lg text-xs">{info.title}</h1>
          <p className="text-white font-regular lg:text-sm text-xs text-center mt-3">
            {info.description}
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
      {imagesOnSide.map((img: any, index: number) => (
        <div key={index} className={img.className} >
          <Image
            src={img.src}
            alt={img.alt}
            height={img.height}
            width={img.width}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Contact;
