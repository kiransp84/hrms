import axios from 'axios';

export const generateExcelReport = async (exportAction,data,successCallbackFn,errorCallbackFn) => {
    try {
        const response = await axios({
          url:`/bff/${exportAction}`,
          data,
          method: 'POST',
          responseType: 'blob',
        });
        successCallbackFn(response);
      } catch (error) {
        errorCallbackFn(error);
      }
}