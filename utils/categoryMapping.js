const categoryMapping = (menu, url, lang = null) => {
  let allCategoryNames = [];
  let navTemp = { cid: 0, name: 0 };
  navTemp = menu;

  const nestedRouting = category => {
    let temp;

    temp = navTemp?.childs?.find(l => {
      let tempUrl = l.URL;
      if (tempUrl[tempUrl.length - 1] === "/") {
        tempUrl = tempUrl.slice(0, -1);
      }
      tempUrl = tempUrl.split("/");
      let urlOfCat = tempUrl[tempUrl.length - 1];

      if (urlOfCat.toLowerCase() === category.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    });

    if (temp != undefined) {
      navTemp = temp;
    } else {
      navTemp = { cid: 0, name: 0 };
    }
  };

  let params = url;
  //Translate Part
  if (lang !== null) params = params.replace(`/${lang}`, "");

  params = params.split("/").filter(param => {
    if (param !== "" && param !== "preview" && param !== "shop") {
      return true;
    } else {
      return false;
    }
  });

  if (params[0] === "stores" && params.length > 1) {
    return { ...navTemp, parents: ["Stores", "432381"] };
  }

  if (params[0] !== "") {
    params
      .filter(fil => fil !== "")
      .forEach(category => {
        nestedRouting(category);
      });
  }

  /*  if (params[0] === "by-brand") {
    navTemp = menu;
  }
 */
  return { ...navTemp, parents: allCategoryNames };
};

export default categoryMapping;
