import { PROJECT_LINK, VID } from "../../../project-config";

const FacetImage = ({ name, itemText }) => {
  name = name.toLowerCase();
  const arrFacetsWithImage = [
    "finish",
    "shell color",
    "shade color",
    "glass color"
  ];

  if (arrFacetsWithImage.includes(name)) {
    let imageSource = "";

    if (name.includes(" ")) {
      name = name
        .split(" ")
        .map(s => s[0].toUpperCase() + s.substring(1)) // try index access here
        .join("");
    } else {
      name = name[0].toUpperCase() + name.substring(1);
    }

    imageSource = `${PROJECT_LINK}/store/${VID}/assets/images/attributes/facet${name}_${itemText
      .toLowerCase()
      .replace(" shade", "")}.png`;

    if (itemText === "Stainless Steel") {
      imageSource = `${PROJECT_LINK}/store/${VID}/assets/images/attributes/201-Finish_Metal-Stainless-Steel.jpg`;
    }

    ["Graphite", "Platinum"].forEach(color => {
      if (itemText.includes(color)) {
        imageSource = `${PROJECT_LINK}/store/${VID}/assets/images/attributes/facetFinish_${color.toLocaleLowerCase()}.png`;
      }
    });

    return (
      <span className="facet-image">
        <img alt={name} src={imageSource} loading="lazy" />
      </span>
    );
  }
  return null;
};

export default FacetImage;
