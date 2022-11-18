export const getMeasureProps = format => {
  switch (format) {
    case "Pendant1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Max_Height_Decimals",
            "specM_Install_Max_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Pendant2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Max_Height_Decimals",
            "specM_Install_Max_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Chandelier1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Max_Height_Decimals",
            "specM_Install_Max_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Chandelier2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Max_Height_Decimals",
            "specM_Install_Max_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Accessory1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Accessory2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Bollard1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Bollard2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Canopy1":
      return [
        {
          name: [
            "specM_Canopy_Length_Decimals",
            "specM_Canopy_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: ["specM_Canopy_Width_Decimals", "specM_Canopy_Width_Fractions"],
          prefix: "W"
        },
        {
          name: [
            "specM_Canopy_Height_Decimals",
            "specM_Canopy_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Canopy2":
      return [
        {
          name: [
            "specM_Canopy_Diameter_Decimals",
            "specM_Canopy_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Canopy_Height_Decimals",
            "specM_Canopy_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Canopy3":
      return [
        {
          name: [
            "specM_Canopy_Length_Decimals",
            "specM_Canopy_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Canopy_Height_Decimals",
            "specM_Canopy_Height_Fractions"
          ],
          prefix: "H"
        },
        {
          name: [
            "specM_Canopy_Extention_Decimals",
            "specM_Canopy_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Canopy4":
      return [
        {
          name: [
            "specM_Canopy_Diameter_Decimals",
            "specM_Canopy_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Canopy_Extention_Decimals",
            "specM_Canopy_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Ceiling1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Ceiling2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Furniture1":
      return [
        {
          name: [
            "specM_Furniture_Length_Decimals",
            "specM_Furniture_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Furniture_Width_Decimals",
            "specM_Furniture_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Furniture_Height_Decimals",
            "specM_Furniture_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Furniture2":
      return [
        {
          name: [
            "specM_Furniture_Diameter_Decimals",
            "specM_Furniture_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Furniture_Height_Decimals",
            "specM_Furniture_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Furniture3":
      return [
        {
          name: [
            "specM_Furniture_Diameter_Decimals",
            "specM_Furniture_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Furniture_Extention_Decimals",
            "specM_Furniture_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Furniture4":
      return [
        {
          name: [
            "specM_Furniture_Width_Decimals",
            "specM_Furniture_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Furniture_Height_Decimals",
            "specM_Furniture_Height_Fractions"
          ],
          prefix: "H"
        },
        {
          name: [
            "specM_Furniture_Extention_Decimals",
            "specM_Furniture_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Furniture5":
      return [
        {
          name: [
            "specM_Furniture_Unique_Decimals",
            "specM_Furniture_Unique_Fractions"
          ],
          prefix: ""
        }
      ];
    case "Lamp1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Lamp2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Pier1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Pier2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Pier3":
      return [
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        },
        {
          name: [
            "specM_Install_Extention_Decimals",
            "specM_Install_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Vanity1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        },
        {
          name: [
            "specM_Install_Extention_Decimals",
            "specM_Install_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Vanity2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Extention_Decimals",
            "specM_Install_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Wall1":
      return [
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Height_Decimals",
            "specM_Install_Height_Fractions"
          ],
          prefix: "H"
        },
        {
          name: [
            "specM_Install_Extention_Decimals",
            "specM_Install_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Wall2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Extention_Decimals",
            "specM_Install_Extention_Fractions"
          ],
          prefix: "E"
        }
      ];
    case "Chadelier1":
      return [
        {
          name: [
            "specM_Install_Length_Decimals",
            "specM_Install_Length_Fractions"
          ],
          prefix: "L"
        },
        {
          name: [
            "specM_Install_Width_Decimals",
            "specM_Install_Width_Fractions"
          ],
          prefix: "W"
        },
        {
          name: [
            "specM_Install_Max_Height_Decimals",
            "specM_Install_Max_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    case "Chadelier2":
      return [
        {
          name: [
            "specM_Install_Diameter_Decimals",
            "specM_Install_Diameter_Fractions"
          ],
          prefix: "D"
        },
        {
          name: [
            "specM_Install_Max_Height_Decimals",
            "specM_Install_Max_Height_Fractions"
          ],
          prefix: "H"
        }
      ];
    default:
      return null;
  }
};

export const getReqProps = (
  mProps,
  hiddenPropertiesState,
  propertyState,
  unit
) => {

  let allProps = hiddenPropertiesState.concat(propertyState);
  let measureProps = [];
  let unitIndex = 0;
  if (unit) {
    unitIndex = 1;
  }

  for (let i = 0; i < mProps.length; i++) {
    allProps.map(p => {
      if (p.propname === mProps[i].name[unitIndex]) {
        p.prefix = mProps[i].prefix;
        measureProps.push(p);
      }
    });
  }
  return measureProps;
};
