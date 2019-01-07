const HOST_IND = 3, // 切换服务器
    HOST = [
        "http://www.chineseo2o.com/", // 正式服务器
        "http://172.16.159.110:8080/", // 测试服务器
        // 德华
        "http://192.168.0.186:8080/", // 其它测试

        "http://172.16.159.110:8080/",
        "/" // 代理
    ],
    HOST_CATALOG_API = "api/", // api目录
    HOST_CATALOG_IMG = "https://hzbjsaas.oss-cn-hangzhou.aliyuncs.com"; // 图片资源目录

if (HOST_IND !== 0) {
    console.log(
        "%c当前HOST在测试环境：" + HOST[HOST_IND],
        "background: #000;color:#ffff00;padding: 2px"
    );
}

export default {
    HOST: HOST[HOST_IND],
    HOST_API: HOST[HOST_IND] + HOST_CATALOG_API,
    HOST_IMG: HOST_CATALOG_IMG
};
