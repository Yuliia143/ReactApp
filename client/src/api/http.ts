import axios from "axios";
import { BASE_URL } from '../config'

interface HttpResponse {
    headers: any,
    data: any
}
function setNewToken(headers: any) {
    console.log(headers);
    if(headers['access-token']){
        localStorage.setItem("Access-Token", headers['access-token']);
    }

}

const get =  async (url:string, data:any, options:any = {}):Promise<HttpResponse> => {
    const token = localStorage.getItem("Access-Token");
    const response = await axios.get(BASE_URL+url , {...options, headers: {'Access-Token': token}, params:data});
    setNewToken(response.headers);
    return response;
};

const post = async (url:string, data:any, options:any = {}):Promise<HttpResponse> => {
    const token = localStorage.getItem("Access-Token");
    const response = await axios.post(BASE_URL+url, data, {...options, headers: {'Access-Token': token}});
    setNewToken(response.headers);
    return response;
};

const put = async (url:string, data:any, options:any = {}):Promise<HttpResponse> => {
    const token = localStorage.getItem("Access-Token");
    const response = await axios.put(BASE_URL+url, data, {...options, headers: {'Access-Token': token}});
    setNewToken(response.headers);
    return response;
};

const remove = async (url:string, data=null):Promise<HttpResponse> => {
    const token = localStorage.getItem("Access-Token");
    const response = await axios.delete(BASE_URL+url, {
        headers: {
            'Access-Token': token
        },
    data:data
    });
    setNewToken(response.headers);
    return response;
};

export default {get, put, post, remove};

