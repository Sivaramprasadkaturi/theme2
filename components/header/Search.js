import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import { TYPEAHEADSEARCH_LINK } from "../../redux/links";
import Translate from "../../utils/Translate";
import { useTranslation } from "next-i18next";
const Search = ({ closeMobileNav }) => {
  const [keyword, setKeyword] = useState("");
  const [typeAheadResult, setTypeAheadResult] = useState([]);
  const [dropdownSelectedIndex, setDropdownSelectedIndex] = useState(null);
  const [searchInputFocused, setSearchInputFocused] = useState(false);

  const inputRef = useRef();
  const { t } = useTranslation("translation");
  const handleArrowNavigateDropdown = e => {
    console.info("clicked", dropdownSelectedIndex);
    e = e || window.event;
    if (e.keyCode == "27") {
      if (closeMobileNav) closeMobileNav();
      setKeyword("");
      setTypeAheadResult([]);
      setDropdownSelectedIndex(null);
    }

    if (dropdownSelectedIndex !== null) {
      if (e.keyCode == "38") {
        if (dropdownSelectedIndex > 0)
          setDropdownSelectedIndex(
            dropdownSelectedIndex => dropdownSelectedIndex - 1
          );
        else if (dropdownSelectedIndex === 0) setDropdownSelectedIndex(null);
      } else if (e.keyCode == "40") {
        if (
          dropdownSelectedIndex < typeAheadResult.length - 1 &&
          dropdownSelectedIndex < 5
        )
          setDropdownSelectedIndex(
            dropdownSelectedIndex => dropdownSelectedIndex + 1
          );
      }
    } else if (dropdownSelectedIndex === null) {
      if (e.keyCode == "40") {
        setDropdownSelectedIndex(0);
      }
    }
  };

  useEffect(() => {
    if (typeAheadResult && typeAheadResult.length > 0) {
      //setDropdownSelectedIndex(0);
    } else {
      setDropdownSelectedIndex(null);
    }
  }, [typeAheadResult]);

  const handleKeyClicked = key => {
    if (closeMobileNav) closeMobileNav();
    console.info("clicked", key);
    setTypeAheadResult([]);
    setKeyword("");
    setSearchInputFocused(false);
    router.push(`/search?keyword=${key}`);
  };

  /*  const setStyles = () => {
    if (inputRef.current) {
      let inputPosition = inputRef.current.getBoundingClientRect();
      console.info("inputPosition", inputPosition);
      return {
        top: `${inputPosition.top - 23}px`,
        left: `${inputPosition.left}px`,
        width: `${inputPosition.width}px`
      };
    }
  }; */

  const router = useRouter();
  return (
    <Wrapper>
      <div className="form-input">
        <label htmlFor="siteSearch" style={{ display: "none" }}>
          Search
        </label>
        <input
          onBlur={() => setSearchInputFocused(false)}
          onFocus={() => setSearchInputFocused(true)}
          ref={inputRef}
          id="siteSearch"
          type="text"
          className="outline-none appearance-none "
          placeholder={t("js.header.searchfor")}
          value={keyword}
          name="keyword"
          onChange={e => {
            e.preventDefault();

            let { value } = e.target;

            value = value.replace(/\*/g, "");
            setKeyword(e.target.value);

            if (value.length > 2) {
              let link = TYPEAHEADSEARCH_LINK("EN", value);
              fetch(link).then(res => {
                res.text().then(text => {
                  console.error("WED2", text);
                  text = text.split("\n");
                  setTypeAheadResult(text);
                  return text;
                });
              });
            }
            if (value == "") {
              setTypeAheadResult([]);
              setKeyword("");
            }
          }}
          onKeyDown={e => {
            handleArrowNavigateDropdown(e);
            if (e.key === "Enter") {
              if (closeMobileNav) closeMobileNav();
              if (
                dropdownSelectedIndex !== null &&
                typeAheadResult &&
                typeAheadResult.length > 0
              ) {
                setKeyword("");
                setTypeAheadResult([]);
                router.push(
                  `/search?keyword=${typeAheadResult[dropdownSelectedIndex]}`
                );
                return;
              }
              setSearchInputFocused(false);
              keyword !== "" && router.push(`/search?keyword=${keyword}`);
            }
          }}
        />

        <span className="allCategoriesItemz">
          All Categories
          {/* <span className="container-category">
                <a data-scroll href="#full">
                  <div className="arrow"></div>
                </a>
              </span> */}
        </span>

        <span className="input-group-btnsearchbar">
          <img
            src="https://ik.imagekit.io/ofb/themes/Path_3_lOXgVmjzE.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052322256"
            className="categories-search7"
          />
        </span>

        {/* <div>
  <h3 className="countryName">Country / Region</h3>
  <select className="country-region">
    <option>United States (USD $)</option>
  </select>
</div> */}

        {/* <select>
    <option value="1">Pure CSS Select</option>
    <option value="2">No JS</option>
    <option value="3">Nice!</option>
  </select> */}
      </div>
      {typeAheadResult &&
      typeAheadResult.length > 0 &&
      typeAheadResult[0] &&
      keyword ? (
        <div
          className={
            searchInputFocused
              ? "search-typeahead-container active"
              : "search-typeahead-container"
          }
        >
          <ul>
            {typeAheadResult.map((key, index) => {
              if (index >= 6) return null;
              return (
                <li
                  style={{ textTransform: "uppercase" }}
                  key={`${key}`}
                  className={`${
                    index === dropdownSelectedIndex ? "active" : ""
                  }`}
                  onMouseDown={() => {
                    setKeyword("");
                    handleKeyClicked(key);
                  }}
                >
                  {key}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .form-input {
    display: flex;
    height: 40px;
    align-items: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 4px #00000029;
    border-radius: 35px;
    opacity: 1;
  }
  input {
    width: 305px !important;
    margin: 0 !important;
    height: 32px !important;
    border-radius: 0 !important;
    font-size: 13px !important;
    border: none !important;
    color: #212b36 !important;
    padding-left: 20px !important;
    background: none;
  }
  .form-input img {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
  input::placeholder {
    color: #212b36;
  }
  .search-typeahead-container {
    display: none;
    position: absolute;
    background-color: #fff;
    width: 100%;
    z-index: 1;
    padding: 3px;
    border: 1px solid;
    border-color: #fff #cdcdcd #cdcdcd !important;
  }

  .search-typeahead-container.active {
    display: block;
  }

  .search-typeahead-container li {
    padding-left: 16px;
    line-height: 35px;
    cursor: pointer;
  }
  .search-typeahead-container li.active,
  .search-typeahead-container li:hover {
    background-color: #ddd;
  }

  .search-typeahead-container li strong {
    color: #fe4f00;
  }

  @media only screen and (min-width: 431px) and (max-width: 1023px) {
    #siteSearch {
      width: 100% !important;
    }

    .form-input {
      padding: 0 10px;
    }
  }
  .input-group-btnsearchbar {
    background: #fdda06;
    padding: 7px 0px;
  }
  .allCategoriesItemz {
    margin-right: 20%;
    border-left: 1px solid #37455e;
    padding-left: 13px;
    margin-left: auto;
  }
`;

export default Search;
