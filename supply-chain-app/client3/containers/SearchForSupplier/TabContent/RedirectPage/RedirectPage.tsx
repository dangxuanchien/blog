import useSearchForSupplierTab from '../../SearchForSupplierTabContext';
import {useRedirectPageStyle} from './RedirectPage.style';
import config from 'next/config';

const RedirectPage = () => {
    const { publicRuntimeConfig } = config();
    const searchForSupplierTab = useSearchForSupplierTab();
    const companyInfo = searchForSupplierTab.tab.info;
    const style = useRedirectPageStyle();
    return <iframe className={style.viewPage} src={`${publicRuntimeConfig.redirectPage}?main-id=${companyInfo.companyId}`} />;
};
export default RedirectPage;