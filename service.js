// 管理账号信息
const USERS_KEY = 'USER_KEY';
const TOKEN_KEY = 'TOKEN_KEY';

const getUserInfo = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		return {
			avatar: '../../static/img/avatar.png',
			bottom_text: '广州锐合技术支持QQ：8396048',
			level_name: '普通会员',
			nickname: '锐合网络',
			uid: 0,
			icode: '18024553545'
		}; 
	}
	return ret;
}
const User_paw = function(user, paw) {
	let User_paw = []
	User_paw.push(user)
	User_paw.push(paw)
	uni.setStorageSync('User_paw', User_paw)
	// return User_paw
}
const Memory = function(memory) {
	uni.setStorageSync('memory', memory)
}

const setUserInfo = function(data) {
	uni.setStorage({
		key: USERS_KEY,
		data: data
	});
}

const setToken = function(token) {
	uni.setStorageSync(TOKEN_KEY, token);
}

const getToken = function() {
	return uni.getStorageSync(TOKEN_KEY);
}

const removeToken = function() {
	uni.clearStorage();
}

const setId = function(id) {
	uni.setStorageSync('uid', id);
}

const getId = function() {
	return uni.getStorageSync('uid');
}

const setLogid = function(logid) {
	uni.setStorageSync('logid', logid);
}

const getLogid = function() {
	return uni.getStorageSync('logid');
}
const config = {
	arch: '',
	receive: '',
	status: '',
	freeze: '',
	species: '',
	version: '1.0.2'
}

 const _api_root = 'http://0365.8396048.com/';//'http://0365.8396048.com/'//
// const _api_root = 'http://cjl.chefuwu8.com/';


