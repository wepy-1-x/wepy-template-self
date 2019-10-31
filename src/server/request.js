import wepy from 'wepy';
const BASE_URL = '';
export default class Request {
    constructor() {}
    static async wxRequest(params, acticon) {
        wx.showNavigationBarLoading();
        let res = await wepy.request({
            url: BASE_URL + acticon, //开发者服务器接口地址",
            data: params, //请求的参数",
            method: 'POST',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            header: {
                'Content-Type': 'application/json'
            }
        });
        wx.hideNavigationBarLoading();
        return res.data;
    }
    static upImg(action, filePaths, callback) {
        let token = wx.getStorageSync("token");
        let i = filePaths.i ? filePaths.i : 0,
            success = filePaths.success ? filePaths.success : 0,
            fail = filePaths.fail ? filePaths.fail : 0;
        wx.uploadFile({
            url: BASR_IMG_URL + action + '?token=' + token,
            filePath: filePaths[i],
            name: 'imgfile',
            formData: {
                'name': 'imgfile',
                'sort': i,
            },
            success: function(res) {
                success++;
            },
            fail: function() {
                fail++;
            },
            complete: function(res) {
                let data = JSON.parse(res.data);
                i++;
                if (i == filePaths.length) {
                    callback && callback(data);
                } else {
                    filePaths.i = i;
                    filePaths.success = success;
                    filePaths.fail = fail;
                    upImg(action, filePaths, callback)
                }
            }
        })
    }
}
