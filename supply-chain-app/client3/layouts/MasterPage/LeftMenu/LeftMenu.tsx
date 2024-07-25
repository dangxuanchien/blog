import { Button, Box, Theme } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CustomListItem from '../../../components/Inputs/CustomListItem/CustomListItem';
import { CustomLinkNew } from '../../../components/CustomLinkNew/CustomLinkNew';
import CompanyEvaluation from '@/assets/icons/company-evaluation.svg';
import CompanyEvaluationDark from '@/assets/icons/company-evaluation-dark.svg';
import Help from '@/assets/icons/help.svg';
import Setting from '@/assets/icons/setting.svg';
import RCRisk from '@/assets/icons/sc-risk.svg';
import { ThemContext } from 'context/ThemeContext';
import { useLeftMenuStyle } from './LeftMenu.style';

/**
 * The Page Transition Menu
 *
 * @returns MenuList
 */
const LeftMenuNew: FC = () => {
    const { t } = useTranslation();
    const styles = useLeftMenuStyle();
    const { getMode } = useContext(ThemContext);
    const isDark = getMode === 'dark';
    const styleItem = { color: '#000', textAlign: 'center', fontWeight: 800 };

    return (
        <Box className={styles.bodyLeftMenu}>
            <Box>
                <CustomLinkNew url={'/searchforsupplier'} menuType={1}>
                    {isDark ? (
                        <CompanyEvaluationDark className={styles.iconItem} />
                    ) : (
                        <CompanyEvaluation className={styles.iconItem} />
                    )}
                    <CustomListItem title={t('masterPage.menu.companySearch')} style={styleItem} />
                </CustomLinkNew>
                <CustomLinkNew url={'#'} menuType={1}>
                    <RCRisk className={styles.iconItem} />
                    <CustomListItem title={t('masterPage.menu.scRick')} style={styleItem} />
                </CustomLinkNew>
            </Box>

            <Box>
                <Box className={styles.service}>
                    <Button variant="contained" color="primary" className={styles.btn}>
                        <Setting className={styles.serviceIcon} />
                    </Button>
                </Box>
                <Box className={styles.service}>
                    <Button variant="contained" color="primary" className={styles.btn}>
                        <Help className={styles.serviceIcon} />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LeftMenuNew;