const api = {
	home: {
		info: _api_root + 'api/member/info', //获取会员信息-车聚利
		captcha: _api_root + 'api/service/captcha', //图形验证码
		uploadImgHLF: _api_root + 'api/insurance/uploadImg', //POST上传图片-HLF的接口
		liability: _api_root + 'api/member/liability',//GET免责声明
		inform: _api_root + 'api/index/inform',//GET获取首页平台公告
		hero: _api_root + 'api/index/hero',//GET 出单英雄轮播
		category: _api_root + 'api/merch/category',//POST店铺分类列表
	},
	login: {
		login: _api_root + 'api/login/index', // 登录-车聚利
		forget: _api_root + 'api/login/forgetpwd', // 忘记密码-车聚利
		logo: _api_root + 'api/login/get_enter_logo', //  获取网站信息 -车聚利
		unbind: _api_root + 'api/login/unbind', //  解除绑定-车聚利
		emailForgetpwd: _api_root + 'api/login/emailForgetpwd' ,//邮箱忘记密码
		emailunbind: _api_root + 'api/login/emailunbind'   //解除绑定
	},
	reg: {
		reg: _api_root + 'api/login/register', //注册-车聚利
		code: _api_root + 'api/login/verifycode', //获取验证码-车聚利
		agree: _api_root + 'api/login/get_user_regagree', //获取注册协议-车聚利
		sendEmailCode: _api_root + 'api/login/sendEmailCode' ,//邮箱验证码 
		emailRegister: _api_root + 'api/login/emailRegister' //邮箱注册
	},
	index: {
		carRealname: _api_root + 'api/member/carRealname', //POST 车主认证提交-车聚利
		myTeamDetail: _api_root + 'api/member/myTeam', //-车聚利
		team: _api_root + 'api/member/myTeams', //我的团队详情-车聚利
		getSlide: _api_root + 'api/index/getSlide', // 首页轮播图-车聚利
		articleList: _api_root + 'api/article/articleList', //GET 新手指南
		articleCate: _api_root + 'api/article/articleCate', //GET 新手指南
		articlContent: _api_root + 'api/article/articlContent', //GET 新手指南
		index: _api_root + 'api/benefit/index', //GET 人人公益展示数据
		insurance_details: _api_root + 'api/insurance/insurance_details', //GET 人人公益展示数据HLF
		getArticle: _api_root + 'api/benefit/getArticle', //GET 人人公益文章列表
		unfreezeRecord: _api_root + 'api/integral/unfreezeRecord', //GET 积分解冻申请记录
		unfreezeSubmit: _api_root + 'api/integral/unfreezeSubmit', //POST 申请解冻提交
		unfreezeList: _api_root + 'api/integral/unfreezeList', //POST 申请解冻列表
		articleDetail: _api_root + 'api/benefit/articleDetail', //GET 人人公益文章详情和评论
		commentSubmit: _api_root + 'api/benefit/commentSubmit', //POST 提交评论
		applyRelief: _api_root + 'api/benefit/applyRelief', // POST 人人公益申请救济
		myMiningMachine: _api_root + 'api/member/myMiningMachine', //我的任务（当家做主）
		machineCates: _api_root + 'api/member/machineCates', //任务列表（当家做主）
		byMiningMachine: _api_root + 'api/member/byMiningMachine', //任务兑换（当家做主）
		provinceCity: _api_root + 'api/area/index', //GET获取地址列表
		insuranceCompany: _api_root + 'api/insurance/insuranceCompany', //GET获取省市下的保险公司列表
		diyFields: _api_root + 'api/insurance/diyFields', //GET获取各类模板数据结构
		insuranceCate: _api_root + 'api/insurance/insuranceCate', //GET获取公司下的险种列表
		diyformSubmit: _api_root + 'api/insurance/diyformSubmit', //POST提交车险购买资料
		comment_list: _api_root + 'api/merch/comment_list', //POST评价列表-店铺信息页面
		comment: _api_root + 'api/merch/comment', //POST评价-店铺评价
		growthList: _api_root + 'api/member/growthList', //GET贡献等级列表
		check_status: _api_root + 'api/member/check_status', //GET实名认证状态
		car_check: _api_root + 'api/member/car_check', //GET车主认证状态
		loansLog: _api_root + 'api/insurance/loansLog', //GET贷款记录
		verifycode: _api_root + 'api/member/verifycode', //GET 获取验证码（内部）
		ex_stock: _api_root + 'api/stock/ex_stock', //POST股权兑换
		my_team: _api_root + 'api/stock/my_team',//POST我的团队QS
		direct_user: _api_root + 'api/stock/direct_user',//POST直推用户列表
		subscribe: _api_root + 'api/merch/subscribe',//POST预约
		publicqrcode: _api_root + 'api/benefit/publicqrcode',//公众号二维码
		cargetArticle: _api_root + 'api/car/getArticle' ,//汽车首页文章
		cararticleDetail: _api_root + 'api/car/articleDetail'  , //汽车详情
		commentSubmit: _api_root + 'api/car/commentSubmit' //发布评论
	},
	main: {
		avatar: _api_root + "api/member/modifyingHead", //修改头像-车聚利
		asset: _api_root + "api/member/asset", //GET 资产-车聚利
		dailyCheckin: _api_root + "api/member/dailyCheckin", //GET 每日签到
		purchasingOrder: _api_root + "api/order/purchasingOrder", //GET 获取订单列表
		getQuotationData: _api_root + "api/service/getQuotationData", //交易中心页面详情
		merch_list: _api_root + "api/merch/merch_list", //POST店铺列表
		exchange: _api_root + "api/merch/sale_exchange", //核销兑换券
		purchasingOrder: _api_root + 'api/order/purchasingOrder' //交易中心搜索
	},
	set: {
		changePwd: _api_root + "api/member/changePwd", //POST修改密码-车聚利
		changePwd2: _api_root + "api/member/changePwd2", //POST修改交易密码-车聚利
		forget2: _api_root + 'api/member/forgetpwd2', // POST忘记密码-车聚利
		modifyingNickname: _api_root + "api/member/modifyingNickname", //修改昵称-车聚利
		paytype: _api_root + "api/member/paytype", //POST 展示收款方式
		submitPaytype: _api_root + "api/member/submitPaytype", //POST 提交/修改支付账号
	},
	record: {
		getWtilog: _api_root + 'api/member/getWtilog', //GET 获取车贝明细-车聚利
		getActivitylog: _api_root + 'api/member/getActivitylog', //GET 获取马力明细-车聚利
		getglorylog: _api_root + 'api/member/getglorylog', //GET 获取荣誉值明细-车聚利
		index: _api_root + 'api/integral/index', //GET 积分数据展示-车聚利
		integralDetail: _api_root + 'api/integral/integralDetail', //GET 积分详细
		withdrawSubmit: _api_root + 'api/integral/withdrawSubmit', //POST 积分提现提交
		withdrawRecord: _api_root + 'api/integral/withdrawRecord', //GET 积分提现记录
		getTransactionDetail: _api_root + 'api/order/getTransactionDetail', //GET 获取交易详情
		orderComplaint: _api_root + 'api/order/orderComplaint', //POST 订单申诉
		auditPassOrder: _api_root + 'api/order/auditPassOrder', //POST 审核交易订单4
		getTransactionPay: _api_root + 'api/order/getTransactionPay', //POST 提交交易支付3
		partner_status:_api_root + 'api/stock/partner_status',//POST获取申请合伙人状态
		apply_province_partner: _api_root + 'api/stock/apply_province_partner',//POST申请省合伙人
		apply_city_partner: _api_root + 'api/stock/apply_city_partner',//POST申请城市合伙人
		my_city: _api_root + 'api/stock/my_city',//POST城市大厅
		stock_log: _api_root + 'api/stock/stock_log',//POST股权兑换明细
		stock_total: _api_root + 'api/stock/stock_total',//POST股权累计数量
		withdrawDetail: _api_root + 'api/integral/withdrawDetail',//积分提现支付状态
		reliefFund: _api_root + 'api/Benefit/reliefFund',//GET 救济申请数据展示
		getContributionlog: _api_root + 'api/member/getContributionlog',//GET贡献值明细
		jdList: _api_root + 'api/member/jdList',//GET京东推广列表
	},
	center: {
		friends: _api_root + 'api/member/inviteFriends', //GET 邀请好友
		getTransactionInfo: _api_root + 'api/order/getTransactionInfo', //GET 获取交易列表
		submitPurchasing: _api_root + 'api/order/submitPurchasing', // 发布买单
		claimPurchasingOrder: _api_root + 'api/order/claimPurchasingOrder', //POST 认领交易订单（卖给他）2
		cancelPurchasingOrder: _api_root + 'api/order/cancelPurchasingOrder', //GET 取消订单（买单）
		financialCard: _api_root + 'api/insurance/financialCard', //信用卡图文列表
		apply_merch: _api_root + 'api/merch/apply_merch', //POST申请商家
		check_status: _api_root + 'api/merch/check_status', //POST查询申请商铺状态
		insuranceLog: _api_root + 'api/insurance/insuranceLog', //GET车险申请记录
		diyformCheck: _api_root + 'api/insurance/diyformCheck', //POST提交车险购买凭证
		diyFields: _api_root + 'api/insurance/diyFields',//副本-获取各类模板数据结构
		loans: _api_root + 'api/insurance/loans',//POST申请贷款资料提交接口
	},
	user: {
		updateIdImage: _api_root + 'api/member/uploadImg', // 上传图片-车聚利  
		deleteImg: _api_root + 'api/member/deleteImg', // 删除图片-车聚利
		upIdentityCard: _api_root + 'api/member/realname', // 实名验证-车聚利
	},
	realName: {
		paymentCost: _api_root + "api/member/paymentCost",//支付接口
		getVerificationStep: _api_root + "api/member/getVerificationStep",//获取实名验证步骤
		getRealnameVerifyToken: _api_root + "api/member/getRealnameVerifyToken",//获取实名提交码
		realname: _api_root + "api/member/realname",//提交实名信息
		bindAccount: _api_root + "api/member/bindAccount",//绑定账号
		usdtSubmit: _api_root +'api/member/usdtSubmit'  //  邮箱实名认证
	},
	news: {

	},
	service: {
		//cardCheck: _api_root + 'api/insurance/cardCheck', //GET-提交信用卡首刷审核资料 
		cardLog: _api_root + 'api/insurance/cardLog', //GET-获取信用卡申请记录列表 
		cardCheck: _api_root + 'api/insurance/cardCheck', //提交信用卡首刷审核资料
		cardList: _api_root + 'api/insurance/cardList', //信用卡类别
		posLog: _api_root + 'api/insurance/posLog', //获取POS机申请记录列表
		posCheck: _api_root + 'api/insurance/posCheck', //pos机审核资料上传
		uploadImg: _api_root + 'api/insurance/uploadImg', //pos机上传图片
		exchange: _api_root + 'api/merch/exchange', //兑换券列表
		get_exchange: _api_root + 'api/merch/get_exchange', //领取兑换券
		exchange_log: _api_root + 'api/merch/exchange_log', //我的兑换券
		team_level_list: _api_root + 'api/stock/team_level_list', //POST团队等级列表
		exchangelist: _api_root + '/api/merch/sale_exchange_log', //核销记录
		potcode: _api_root + 'api/merch/sale_exchange_code', //生成收券码
		settlement: _api_root + 'api/merch/commision_num', //可结算数据
		settle: _api_root + 'api/merch/commision_settle', //申请结算
		auditcom: _api_root + 'api/merch/commision_list', //佣金审核
		appoinlist: _api_root + 'api/merch/sub_list', //预约列表
		businesscenter: _api_root + 'api/merch/my_merch', //我的兑换券
		workorderList: _api_root + 'api/service/workorderList',//GET工单列表
		submitWorkorder: _api_root + 'api/service/submitWorkorder',//POST 工单提交
		sub_agree: _api_root + '/api/merch/sub_agree',//POST预约处理
		notice: _api_root + 'api/service/notice' //公告
	},
	interests: {

	},
	green: {

	},
	pos: {
		poslist: _api_root + 'api/insurance/posList', //POS机列表
		fields: _api_root + 'api/insurance/diyFields?type=3', //获取POS机模板数据结构
		check: _api_root + 'api/insurance/posApplyCheck', //POS机申请
	}
}


