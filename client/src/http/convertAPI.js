import {$host} from './index';

export const doConvert = async (fileName, fileBody) => {
    const {data} = await $host.post('api/converter/doConvert', {fileName, fileBody});
    return data; 
}