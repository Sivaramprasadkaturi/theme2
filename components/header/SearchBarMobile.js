import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MdSearch, MdCancel } from "react-icons/md";

import { useRouter } from "next/router";

const VoiceSearchNoSSR = dynamic(() => import("./VoiceSearch"), { ssr: false });

export default function SearchBarMobile() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  return (
    <div className={`icon-container searchIcon searchMobileContainer`}>
      <div className={`icon-wrapper iconWrapper`}>
        <React.Fragment>
          <MdCancel
            onClick={() => setKeyword("")}
            style={{ display: keyword.length > 0 ? "block" : "none" }}
          />
          <input
            style={{ height: "35px" }}
            value={keyword}
            name="keyword"
            onChange={e => {
              e.preventDefault();

              setKeyword(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                keyword !== "" && router.push(`/search?keyword=${keyword}`);
              }
            }}
            type="text"
            className="searchInputMobile"
          />
          <MdSearch
            className="text-gray-600 "
            onClick={e => {
              e.preventDefault();
              keyword !== "" && router.push(`/search?keyword=${keyword}`);
            }}
            style={{ fontSize: "1.5rem" }}
          />{" "}
          <VoiceSearchNoSSR className="text-gray-600 " />
        </React.Fragment>
      </div>
    </div>
  );
}