const auth = function(self, url, method, data, _success) {
	var token = uni.getStorageSync('accessToken');
	if (token == '') {
		uni.showToast({
			icon: 'none',
			title: '无效的登录,请重新登录',
			duration:2000
		});
		console.log(this)
		uni.setStorageSync('accessToken', '');
		uni.reLaunch({
			url: '/pages/login/login',
		});
	}
	var data = {
		// token: uni.getStorageSync('accessToken'),
		...data
	}
	uni.request({
		url: url,
		method: method,
		data: data,
		header: {
			Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
		},
		success: (res) => {
			var res = res.data;
			if (res.code == 1) {
				_success(self, res);

			} else {
				if (res.code == 400) {
					uni.showToast({
						icon: 'none',
						title: '无效的登录,请重新登录--',
						duration:2000
					});
					uni.setStorageSync('accessToken', '');
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 2000);
				} else if (res.code == 0) {
					uni.showToast({
						icon: 'none',
						title: res.info,
						duration:2000
					});
				} else if (res.code == 401) {
					uni.showToast({
						icon: 'none',
						title: res.info,
						duration:2000
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '无效的登录,请重新登录'
					});
					uni.setStorageSync('accessToken', '');
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 2000);
				}
			}
		},
		fail: res => {
			console.log(res)
			uni.showToast({
				icon: 'none',
				title: '网站消息获取错误',
				duration:2000
			});
			setTimeout(function() {
				uni.reLaunch({
					url: '/pages/login/null'
				});
			}, 2000);
		},
		complete: (data) => {
			var data = data.data;
			if (data.code == 13) {
				uni.showToast({
					icon: 'none',
					title: data.info,
					duration:2000
				});
				this.removeToken();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
			uni.hideLoading();
		}
	});
}

