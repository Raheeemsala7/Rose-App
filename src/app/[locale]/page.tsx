import { useTranslations } from "next-intl";


export default  function page() {
  const t =  useTranslations("HomePage");
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
