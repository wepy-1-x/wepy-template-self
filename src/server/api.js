import Request from './request';
export default class Api{
    constructor() {}
    /**示例*/
    getInfo(params) {
        return Request.wxRequest(params, 'index');
    }
    uploadImg(action, FilePaths, callback) {
        Request.upImg(action, FilePaths, callback);
    }
}