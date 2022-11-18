import React from "react";
// import * as classes from "../Styles/RatingSnapshot.module.css";
import styled from "styled-components";


const Wrapper = styled.div`
  .ratingSnapshot {
    margin-top: 15px;
    padding: 10px;
  }

  .averageRatingLabel {
    padding-left: 5px !important;
  }

  .ratingMeter {
    background-color: #aaa;
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.3),
      inset -1px -1px 2px 0 rgba(0, 0, 0, 0.5);
    height: 17px;
    cursor: pointer;
  }

  .ratingMeter:not(.ratingMeterFiltered):hover {
    box-shadow: 0px 0px 2px 2px #f34a07, inset 1px 1px 1px 0 rgba(0, 0, 0, 0.3),
      inset -1px -1px 2px 0 rgba(0, 0, 0, 0.3);
  }

  .ratingMeterFiltered {
    box-shadow: 0px 0px 3px 3px #f34a07, inset 1px 1px 1px 0 rgba(0, 0, 0, 1),
      inset -1px -1px 2px 0 rgba(0, 0, 0, 1);
  }

  .ratingMeterFilled {
    background-color: #2d509f;
    box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.3),
      inset -1px -1px 2px 0 rgba(0, 0, 0, 0.5);
    height: 17px;
    display: flex;
    align-items: center;
  }

  .meterColumnLabel {
    text-align: center;
    width: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
  }

  .meterColumn {
    padding: 5px 5px 5px 0 !important;
    width: 100%;
  }

  .percentLabel {
    padding-left: 5px !important;
    color: #fff;
  }

  @media all and (max-width: 768px) {
    .ratingSnapshot {
      padding: 0;
    }
  }

`


const RatingSnapshot = ({
                            avgRating,
                            amountOfReviews,
                            starFilter,
                            setStarFilter,
                            renderedInsidePopup,
                            reviewsContainerRef
                        }) => {
    const handleRatingMeterClicked = starIndex => {
        if (starFilter.includes(starIndex)) {
            setStarFilter([...starFilter.filter(star => star != starIndex)]);
        } else {
            setStarFilter([...starFilter, starIndex]);
        }

        if (renderedInsidePopup) {
            if (typeof window !== undefined) {
                window.scrollTo(0, reviewsContainerRef.current.offsetTop);
            }
        }
    };
    return (
        <Wrapper>
            <div className="ratingSnapshot">
                <table className="ratingSnapshotTable">
                    <tbody>
                    {Object.keys(avgRating).includes("countOfEachStar") &&
                    Object.keys(avgRating.countOfEachStar).length > 0 &&
                    [...Array(5)].map((_, i) => {
                        let starIndex = 5 - i;

                        let percent =
                            (avgRating.countOfEachStar[starIndex] * 100) / amountOfReviews;
                        let ratingMeterClasses = [];
                        ratingMeterpush(ratingMeter);
                        if (starFilter.includes(starIndex))
                            ratingMeterpush(ratingMeterFiltered);

                        console.info("ratingMeterClasses", ratingMeterClasses);
                        return (
                            <tr key={i}>
                                <td className="meterColumnLabel">
                                    {`${starIndex} `}
                                    <i className="material-icons star-icon">star</i>
                                </td>
                                <td className="meterColumn">
                                    <div
                                        onClick={() => {
                                            if (avgRating.countOfEachStar[starIndex] > 0) {
                                                handleRatingMeterClicked(starIndex);
                                            }
                                        }}
                                        className="ratingMeterjoin "
                                    >
                                        <div
                                            style={{width: `${percent}%`}}
                                            className="ratingMeterFilled"
                                        >
                                            <label
                                                className="percentLabel"
                                            >{`${percent.toFixed(1)}%`}</label>
                                        </div>
                                    </div>
                                </td>
                                <td>{`${avgRating.countOfEachStar[starIndex]}`}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default RatingSnapshot;
