import { httpRestIF } from "@/api/axios";

class RestIFServices {
    public async getPdf(companyId: string) {
        return httpRestIF.get(`/rest-if/file-pdf/${companyId}`, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/pdf',
            },
        });
    }
}

export default new RestIFServices();
