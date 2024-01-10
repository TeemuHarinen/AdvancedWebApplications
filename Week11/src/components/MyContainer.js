import { useTranslation } from 'react-i18next';

function MyContainer() {
const { t, i18n } = useTranslation();
  return (
    <div>
        <h2>{t('This is the front page')}</h2>
    </div>
  )
}

export default MyContainer