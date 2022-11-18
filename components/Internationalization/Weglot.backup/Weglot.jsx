import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Script from "next/script";
import {
  changeLanguageFromFunction,
  changeWeglotInitializedOnce,
  updateCurrency
} from "../../../redux/actions/mainActions";
const isBrowser = typeof window !== "undefined";
import { useRouter } from "next/router";
import classes from "./Weglot.module.css";
import Dropdown from "../../AC-UI-Elements/Dropdown/Dropdown";

const renderFlagSvg = countryCode => {
  if (countryCode === "en") countryCode = "gb";
  return (
    <img
      style={{ display: "inline-block", marginRight: 5 }}
      src={`https://cdn.weglot.com/flags/rectangle_mat/${countryCode}.svg`}
      width={30}
      height={20}
    ></img>
  );
};

export default function Weglot({ locale }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [availableLanguages, setAvailableLanguages] = useState([]);

  const [langNames, setLangNames] = useState({});

  const [currencySet, setCurrencySet] = useState(false);

  const [displayActive, setDisplayActive] = useState(false);

  const [focusIsInsideLangSelector, setFocusIsInsideLangSelector] =
    useState(false);

  useEffect(() => {
    let ref = null;
    if (typeof window !== "undefined") {
      const handleFocusIn = e => {
        if (focusIsInsideLangSelector) {
          const currentFocusedElement = e.target;
          if (currentFocusedElement) {
            if (!currentFocusedElement.dataset.selector) {
              setDisplayActive(false);
            }
          }
        }
      };
      ref = handleFocusIn;
      window.addEventListener("focusin", handleFocusIn);
    }

    return () => {
      if (ref) window.removeEventListener("focusin", ref);
    };
  }, [focusIsInsideLangSelector]);

  useEffect(() => {
    if (locale) {
      dispatch(changeLanguageFromFunction(locale));
    }
    if (currencySet === false) {
      dispatch(updateCurrency(getCurrencyName(locale).value));
    }
  }, [locale]);

  const weglotInitializedOnceState = useSelector(
    state => state.mainReducer.weglotInitializedOnce,
    shallowEqual
  );

  const langState = useSelector(state => state.mainReducer.lang, shallowEqual);

  const currencyState = useSelector(
    state => state.mainReducer.currency,
    shallowEqual
  );

  const callbackRef = useRef(null);

  useEffect(() => {
    if (isBrowser && window.Weglot && weglotInitializedOnceState) {
      const callback = (newLang, prevLang) => {
        dispatch(changeLanguageFromFunction(newLang));
        router.push(router.asPath, router.asPath, {
          locale: newLang
        });
      };

      callbackRef.current = callback;

      window.Weglot.on("languageChanged", callback);
    }

    return () => {
      if (callbackRef.current)
        window.Weglot.off("languageChanged", callbackRef.current);
    };
  }, [weglotInitializedOnceState, router.asPath, langState]);

  const handleOnChange = ({ lang }) => {
    window.Weglot.switchTo(lang);
  };

  useEffect(() => {
    if (isBrowser && window.Weglot && weglotInitializedOnceState) {
      //Create array of options to be added

      let tempLangNames = {};
      let availableLanguages = window.Weglot.options.languages
        .map(function (language) {
          return language.language_to;
        })
        .concat(window.Weglot.options.language_from);

      setAvailableLanguages(availableLanguages);
      availableLanguages.forEach(lang => {
        const text = window.Weglot.getLanguageName(lang);
        tempLangNames = { ...tempLangNames, [lang]: text };
      });

      setLangNames(tempLangNames);
    }
  }, [weglotInitializedOnceState, langState]);

  console.log("langNames", locale, langNames, langState, langNames[langState]);

  const handleOnLoad = () => {
    window.Weglot.initialize({
      api_key: `${process.env.WEGLOT_KEY}`
    });
    const callback = () => {
      dispatch(changeWeglotInitializedOnce(true));
    };
    window.Weglot.on("initialized", callback);
  };

  const getCurrencyName = (lang, currency) => {
    if (lang === "en" || currency === "USD") {
      return { name: "US Dollars", value: "USD" };
    } else if (lang === "es" || currency === "EUR") {
      return { name: "EURO", value: "EUR" };
    } else {
      return { name: "US Dollars", value: "USD" };
    }
  };

  const handleCurrencyChange = event => {
    const currency = event.target.value;

    dispatch(updateCurrency(currency));
  };

  const renderLangSelector = () => {
    const options = availableLanguages.map(lang => {
      const label = langNames[lang];
      const id = lang;
      const detailID = lang;
      const detailDesc = langNames[lang];
      const children = renderFlagSvg(lang);

      return { label, id, detailID, detailDesc, children };
    });

    console.log("options", availableLanguages, options);
    if (options?.length !== 0)
      return (
        <Dropdown
          displayActive={displayActive}
          name={"lang"}
          selectorAttr={true}
          options={options}
          state={{ lang: langState }}
          setState={handleOnChange}
        />
      );
  };

  return (
    <>
      <div
        id="lang-currency-display"
        className={`${classes.container}${
          weglotInitializedOnceState ? " " + classes.initialized : ""
        }`}
      >
        <div
          aria-expanded={displayActive ? "true" : "false"}
          onKeyDown={e => {
            if (e.code === "Enter") {
              e.preventDefault();
              e.target.click();
            }
          }}
          tabIndex={"0"}
          className={"focusAble " + classes.display}
          onClick={() => {
            setDisplayActive(true);
          }}
        >
          <span id="lang-display">
            {renderFlagSvg(langState)}
            {langNames[langState]}
          </span>
          &nbsp;/&nbsp;
          <span>{getCurrencyName(null, currencyState).name}</span>
        </div>

        <div
          onMouseLeave={() => {
            setDisplayActive(false);
          }}
          className={`${classes.wrapper}${
            displayActive ? " " + classes.active : ""
          }`}
        >
          {/*   <select
            data-selector="true"
            onFocusCapture={() => {
              if (!focusIsInsideLangSelector)
                setFocusIsInsideLangSelector(true);
            }}
            tabIndex={displayActive ? "0" : "-1"}
            id="lang-selector"
            value={langState}
            onChange={handleOnChange}
          >
            {availableLanguages.map(lang => {
              console.log("lang2", lang, langNames[lang]);
              return (
                <option key={lang} value={lang}>
                  {renderFlagSvg(lang)} {langNames[lang]}
                </option>
              );
            })}
          </select> */}

          {renderLangSelector()}

          <select
            data-selector="true"
            onFocusCapture={() => {
              if (!focusIsInsideLangSelector)
                setFocusIsInsideLangSelector(true);
            }}
            tabIndex={displayActive ? "0" : "-1"}
            value={currencyState}
            onChange={handleCurrencyChange}
          >
            {availableLanguages.map(lang => {
              const currency = getCurrencyName(lang);
              return (
                <option key={lang} value={currency.value}>
                  {currency.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Script
        id="weglot-script"
        onLoad={handleOnLoad}
        type="text/javascript"
        src="https://cdn.weglot.com/weglot.min.js"
      ></Script>
    </>
  );
}
