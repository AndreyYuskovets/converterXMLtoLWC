import {$host} from './index';

export const recordCreation = async (fileName, fileBody) => {
    const {data} = await $host.post('api/demo_record/recordCreation', {fileName, fileBody});
    return data;
}