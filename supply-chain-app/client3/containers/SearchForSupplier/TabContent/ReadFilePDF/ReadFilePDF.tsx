import { Grid, Button, Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { useReadFilePDFStyle } from './ReadFilePDF.style';
import useSearchForSupplierTab from '../../SearchForSupplierTabContext';
import { FC, useEffect, useState } from 'react';
import restIFServices from 'service/rest-if/restIf.service';

type ReadFilePDFProps = {};

const ReadFilePDF: FC<ReadFilePDFProps> = () => {
    const { t } = useTranslation();
    const searchForSupplierTab = useSearchForSupplierTab();
    const currentCompany = searchForSupplierTab.tab.info;
    const dataScore = searchForSupplierTab.tab.info.score as any;
    const style = useReadFilePDFStyle();
    const pageNavigationPluginInstance: any = pageNavigationPlugin();
    const [pdf, setPdf] = useState(null);
    const [errorMessageCode, setErrorMessageCode] = useState(null);

    useEffect(() => {
        const getPdf = async () => {
            try {
                const data = await restIFServices.getPdf(currentCompany.companyId);
                const blob = new Blob([data as unknown as Blob], { type: 'application/pdf' });
                const path = window.URL.createObjectURL(blob);
                setPdf(path);
            } catch (error) {
                try {
                    const resError = JSON.parse(await error.response.data.text());
                    setErrorMessageCode(resError.messageCode || 'detailSupplier.pdfInformationNotfound');
                } catch (_) {
                    setErrorMessageCode('detailSupplier.pdfInformationNotfound');
                }
            }
        };
        getPdf();
    }, []);

    return (
        <Box className={style.viewPage}>
            <Typography className={style.companyName}>
                {t('detailSupplier.corporateTrustEvaluationDetails')} : {dataScore.companyName}
            </Typography>
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
                <Grid item xs={6} style={{ height: '75px' }}>
                    <Grid className={style.containerInformation} container>
                        <Grid className={style.containerScore}>
                            <Typography className={style.typeScore}>
                                <span className={style.scoreWithColor}>{t('detailSupplier.environment')}</span>{' '}
                                {t('detailSupplier.score')}
                                <span className={style.score}>
                                    :<span className={style.scoreWithColor}> {dataScore.environmentScore}</span>
                                    /100
                                </span>
                            </Typography>
                        </Grid>
                        <Grid className={style.containerScore}>
                            <Typography className={style.typeScore}>
                                <span className={style.scoreWithColor}>{t('detailSupplier.laborAndHumanRights')}</span>{' '}
                                {t('detailSupplier.score')}
                                <span className={style.score}>
                                    :<span className={style.scoreWithColor}> {dataScore.laborScore}</span>
                                    /100
                                </span>
                            </Typography>
                        </Grid>
                        <Grid className={style.containerScore}>
                            <Typography className={style.typeScore}>
                                <span className={style.scoreWithColor}>{t('detailSupplier.ethics')}</span>{' '}
                                {t('detailSupplier.score')}
                                <span className={style.score}>
                                    :<span className={style.scoreWithColor}> {dataScore.ethicsScore}</span>
                                    /100
                                </span>
                            </Typography>
                        </Grid>
                        <Grid className={style.containerScore}>
                            <Typography className={style.typeScore}>
                                <span className={style.scoreWithColor}>
                                    {t('detailSupplier.sustainableProcurement')}
                                </span>{' '}
                                {t('detailSupplier.score')}
                                <span className={style.score}>
                                    :<span className={style.scoreWithColor}> {dataScore.sustainableScore}</span>
                                    /100
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{ height: '75px' }}>
                    <Button className={style.btn}>EvoVadis{t('detailSupplier.detailsScreen')} </Button>
                </Grid>
            </Grid>
            <Box className={style.containerPDF}>
                <center>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <Box style={{ height: '77vh' }}>
                            {errorMessageCode ? (
                                <Typography>{t(errorMessageCode)}</Typography>
                            ) : (
                                pdf && (
                                    <Viewer defaultScale={1} fileUrl={pdf} plugins={[pageNavigationPluginInstance]} />
                                )
                            )}
                        </Box>
                    </Worker>
                </center>
            </Box>
        </Box>
    );
};
export default ReadFilePDF;
