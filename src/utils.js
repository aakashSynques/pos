import axios from 'axios';

export const fetch = async (
    endPoint = '',
    method = 'get',
    data = null,
    headers={}
) => {
    return await axios({
        baseURL:process.env.REACT_APP_BASE_URL,
        url:endPoint,
        method,
        data,
        headers,
    })
}
