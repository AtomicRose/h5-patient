var express = require('express');
var router = express.Router();
var base = require("../base");
var logger = require("../../helpers/log");

/**
 * get hospital by query params
 */
router.get("/apiwap/hospital", function (req, res) {
    var reqBody = req.body;
    var reqQuery = req.query;
    logger.debug("/apiwap/hospital", reqBody);
    logger.debug("/apiwap/hospital", reqQuery);
    switch (parseInt(reqQuery.city)) {
        case 0: {
            setTimeout(function () {
                base.apiOkOutput(res, {
                    "status": "ok",
                    "errorCode": 0,
                    "errorMsg": "success",
                    "results": [
                        {"id":"1","name":"上海交通大学医学院附属瑞金医院","ShortName":"上海瑞金医院","imageUrl":"http://hp.static.mingyizhudao.com/3E225BB31A12E070D933BC381","hpClass":"三级甲等","hpType":"综合医院","phone":"021-64370045"},
                        {"id":"2","name":"第二军医大学长征医院","ShortName":"上海长征医院","imageUrl":"http://hp.static.mingyizhudao.com/35668C75ED22DAB5AEE7748F0","hpClass":"三级甲等","hpType":"综合医院","phone":"021-81886999"},
                        {"id":"3","name":"复旦大学附属妇产科医院","ShortName":"上海市红房子医院","imageUrl":"http://hp.static.mingyizhudao.com/7DABBC519588846376424DAF3","hpClass":"三级甲等","hpType":"专科医院","phone":"021-33189900"},
                        {"id":"4","name":"第二军医大学长海医院","ShortName":"上海长海医院","imageUrl":"http://hp.static.mingyizhudao.com/8DAD7AC87E75536A9C8BF2932","hpClass":"三级甲等","hpType":"综合医院","phone":"021-31166666"},
                        {"id":"11","name":"北京协和医院","ShortName":"北京协和医院","imageUrl":"http://hp.static.mingyizhudao.com/EC23E2D7C108F984A7D5D4DF3","hpClass":"三级甲等","hpType":"综合医院","phone":"010-69156114"},
                        {"id":"12","name":"中国人民解放军总医院","ShortName":"北京301医院","imageUrl":"http://hp.static.mingyizhudao.com/018A51605CDC72E2060EC0157","hpClass":"三级甲等","hpType":"综合医院","phone":""},
                        {"id":"13","name":"北京大学第三医院","ShortName":"北医三院","imageUrl":"http://hp.static.mingyizhudao.com/5EF477AC7D2717870289F5213","hpClass":"三级甲等","hpType":"综合医院","phone":"010-82266699"},
                        {"id":"14","name":"首都医科大学附属北京同仁医院","ShortName":"北京同仁医院","imageUrl":"http://hp.static.mingyizhudao.com/91974C5313E6648ACBAF1945A","hpClass":"三级甲等","hpType":"综合医院","phone":"010-58269911"},
                        {"id":"17","name":"北京大学肿瘤医院","ShortName":"北大肿瘤医院","imageUrl":"http://hp.static.mingyizhudao.com/713651AEBD0B3E559B95EF057","hpClass":"三级甲等","hpType":"肿瘤医院","phone":"010-88121122"},
                        {"id":"20","name":"广东省人民医院","ShortName":"广东省人民医院","imageUrl":"http://hp.static.mingyizhudao.com/98978861577C881FEB1AFD01B","hpClass":"三级甲等","hpType":"综合医院","phone":"020-83827812"},
                        {"id":"20","name":"广东省人民医院","ShortName":"广东省人民医院","imageUrl":"http://hp.static.mingyizhudao.com/98978861577C881FEB1AFD01B","hpClass":"三级甲等","hpType":"综合医院","phone":"020-83827812"}
                    ]
                });
            }, 1000);
            break;
        }
        case 73: {
            setTimeout(function () {
                base.apiOkOutput(res, {
                    "status": "ok",
                    "errorCode": 0,
                    "errorMsg": "success",
                    "results": [
                        {"id":"1","name":"上海交通大学医学院附属瑞金医院","ShortName":"上海瑞金医院","imageUrl":"http://hp.static.mingyizhudao.com/3E225BB31A12E070D933BC381","hpClass":"三级甲等","hpType":"综合医院","phone":"021-64370045"},
                        {"id":"2","name":"第二军医大学长征医院","ShortName":"上海长征医院","imageUrl":"http://hp.static.mingyizhudao.com/35668C75ED22DAB5AEE7748F0","hpClass":"三级甲等","hpType":"综合医院","phone":"021-81886999"},
                        {"id":"3","name":"复旦大学附属妇产科医院","ShortName":"上海市红房子医院","imageUrl":"http://hp.static.mingyizhudao.com/7DABBC519588846376424DAF3","hpClass":"三级甲等","hpType":"专科医院","phone":"021-33189900"},
                        {"id":"4","name":"第二军医大学长海医院","ShortName":"上海长海医院","imageUrl":"http://hp.static.mingyizhudao.com/8DAD7AC87E75536A9C8BF2932","hpClass":"三级甲等","hpType":"综合医院","phone":"021-31166666"}
                    ]
                });
            }, 1000);
            break;
        }
        case 1: {
            setTimeout(function () {
                base.apiOkOutput(res, {
                    "status": "ok",
                    "errorCode": 0,
                    "errorMsg": "success",
                    "results": [
                        {"id":"11","name":"北京协和医院","ShortName":"北京协和医院","imageUrl":"http://hp.static.mingyizhudao.com/EC23E2D7C108F984A7D5D4DF3","hpClass":"三级甲等","hpType":"综合医院","phone":"010-69156114"},
                        {"id":"12","name":"中国人民解放军总医院","ShortName":"北京301医院","imageUrl":"http://hp.static.mingyizhudao.com/018A51605CDC72E2060EC0157","hpClass":"三级甲等","hpType":"综合医院","phone":""},
                        {"id":"13","name":"北京大学第三医院","ShortName":"北医三院","imageUrl":"http://hp.static.mingyizhudao.com/5EF477AC7D2717870289F5213","hpClass":"三级甲等","hpType":"综合医院","phone":"010-82266699"},
                        {"id":"14","name":"首都医科大学附属北京同仁医院","ShortName":"北京同仁医院","imageUrl":"http://hp.static.mingyizhudao.com/91974C5313E6648ACBAF1945A","hpClass":"三级甲等","hpType":"综合医院","phone":"010-58269911"},
                        {"id":"17","name":"北京大学肿瘤医院","ShortName":"北大肿瘤医院","imageUrl":"http://hp.static.mingyizhudao.com/713651AEBD0B3E559B95EF057","hpClass":"三级甲等","hpType":"肿瘤医院","phone":"010-88121122"},
                        {"id":"20","name":"广东省人民医院","ShortName":"广东省人民医院","imageUrl":"http://hp.static.mingyizhudao.com/98978861577C881FEB1AFD01B","hpClass":"三级甲等","hpType":"综合医院","phone":"020-83827812"}
                    ]
                });
            }, 1000);
            break;
        }
        case 200: {
            setTimeout(function () {
                base.apiOkOutput(res, {
                    "status": "ok",
                    "errorCode": 0,
                    "errorMsg": "success",
                    "results": [
                        {"id":"20","name":"广东省人民医院","ShortName":"广东省人民医院","imageUrl":"http://hp.static.mingyizhudao.com/98978861577C881FEB1AFD01B","hpClass":"三级甲等","hpType":"综合医院","phone":"020-83827812"}
                    ]
                });
            }, 1000);
            break;
        }
        default: {
            setTimeout(function () {
                base.apiOkOutput(res, {
                    "status": "ok",
                    "errorCode": 0,
                    "errorMsg": "success",
                    "results": []
                });
            }, 1000);
            break;
        }
    }
});
/**
 * get the department info by hospital's id & department's id
 */
