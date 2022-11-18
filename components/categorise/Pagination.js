import React from "react";
import { MdOutlineWest, MdOutlineEast } from "react-icons/md";
import styled from "styled-components";

const Pagination = props => {
  return (
    <div className="flex items-center justify-center w-full mt-10">
      {Number(props.currentPage) !== 1 && (
        <PaginationButton
          className="flex items-center justify-center font-semibold text-center 1"
          onClick={() => {
            props.fetchMoreData(Number(props.currentPage) - 1);
            props.setCurrentPage(prev => Number(prev - 1));
          }}
        >
          <MdOutlineWest />
        </PaginationButton>
      )}
      {Number(props.currentPage) !== 1 && Number(props.numOfPages) !== 3 && (
        <>
          <PaginationButton
            className="flex items-center justify-center font-semibold text-center 2"
            onClick={() => {
              props.fetchMoreData(1);
              props.setCurrentPage(1);
            }}
          >
            1
          </PaginationButton>
          {Number(props.numOfPages) > 2 && (
            <div className="flex items-center justify-center py-2 text-sm dot-1">
              ...
            </div>
          )}
        </>
      )}
      {Number(props.currentPage) + 1 < Number(props.numOfPages) ||
        (props.numOfPages === 2 && props.currentPage !== 2 && (
          <PaginationButton
            className="flex items-center justify-center font-semibold text-center 3"
            onClick={() => {
              props.fetchMoreData(Number(props.currentPage) + 1);
              props.setCurrentPage(prev => Number(prev + 1));
            }}
          >
            {Number(props.currentPage) + 1}
          </PaginationButton>
        ))}
      {Number(props.currentPage) + 2 < Number(props.numOfPages) && (
        <PaginationButton
          className="flex items-center justify-center font-semibold text-center 4"
          onClick={() => {
            props.fetchMoreData(Number(props.currentPage) + 2);
            props.setCurrentPage(prev => Number(prev + 2));
          }}
        >
          {Number(props.currentPage) + 2}
        </PaginationButton>
      )}
      {Number(props.currentPage) + 3 < Number(props.numOfPages) && (
        <PaginationButton
          className="flex items-center justify-center font-semibold text-center 5"
          onClick={() => {
            props.fetchMoreData(Number(props.currentPage) + 3);
            props.setCurrentPage(prev => Number(prev + 3));
          }}
        >
          {Number(props.currentPage) + 3}
        </PaginationButton>
      )}
      {Number(props.currentPage) + 1 === Number(props.numOfPages) &&
        Number(props.currentPage) > 1 && (
          <PaginationButton
            className="flex items-center justify-center font-semibold text-center 6"
            onClick={() => {
              props.fetchMoreData(Number(props.numOfPages) - 1);
              props.setCurrentPage(prev => Number(prev - 1));
            }}
          >
            {Number(props.numOfPages) - 2}
          </PaginationButton>
        )}
      {Number(props.currentPage) === Number(props.numOfPages) &&
        Number(props.currentPage) !== 1 &&
        Number(props.numOfPages) > 2 && (
          <PaginationButton
            className="flex items-center justify-center font-semibold text-center 7"
            onClick={() => {
              props.fetchMoreData(Number(props.numOfPages) - 1);
              props.setCurrentPage(prev => Number(prev - 1));
            }}
          >
            {Number(props.numOfPages) - 1}
          </PaginationButton>
        )}

      {Number(props.currentPage) !== Number(props.numOfPages) && (
        <>
          {Number(props.numOfPages) > 2 && (
            <div className="flex items-center justify-center py-2 text-sm dot-2">
              ...
            </div>
          )}
          {Number(props.numOfPages) !== 2 && (
            <PaginationButton
              className="flex items-center justify-center font-semibold text-center 8"
              onClick={() => {
                props.setCurrentPage(Number(props.numOfPages));
                props.fetchMoreData(Number(props.numOfPages));
              }}
            >
              {Number(props.numOfPages)}
            </PaginationButton>
          )}
        </>
      )}
      {Number(props.currentPage) !== Number(props.numOfPages) && (
        <PaginationButton
          className="flex items-center justify-center font-semibold text-center 9"
          onClick={() => {
            props.fetchMoreData(Number(props.currentPage + 1));
            props.setCurrentPage(prev => Number(prev + 1));
          }}
        >
          <MdOutlineEast />
        </PaginationButton>
      )}
    </div>
  );
};

const PaginationButton = styled.button`
  color: var(--primary);
  font-size: 22px;
  line-height: 28px;
  padding: 3px 8px;
  border: 1px solid #444444;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 0 10px;
  width: 37px;
  height: 37px;
  border-radius: 2px;
`;
export default Pagination;
