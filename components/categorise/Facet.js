import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdDone } from "react-icons/md";

const Wrapper = styled.div`
  //justify-content: center;
  //margin-top: 100px;
  //margin-left: 50px;
  width: 280px;
  margin: 10px;
  max-height: 210px;
  overflow-y: hidden;
  padding-right:10px;
  :hover{
    overflow-y: scroll;
  }

  h2 {
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    margin: 0px;
    // padding: 5px 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    text-transform: capitalize;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0px;
color: #37455E;
opacity: 1;
  }

  hr {
    margin-bottom: 15px;
    margin-top: 15px;
    border-bottom: 1px solid #eee;
    width: 100%;
  }

  .delivery-facet {
    border: 1px solid;
    padding: 5px;
    margin: 10px;
    font-size: 14px;
  }

  .clearBtn {
    float: right;
    font-size: 14px;
    color: orange;
    cursor: pointer;
  }

  .color-dots {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
  }

  li {
    margin: 10px;
  }

  .stars {
    color: orange;
    font-size: 1rem;
    display: inline-block;
    margin-right: 30px;
  }

  .distanceCheck {
    display: block;
  }

  input {
    margin-top: 10px;
    height: 20px;
    margin-right: 15px;
    width: 30px;
  }

  .viewBtn {
    color: var(--primary);
    display: inline-block;
    border: 1px solid var(--primary);
    font-size: 14px;
    padding: 10px;
    //margin-top:10px;
  }

  .storeInfo {
    flex: 1;
  }

  p {
    font-size: 13px;
  }

  .content {
    width: 100%;
    //height: auto;
    margin-top: 8px;
    //border: 1px solid #686868;
    display: none;
    //justify-content: center;
    //border-radius: 10px;
  }

  .show {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const Facet = ({
  facet,
  query,
  setQuery,
  collectionsOpen,
  index,
  queryIsNotChanged,
  setQueryIsNotChanged
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleSetQuery = (query, facet, facetValue) => {
    if (queryIsNotChanged && setQueryIsNotChanged) setQueryIsNotChanged(false);

    setQuery([
      ...query,
      {
        name: facetValue.name,
        value: `${facet.code || facet.name}=${
          facetValue.code || facetValue.value
        }`,
        removeText: facetValue.removeText
      }
    ]);
  };

  useEffect(() => {
    if (
      facet?.title.toLowerCase() === "price" ||
      facet?.title.toLowerCase() === "sellers" ||
      (collectionsOpen && facet?.title.toLowerCase() === "collections")
    ) {
      setIsOpen(true);
    }
  }, [facet]);

  return (
    <>
      <Wrapper>
        
      {/* <h2 className="text-lg lg:text-2xl productSortedAvailability">Availability</h2>
        <div className="form-check col-md-12">
                <input type="checkbox" className="form-check-input rangeCheck" id="range1" data-range="4999" readonly="true"/>
                <label className="form-check-label" htmlFor="range1">In Stock</label>
            </div>

            <div className="form-check col-md-12">
                <input type="checkbox" className="form-check-input rangeCheck" id="range1" data-range="4999" readonly="true"/>
                <label className="form-check-label" htmlFor="range1">Express Shipping</label>
            </div> */}

        {/* {index !== 0 && <hr />} */}
        {/* availability */}
        

            {/* availability */}

        <h2
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.target.click();
            }
          }}
          aria-expanded={isOpen ? "true" : "false"}
          tabIndex={"0"}
          onClick={() => setIsOpen(!isOpen)}
          className="text-base md:text-md lg:text-2xl"
        >
          {facet?.title}
          <span
            className="clearBtn"
            style={{
              color: "#B94F39"
            }}
            // onClick={() =>
            //     setQuery([...query.filter(q => q.name !== facet.name)])
            // }
          >
            {/*Clear*/}
            
          </span>
        </h2>
        {facet?.facetValues
          ?.filter(f => f.count > 0)
          .map(facetValue => {
            return (
              <div
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                tabIndex={"0"}
                className={`focusAble flex my-2 mb-4 cursor-pointer ${
                  isOpen ? "content show" : "content show"
                }`}
                key={facetValue.removeText}
                onClick={() =>
                  query.length > 0
                    ? query.find(
                        q =>
                          q.value ===
                          `${facet.code || facet.name}=${
                            facetValue.code || facetValue.value
                          }`
                      )
                      ? setQuery([
                          ...query.filter(
                            q =>
                              q.value !==
                              `${facet.code || facet.name}=${
                                facetValue.code || facetValue.value
                              }`
                          )
                        ])
                      : handleSetQuery(query, facet, facetValue)
                    : handleSetQuery(query, facet, facetValue)
                }
              >
                <CheckBox className="flex items-center justify-center w-6 h-6 mr-4">
                  {query.find(
                    q =>
                      q.value ===
                      `${facet.code || facet.name}=${
                        facetValue.code || facetValue.value
                      }`
                  ) ? (
                    <MdDone
                      className="text-sm"
                      style={{
                        color: "#DC7863",
                        fontSize: "38px"
                      }}
                    />
                  ) : (
                    ""
                  )}
                </CheckBox>
                <TextFilter>{facetValue.text}</TextFilter>
                <p style={{ marginLeft: "auto" }}>({facetValue.count})</p>
              </div>
            );
          })}
      </Wrapper>
    </>
  );
};

const H2 = styled.h2`
  font-size: 22px;
  line-height: 28px;
`;
const CheckBox = styled.div`
position: relative;
top: 0;
left: 0;
height: 18px;
width: 18px;
background-color: #fff;
cursor: pointer;
margin: 0 5px 0 0;
border: 1px solid #c8c8c8;
`;
const TextFilter = styled.p`
  font-weight: normal;
  font-size: 13px;
  line-height: 22px;
  margin-left: 5px;
`;
const Line = styled.span`
  height: 2px;
  background: #c4c4c4;
  margin: 30px 0px;
`;
export default Facet;
