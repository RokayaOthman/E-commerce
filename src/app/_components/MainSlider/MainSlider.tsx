"use client";

import React from "react";
import img1 from "../../../Utilities/home-slider.png";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MainSlider() {
  const slides = [
    {
      title: "Fresh Products Delivered to your Door",
      desc: "Get 20% off your first order",
    },
    {
      title: "Premium Quality Guaranteed",
      desc: "Fresh from farm to your table",
    },
    {
      title: "Fast & Free Delivery",
      desc: "Same dat delivery availible",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] lg:h-[400px]">

              {/* ONE Background Image */}
              <Image
                src={img1}
                alt="background"
                fill
                className="object-cover"
              />

              {/* Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-green-500/70 to-green-300/40"></div>

              {/* Changing Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 text-white">
                <h2 className="text-2xl lg:text-4xl font-bold mb-3 max-w-xs lg:max-w-md leading-tight">
                  {slide.title}
                </h2>

                <p className="mb-4 text-sm lg:text-lg">
                  {slide.desc}
                </p>

                <div className="flex gap-3">
                  <button className="bg-white text-green-600 px-4 py-2 rounded">
                    Shop Now
                  </button>
                  <button className="border border-white px-4 py-2 rounded">
                    View Deals
                  </button>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}