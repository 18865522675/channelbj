import { $ } from "./axios";

export default {
    //获取渠道商列表
    channelList_getList: params => $.get("/channel/selectList", params, { lock: true }),
    //渠道商-会员详情
    channelList_memberList: params => $.get("/channel/findMyMember", params, { lock: true })
};
