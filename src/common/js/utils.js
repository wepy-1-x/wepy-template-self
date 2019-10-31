export default class Utils {
    constructor() {}

    static throttle(fn, gapTime) { // 防止重复点击导致页面多次跳转
        if (gapTime == null || gapTime == undefined) {
            gapTime = 1500;
        }
        let _lastTime = null;
        return function() {
            let _nowTime = +new Date();
            if (_nowTime - _lastTime > gapTime || !_lastTime) {
                fn.apply(this, arguments); //将this和参数传给原函数
                _lastTime = _nowTime;
            }
        };
    }
    
    static isLogin(loginYes, oauthUrl) {
        let that = this;
        wx.checkSession({
            success: function() {
                if (that.getStorage('token')) {
                    loginYes && loginYes();
                } else {
                    wx.navigateTo({
                        url: oauthUrl
                    })
                }
            },
            fail: function() {
                wx.navigateTo({
                    url: oauthUrl
                })
            }
        });
    }
    
    static showModal(callback, options) {
    	options = options || {};
    	let title = options.title || '提示',
    		content = options.content,
    		cancelText = options.cancelText || '取消',
    		confirmText = options.confirmText || '确定';
    
        wx.showModal({
            title: title,
            content: content,
            showCancel: true,
            cancelText: cancelText,
            cancelColor: '#000000',
            confirmText: confirmText,
            confirmColor: '#3CC51F',
            success: res => {
                if(res.confirm){
                    callback && callback();
                }
            }
        });
    }
}
