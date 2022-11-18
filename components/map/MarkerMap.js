import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { MdStar } from "react-icons/md";
import Link from "next/link";
import { PROJECT_LINK, VID } from "../../project-config";

const MarkerMap = ({ store }) => {
  console.log("store33", store);
  const [showInfo, setShowInfo] = useState(false);

  if (!store.properties.lng && !store.properties.lat) {
    return null;
  }
  return (
    <div className="w-auto h-auto">
      <Marker
        longitude={Number(store.properties.lng)}
        latitude={Number(store.properties.lat)}
        className="relative cursor-pointer"
      >
        <img
          style={{ cursor: "pointer" }}
          src="/marker.png"
          height={50}
          width={50}
          onClick={() => setShowInfo(true)}
          alt="marker"
        />
      </Marker>
      {showInfo && (
        <Popup
          longitude={Number(store.properties.lng)}
          latitude={Number(store.properties.lat)}
          onClose={() => setShowInfo(false)}
          closeOnClick={false}
          offsetTop={-30}
          className="z-50"
        >
          <div className="h-24 bg-gray-400 ">
            <img
              className="h-full w-full object-cover"
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT}/store/20180522154/assets/items/largeimages/${store.code}.jpg?tr=w-300,h-300,cm-pad_resize,bg-FFFFFF&w=384&q=75`}
              alt="image"
            />
          </div>
          <div className="flex flex-col w-full p-6">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-base font-bold " style={{ fontSize: 22 }}>
                {store.title}
              </h2>
              <p className="" style={{ color: "#444444" }}>
                {/* $ 44.34 */}
              </p>
            </div>
            <div
              className="flex items-center justify-start w-full mt-1"
              style={{ color: "#DC7863" }}
            >
              <MdStar className="mr-1" />
              <MdStar className="mr-1" />
              <MdStar className="mr-1" />
              <MdStar className="mr-1" />
              <MdStar className="mr-1" />
            </div>
            <p className="my-5 text-sm font-semibold">
              {store.properties.LineAddress1}
            </p>
            <Link
              href={`/store/${store.title.replace(/ /g, "-").toLowerCase()}`}
            >
              <button className="flex items-center justify-center w-64 h-4 mt-5 text-xs text-center button btn-primary">
                View Store Details
              </button>
            </Link>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default MarkerMap;
