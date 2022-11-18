import { useTranslation } from "next-i18next";
export default function Translate({
  translationFileName,
  translateKey,
  replaceText
}) {
  const { t } = useTranslation(translationFileName);

  let result = t(translateKey);
  if (replaceText) {
    result = replaceText(result);
  }
  return result;
}
