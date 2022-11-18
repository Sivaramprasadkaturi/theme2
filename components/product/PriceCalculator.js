import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getDistanceBetweenTwoCoords } from "../../utils/functions";

export default function PriceCalculator({
  priceState,
  supplierState,
  setCalculatedPriceAndFoundDist
}) {
  const { lat: latitudeState, lng: longitudeState } = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  useEffect(() => {
    let closestSupplier = null;
    let distance = 0;
    if (
      supplierState &&
      supplierState[0] &&
      supplierState[0].distributorOrder &&
      latitudeState &&
      longitudeState
    ) {
      supplierState[0].distributorOrder.map((supplier, index) => {
        if (index == 0) {
          closestSupplier = supplier;
          distance =
            getDistanceBetweenTwoCoords(
              supplier.lat,
              supplier.longitude,
              latitudeState,
              longitudeState
            ).toFixed(4) * 1;
        } else {
          if (
            getDistanceBetweenTwoCoords(
              supplier.lat,
              supplier.longitude,
              latitudeState,
              longitudeState
            ).toFixed(4) *
              1 <
            distance
          ) {
            distance =
              getDistanceBetweenTwoCoords(
                supplier.lat,
                supplier.longitude,
                latitudeState,
                longitudeState
              ).toFixed(4) * 1;
            closestSupplier = supplier;
          }
        }
      });
      let priceOfClosest = priceState.prices.filter(
        l => l.distributorId === closestSupplier.distid
      );
      setCalculatedPriceAndFoundDist({
        price: priceOfClosest[0],
        dist: closestSupplier.distid
      });
    } else if (
      supplierState &&
      supplierState[0] &&
      supplierState[0].distributorOrder
    ) {
      setCalculatedPriceAndFoundDist({
        price: priceState.prices[0],
        dist: priceState.prices[0].distributorId
      });
    }
  }, [supplierState, latitudeState, longitudeState, priceState.prices, setCalculatedPriceAndFoundDist]);
  return null;
}