const req = async function(parmas) {
	let result = await new Promise((resolve, reject) => {
		uni.request({
			url: parmas.url,
			data: parmas.data,
			header: {
				Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
			},
			method: parmas.method,
			success: (res) => resolve(res),
			fail: (res) => reject(res)
		});
	});
	return result
}

const loadthepage = async function(parmas) {
	if (parmas.that.loadshow) {
		parmas.that.loadshow = false;
		let result = await req(parmas);
		console.log(result, 'result');
		if (parmas.direct) {
			let page = parmas.that.page + 1;
			if (parmas.that.page < parmas.that.pages) {
				parmas.that.loadshow = true;
				parmas.that.listsss = [...parmas.that.listsss, ...result.data.data.data]
				console.log(parmas.that.listsss, 'parmas');
				parmas.that.page = page;
				parmas.that.pages = result.data.data.last_page;
				if (parmas.that.page == parmas.that.pages || parmas.that.listsss.length == 0) {
					parmas.that.loadshow = false;
				} else {
					parmas.that.loadshow = true;
				}
			} else {
				parmas.that.loadshow = false;

			}
		} else {
			return result
		}

	}
}
const downLoad = function(self, url, data, type, _success) {
	uni.request({
		url: url,
		method: type,
		data: data,
		header: {
			Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
		},
		success: res => {
			var res = res.data;
			_success(self, res);
		},
	});
}
export default {
	api,
	auth,
	setToken,
	getToken,
	removeToken,
	getUserInfo,
	setUserInfo,
	setId,
	getId,
	setLogid,
	getLogid,
	config,
	User_paw,
	Memory,
	_api_root,
	req,
	loadthepage,
	downLoad
}
