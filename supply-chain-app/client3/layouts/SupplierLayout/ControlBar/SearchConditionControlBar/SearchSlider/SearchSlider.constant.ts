export const SLIDER_SEARCH_LIST = [
    { label: 'searchForSupplierNew.quality', nameScore: 'qualityScore', nameWeight: 'qualityWeight' },
    { label: 'searchForSupplier.price', nameScore: 'costScore', nameWeight: 'costWeight' },
    { label: 'searchForSupplier.deliveryDate', nameScore: 'deliveryScore', nameWeight: 'deliveryWeight' },
    { label: 'searchForSupplier.finance', nameScore: 'financeScore', nameWeight: 'financeWeight' },
    { label: 'searchForSupplier.surroundings', nameScore: 'environmentScore', nameWeight: 'environmentWeight' },
    { label: 'searchForSupplier.laborAndHumanRight', nameScore: 'laborScore', nameWeight: 'laborWeight' },
    { label: 'searchForSupplier.ethics', nameScore: 'ethicsScore', nameWeight: 'ethicsWeight' },
    {
        label: 'searchForSupplier.sustainableProcurement',
        nameScore: 'sustainableScore',
        nameWeight: 'sustainableWeight',
    },
] as const;
