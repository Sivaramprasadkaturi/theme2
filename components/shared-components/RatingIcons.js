import React from 'react';

const RatingIcons = ({ rating }) => { // takes for example rating is 4 then shows 4  full bulbs and 5 - 4 = 1 empty 
    let ratingAsArr = [];

    for (let i=0; i < 5; i++) {
      ratingAsArr[i] = (i + 1) <= rating ? 1 : 0;
    }


    return ratingAsArr.map((rate, i) => {
        return (
          <div key={i} className="bulb mx-1">
            <img
              src={`/icons/review-bulb-${rate ? 'full' : 'empty'}.png`}
              alt="Filled Light Bulb"
              width="12"
              height="18"
            />
          </div>
        );
    });
  };


  export default React.memo(RatingIcons);