router.get("/apiwap/hospital/*/department/*", function (req, res) {
    var reqBody = req.body;
    var reqQuery = req.query;
    logger.debug("/apiwap/hospital&department", reqBody);
    logger.debug("/apiwap/hospital&department", reqQuery);
    setTimeout(function () {
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success",
            "results": {
                department:{
                    id: 828292,
                    description: {
                        position:'国内最早成立的独立骨科专业科室、目前已发展壮大成为国内外颇具一定影响的临床骨科医疗中心之一',
                        scale: '现已治疗患者3000余例，并率先在国内开展了髋关节翻修术200余例，达国内领先水平、矫正青少年脊柱侧弯畸形200余例，矫正率达60%、脊柱骨折脱位伴截瘫500余例，大大减少了伤者的伤残率；现拥有102张固定床位。 ',
                        speciality:'老年性髋关节和膝关节骨关节病、类风关、股' +
                        '骨头缺血性坏死、成年人髋关节发育不良、血友病性关节炎、膝关节韧带和半月板；镜下开展膝关节损伤半月板成形修补、交叉韧带重建、受损软骨修复、关节内骨折复位；金属假体置换、自异体腓骨移植、瘤骨灭活再植 ',
                        power:'目前的学科带头人杨庆铭教授是中华医学会骨科学会副主任委员、上海市骨科专业技术委员会主任委员、中华骨科杂志副主编，在人工关节领域享有很高的声誉，5个亚学科专业组，配有一支国内唯一的骨科手术专业护士队伍、具备独立的门急诊，拥有主任医师6名、副主任医师10名。 ',
                        honor:'•骨科先后承担国家级、部市级科研课题和局级课题41项，获奖项目7项，在核心期刊发表论文200余篇•荣获上海市第三届临床医疗成果三等奖'
                    }
                }
            }
        });
    }, 1000);
});
/**
 * get the hospital info
 */
router.get("/apiwap/hospital/*", function (req, res) {
    var reqBody = req.body;
    var reqQuery = req.query;
    logger.debug("/apiwap/hospital/", reqBody);
    logger.debug("/apiwap/hospital/", reqQuery);
    setTimeout(function () {
        var id = parseInt(req.originalUrl.split('/apiwap/hospital/')[1]);
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success",
            "results": {
                "hospital": {
                    "id": "1",
                    "address":"上海市黄浦区瑞金二路197号",
                    "name": "上海交通大学医学院附属瑞金医院",
                    "ShortName": "上海瑞金医院(Id="+id+")",
                    "class":"三级甲等",
                    "description":"上海交通大学医学院附属瑞金医院建于1907年，原名广慈医院，是一所大型综合性教学三级甲等医院。医院占地面积12万平方米，建筑面积24.5万平方米，绿化面积4万平方米，核定床位1600张，全院职工3496人，其中医师1010余人（正副教授及各类高级科技人员593人）。瑞金医院拥有一大批在国内外享有较高知名度的医学专家，其中包括3名两院院士（中国科学院院士1人，中国工程院院士2人），1名欧洲科学院院士，2名发展中国家科学院院士，5名长江学者特聘教授，3名国家“973”项目首席科学家，9名国家杰出青年科学基金获得者等。↵瑞金医院于20世纪50年代成功抢救邱财康后，大面积烧伤治疗始终处于世界先进水平；70年代在国内率先开展了心脏和肝脏的移植手术；90年代在白血病分子生物学研究和临床医疗领域取得了重大进展；21世纪日臻完善的器官移植，使得许多病人将这里视为生命的绿洲。为此，医院获得了全国卫生系统先进集体（6次）、全国“五四”红旗团组织创建单位等.",
                    "phone":"021-64370045",
                    "type":"综合医院",
                    "website":"上海市黄浦区瑞金二路197号"
                },
                "departments": {
                    "内科": [
                        {
                            "id": "1701",
                            "name": "心内科"
                        }
                    ],
                    "外科": [
                        {"id": "731", "name": "普外科"},
                        {"id": "1755", "name": "乳腺疾病诊治中心"},
                        {"id": "730", "name": "泌尿外科"},
                        {"id": "1780", "name": "肛肠外科"}
                    ],
                    "骨科": [
                        {"id":"729", "name":"骨科"}
                    ]
                },
                "deptUrl": "http://192.168.31.222/myzd/api/hospitaldept/"
            }
        });
    }, 1000);
});
module.exports = router;