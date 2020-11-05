<template>
	<view class="bg">
		<view class="content">
			<view class="headers">
				<view class="header_icon" @click="back()"><image src="../../static/icon/left_whitch.png" mode="widthFix"></image></view>
				<view class="header_title">{{ titlt }}</view>
				<view class="header_jump">{{ subtitle }}</view>
			</view>

			<view class="log_groud">
				<view>
					<view class="navbar">
		<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
					</view>
				
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
						<scroll-view class="list-scroll-content" scroll-y>
							<!-- <view class="page_name">用户注册</view> -->
							<view class="aa">
								
							
							<block v-if="tabIndex==0">
								<view class="log">
									<!-- <text>手机号码</text> -->
									<image src="../../static/login/login_phone.png" mode="widthFix"></image>
									<view class="log_input"><input type="text" v-model="account" placeholder="请输入你的手机号码" maxlength="11" /></view>
								</view>
								<view class="log">
									<!-- <text>验证码</text> -->
									<image src="../../static/reg/verification.png" mode="widthFix"></image>
									<view class="log_input">
										<input type="text" v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
										<block v-if="countdown > 61"><text @click="send()">获取验证码</text></block>
										<block v-if="countdown == 61"><text @click="send()">重新发送</text></block>
										<block v-if="countdown < 61">
											<text>{{ countdown }}</text>
										</block>
									</view>
								</view>
							
							
							<view class="log">
								<!-- <text>登录密码</text> -->
								<image src="../../static/login/login_pw.png" mode="widthFix"></image>
								<view class="log_input"><input type="password" v-model="pwd" placeholder="请输入登录密码" maxlength="20" /></view>
							</view>
							<view class="log">
								<!-- <text>确认登录密码</text> -->
								<image src="../../static/reg/presenter.png" mode="widthFix"></image>
								<view class="log_input"><input type="password" v-model="pwd2" placeholder="请输入置换密码" maxlength="6" /></view>
							</view>
							<view class="log">
								<!-- <text>邀请码</text> -->
								<image src="../../static/reg/interview.png" mode="widthFix"></image>
								<view class="log_input"><input type="text" v-model="invite_code" placeholder="请输入邀请码" maxlength="20" /></view>
							</view>
							<view class="log">
								<!-- <text>邀请码</text> -->
								<image src="../../static/reg/loadress.png" mode="widthFix"></image>
								<view class="log_input">
							<input type="text" v-model="allcity" placeholder="选择省份" placeholder-class="placsty" maxlength="20" disabled @click="select1()" />
								</view>
							</view>
							<!-- <view class="log">
					 <text>邀请码</text> 
					<image src="../../static/me/position.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="city1" placeholder="选择城市" maxlength="20" disabled @click="select2()"/>
					</view>
				</view> -->
							<view class="agree">
								<label @click="checkeds()">
									<radio :checked="checked" color="#2189FF" />
									我已阅读并同意
									<text @click="readreg()">用户协议</text>
								</label>
							</view>
							<view class="btn" v-if="throttle"><view class="btn_button" @click="registered()">立即注册</view></view>
							<view class="btn" v-else>
								<view class="btn_button">
									<!-- @click="registered()" -->
									立即注册
								</view>
							</view>
							<!-- #ifdef APP-PLUS -->
							<!-- <view class="btn1">
							 <view class="btn_button1" @click="jum('')">
								下载马拉赞App
							 </view>
						</view> -->
							<!-- #endif -->
							<!-- #ifdef H5 || MP-WEIXIN -->
							<view class="btn1">
								<view class="btn_button1" @click="jum()">
									<!-- '/pages/reg/download' -->
									下载车聚利App
								</view>
							</view>
							<!-- #endif -->
							</block>
							
							
							<block v-if="tabIndex==1">
											<view class="log">
												<!-- <text>手机号码</text> -->
												<image src="../../static/login/email.png" mode="widthFix"></image>
												<view class="log_input"><input type="text" v-model="email" placeholder="请输入你的邮箱号" maxlength="35" /></view>
											</view>
											<view class="log">
												<!-- <text>验证码</text> -->
												<image src="../../static/reg/verification.png" mode="widthFix"></image>
												<view class="log_input">
													<input type="text" v-model="emailCode" maxlength="6" placeholder="请输入验证码" />
													<block v-if="countdown > 61"><text @click="emailCodes()">获取验证码</text></block>
													<block v-if="countdown == 61"><text @click="emailCodes()">重新发送</text></block>
													<block v-if="countdown < 61">
														<text>{{ countdown }}</text>
													</block>
												</view>
											</view>
										
										
										<view class="log">
											<!-- <text>登录密码</text> -->
											<image src="../../static/login/login_pw.png" mode="widthFix"></image>
											<view class="log_input"><input type="password" v-model="password" placeholder="请输入登录密码" maxlength="20" /></view>
										</view>
										<view class="log">
											<!-- <text>确认登录密码</text> -->
											<image src="../../static/reg/presenter.png" mode="widthFix"></image>
											<view class="log_input"><input type="password" v-model="password2" placeholder="请输入置换密码" maxlength="6" /></view>
										</view>
										<view class="log">
											<!-- <text>邀请码</text> -->
											<image src="../../static/reg/interview.png" mode="widthFix"></image>
											<view class="log_input"><input type="text" v-model="invite_code" placeholder="请输入邀请码" maxlength="20" /></view>
										</view>
										<view class="log">
											<!-- <text>邀请码</text> -->
											<image src="../../static/reg/loadress.png" mode="widthFix"></image>
											<view class="log_input">
												<input type="text" v-model="allcity" placeholder="选择省份" placeholder-class="placsty" maxlength="20" disabled @click="select1()" />
											</view>
										</view>
										<!-- <view class="log">
								 <text>邀请码</text> 
								<image src="../../static/me/position.png" mode="widthFix"></image>
								<view class="log_input">
									<input type="text" v-model="city1" placeholder="选择城市" maxlength="20" disabled @click="select2()"/>
								</view>
							</view> -->
										<view class="agree">
											<label @click="checkeds()">
												<radio :checked="checked" color="#2189FF" />
												我已阅读并同意
												<text @click="readreg()">用户协议</text>
											</label>
										</view>
										<view class="btn" v-if="throttle"><view class="btn_button" @click="eamilRegistered()">立即注册</view></view>
										<view class="btn" v-else>
											<view class="btn_button">
												<!-- @click="registered()" -->
												立即注册
											</view>
										</view>
										<!-- #ifdef APP-PLUS -->
										<!-- <view class="btn1">
										 <view class="btn_button1" @click="jum('')">
											下载马拉赞App
										 </view>
									</view> -->
										<!-- #endif -->
										<!-- #ifdef H5 || MP-WEIXIN -->
										<view class="btn1">
											<view class="btn_button1" @click="jum()">
												<!-- '/pages/reg/download' -->
												下载车聚利App
											</view>
										</view>
										<!-- #endif -->
										</block>
										</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			</view>
		</view>
		<view class="mask" v-if="showwind == 1 || showtext == 2" @click="showwinds"><!-- 遮罩层 --></view>

		<!-- <view class="mask" v-show="show == 1" @click="show = 0">
			 遮罩 
		</view> -->
		<view :class="['selcitybox', { active: showwind == 1 }]">
			<view class="pick_header">
				<view class="pick_left" @click="cancel"><text>取消</text></view>
				<view class="pick_midd"><text>选择城市</text></view>
				<view class="pick_right" @click="comsel"><text>完成</text></view>
			</view>
			<picker-view class="selcityit" :indicator-style="indicatorstyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item, index) in citys" :key="index">{{ item.label }}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item, index) in citys1" :key="index">{{ item.label }}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- <view class="choice_city" :class="show===0 ? 'mask_none' : show===1 ? 'mask_show' : ''">
			<view class="ci_test1">
				请选择
			</view>
			<view class="ci_box">
				<scroll-view class="box_H" scroll-y scroll-top='0'>
					<view class="H_city_test">
						选择省份/地区
					</view>
					<view class="addreebox">
						<view class="adbox">
						<view class="H_city" v-for="(item,index) in citys" :key="index" @click="choice_province(item.label, item.childrens , index )">
							{{item.label}}
						</view>
						</view>
						<view class="adbox122">
						<view class="addchir" v-for="(it , i) in citys2" :key="i" @click="choice_province2(it.label, index )">
							{{it.label}}
						</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view> -->

		<!-- 用户协议 -->
		<view class="notice_box" v-html="richt" v-if="showtext == 2"></view>
	</view>
</template>

<script>
import service from '../../service.js';
import cityData from '@/components/citydata.js';
export default {
	data() {
		return {
			email:'',
			emailCode:'',
			password:'',
			password2:'',
			tabIndex: 0,
			navList: [
				{
					text: '手机号注册',
					state: '0'
				},
				{
					text: '邮箱号注册',
					state: '1'
				}
			],
			show: 0,
			titlt: '',
			subtitle: '',
			countdown: 62,
			checked: true,
			account: '',
			nickname: '',
			pwd: '',
			pwd2: '',
			verifycode: '',
			show_id: '',
			invite_code: '',
			index: 0, // 选择城市第一次点击省份的索引
			index1: 0,
			city: '', // 省份
			city1: '', // 城市
			allcity: '', //省份城市
			// aggregate:[],
			citys: [],
			citys1: [],
			// oldCityList:[],
			// address:[]
			url: '', //外部链接
			value: [],
			indicatorstyle: 'border-top:4upx solid #DADADA;border-bottom:4upx solid #DADADA;height:100upx;text-align:center;',
			showwind: 0,
			showtext: 0,
			richt: '', //用户协议
			throttle: true //防止用户多次点击
		};
	},
	methods: {
		//swiper 切换
		changeTab(e) {
			this.tabClick(e.target.current);
		},

		//顶部tab点击
		tabClick(index) {
			this.change(index);
		},
		change(index) {
			this.type = this.navList[index].type;
			this.tabIndex = index;
		},
		showwinds() {
			this.showwind = 0;
			this.showtext = 0;
		},
		/*------城市选择-------*/
		select1() {
			//选择城市
			this.allcity = '';
			this.citys = cityData;
			console.log(this.citys);
			this.showwind = 1;
			this.city = ''; // 省份
			this.city1 = ''; // 城市
			// this.index = 0;
			// this.index1 = 0;
		},
		bindChange: function(e) {
			//prck-view自带点击事件 e会获得选中数组的下标
			this.index = e.detail.value[0];
			this.index1 = e.detail.value[1];
			this.citys1 = this.citys[this.index].childrens;
			console.log(e, this.index);
			this.city = this.citys[this.index].label;
			this.city1 = this.citys1[this.index1].label;
		},
		cancel() {
			//取消选择城市
			this.showwind = 0;
		},
		comsel() {
			//完成选择城市
			if (this.city == '') {
				this.city = this.citys[0].label;
			}
			if (this.city1 == '') {
				this.citys1 = this.citys[this.index].childrens;
				this.city1 = this.citys1[0].label;
			}
			this.allcity = this.city + ' ' + this.city1;
			console.log(this.allcity);
			this.showwind = 0;
		},
		/*------城市选择-------*/

		back() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		jump(url) {
			uni.navigateTo({
				url: url
			});
		},
		// 跳转下载链接
		jum() {
			uni.navigateTo({
				url: '/pages/reg/download'
			});
		},
		checkeds() {
			this.checked = !this.checked;
			console.log(this.checked);
		},
		// select1() {
		// 	this.show = 1;
		// 	// 第一次点击清空所有城市
		// 	this.city = '';
		// 	this.city1 = '';
		// 	this.citys2 = '';
		// 	// 加载所有数据
		// 	this.citys = cityData;
		// 	console.log(this.citys)
		// },
		// -----
		// select2() {
		// 	if (this.city == '') {
		// 		uni.showToast({
		// 			title: '请先选择省份',
		// 			icon: 'none'
		// 		})
		// 		return
		// 	}
		// 	this.show = 1;
		// 	this.citys = cityData[this.index].childrens
		// },
		// choice_province(name, ct2, index) { //选择地区
		// 	if (this.city == '' && this.city1 == '') {
		// 		this.city = name;
		// 		this.index = index;
		// 		this.citys2 = ct2;

		// 	} else {
		// 		// this.city1 = name;
		// 		this.city = '';
		// 		this.city = name;
		// 		this.citys2 = '';
		// 		this.citys2 = ct2;
		// 	}
		// 	----------
		// this.show = 0;
		// this.city = ''
		// this.aggregate.push(name)
		// console.log(this.aggregate.length);
		// if (this.aggregate.length == 1) {
		// this.index = index;
		// this.citys = cityData[index].childrens;
		// this.oldCityList = cityData[index].childrens;
		// this.show = 0;
		// this.city = this.aggregate[0]
		// this.citylistIndex = index;
		// console.log(this.oldCityList)
		// } else if (this.aggregate.length == 2) {
		// this.citys = cityData[index].childrens;
		// this.show = 0;
		// this.address = this.aggregate;
		// console.log(this.address[0],this.address[1]);
		// this.city1 = this.aggregate[1]
		// console.log(this.address);
		// this.citys = this.oldCityList[index].childrens;
		// }

		// },
		// choice_province2(name,index){

		// 	this.city1 = name;
		// 	this.show = 0;
		// 	this.allcity = this.city + name;
		// },
		send() {
			var self = this;
			if (self.checked == false) {
				uni.showToast({
					icon: 'none',
					title: '未同意用户协议'
				});
				return;
			}
			uni.request({
				url: service.api.reg.code,
				method: 'GET',
				data: {
					mobile: this.account,
					temp: 'sms_reg'
				},
				success: res => {
					console.log(res);
					var res = res.data;
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						self.codetime(self, 60);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						return;
					}
				}
			});
			// this.codetime(this,60);
		},
		emailCodes(){
			var self = this;
			if (self.checked == false) {
				uni.showToast({
					icon: 'none',
					title: '未同意用户协议'
				});
				return;
			}
			uni.request({
				url: service.api.reg.sendEmailCode,
				method: 'GET',
				data: {
					email: self.email,
				},
				success: res => {
					console.log(res);
					var res = res.data;
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						self.codetime(self, 60);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.info
						});
						return;
					}
				}
			});
			},
		//手機驗證碼獲取倒計時
		codetime: function(obj, num) {
			if (num < 10) {
				obj.countdown = '0' + num;
			} else {
				obj.countdown = num;
			}
			num--;
			if (num < 0) {
				obj.countdown = 61;
			} else {
				setTimeout(function() {
					obj.codetime(obj, num);
				}, 1000);
			}
		},
		registered() {
			var self = this;
				if (!(/^1[3-9][0-9]\d{8,11}$/.test(self.account))) {
				uni.showToast({
					icon: 'none',
					title: '请输入11位手机号!'
				});
				return;
			}
			if (self.pwd.length < 8 && !(/(?=.*\d)(?=.*[A-z])^[0-9A-z]{8,}$/.test(self.pwd))) {
				uni.showToast({
					icon: 'none',
					title: '请输入数字与字母结合的八位数以上登录密码'
				});
				return;
			}
			if (self.pwd2.length !== 6) {
				uni.showToast({
					icon: 'none',
					title: '请输入六位数的置换密码'
				});
				return;
			}
			if (self.checked == false) {
				uni.showToast({
					icon: 'none',
					title: '未同意用户协议'
				});
				return;
			}
			if (this.city == '' || this.city1 == '') {
				uni.showToast({
					title: '请选择省份城市',
					icon: 'none'
				});
				return;
			}
			if (this.invite_code == '') {
				uni.showToast({
					title: '请输入邀请码',
					icon: 'none'
				});
				return;
			}
			uni.request({
				url: service.api.reg.reg,
				method: 'POST',
				data: {
					account: self.account,
					pwd: self.pwd,
					pwd2: self.pwd2,
					invite_code: self.invite_code,
					verifycode: self.verifycode,
					city: self.city1, // 归属城市
					province: self.city //省份
				},
				success(res) {
					console.log(res.data);
					if (res.data.code == 1) {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
						self.throttle = false;
						setTimeout(function(self, res) {
							// #ifdef H5
							uni.navigateTo({
								url: '/pages/reg/download'
							});
							// #endif

							// #ifdef APP-PLUS
							uni.reLaunch({
								url: '/pages/login/login'
							});
							// #endif
						}, 1500);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
						self.throttle = true;
					}
				}
			});
		},
		eamilRegistered(){
			var self = this;
			if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(self.email))) {
				uni.showToast({
					icon: 'none',
					title: '请输入合理的邮箱号!'
				});
				return;
			}											 
			if (self.password.length < 8 && !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(self.password))) {
				uni.showToast({
					icon: 'none',
					title: '请输入数字与字母结合的八位数以上登录密码'
				});
				return;
			}

			if (self.password2.length < 6 && !(/^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{6,}$/.test(self.password2))) {
				uni.showToast({
					icon: 'none',
					title: '请输入数字与字母结合的六位数以上置换密码'
				});
				return;
			}
			if (self.checked == false) {
				uni.showToast({
					icon: 'none',
					title: '未同意用户协议'
				});
				return;
			}
			if (this.city == '' || this.city1 == '') {
				uni.showToast({
					title: '请选择省份城市',
					icon: 'none'
				});
				return;
			}
			if (this.invite_code == '') {
				uni.showToast({
					title: '请输入邀请码',
					icon: 'none'
				});
				return;
			}
			uni.request({
				url: service.api.reg.emailRegister,
				method: 'POST',
				data: {
					email:self.email,
					verifycode:self.emailCode,
					pwd:self.password,
					pwd2:self.password2,
					invite_code: self.invite_code,
					city: self.city1, // 归属城市
					province: self.city ,//省份
				},
				success(res) {
					console.log(res.data);
					if (res.data.code == 1) {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
						self.throttle = false;
						setTimeout(function(self, res) {
							// #ifdef H5
							uni.navigateTo({
								url: '/pages/reg/download'
							});
							// #endif
			
							// #ifdef APP-PLUS
							uni.reLaunch({
								url: '/pages/login/login'
							});
							// #endif
						}, 1500);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.info
						});
						self.throttle = true;
					}
				}
			});
		},
		readreg() {
			uni.request({
				url: service.api.reg.agree,
				success: res => {
					console.log(this);
					this.richt = res.data.data.registration_agreement;
				}
			});
			this.showtext = 2;
		}
	},
	onShow() {
		// 判断是在什么系统下跳转的
		/* var url = ''
			if(uni.getStorageSync('platform') == 'ios'){
				url = uni.getStorageSync('website').ios_dwonlink
			}else{
				url = uni.getStorageSync('website').android_dwonlink
			}
			this.url = url */
		/* var res = uni.getSystemInfoSync()
			console.log(res.platform) */
		// 拿到下载的网址
		uni.request({
			url: service.api.login.logo,
			success(res) {
				console.log(res.data);
				if (res.data.code == 1) {
					uni.setStorageSync('website', res.data.data);
					console.log(1);
				}
			}
		});

		var self = this;
		setTimeout(function() {
			// 判断是什么系统
			uni.getSystemInfo({
				success(res) {
					uni.setStorageSync('platform', res.platform);
					// console.log(typeof(res.platform) )
					if (res.platform == 'ios') {
						self.url = uni.getStorageSync('website').ios_dwonlink;
					} else {
						self.url = uni.getStorageSync('website').android_dwonlink;
					}
					console.log(2);
				}
			});
		}, 500);
	},
	onLoad(op) {
		this.invite_code = op.invite_code;
		console.log(op);
		if (op.show_id) {
			this.show_id = op.show_id;
			console.log(op.show_id);
		}

		// console.log(uni.getStorageSync('website').ios_dwonlink,uni.getStorageSync('website').android_dwonlink)
		// console.log(uni.getStorageSync('website').android_dwonlink)
		// if(op.invitation_code){
		// 	this.xx = 0;
		// 	this.invitation_code = options.invitation_code;
		// }
	}
	// watch:{
	// 	show(newvalue,oldvalue){
	// 		this.aggregate = []
	// 		if(this.city == ''){
	// 			this.citys = cityData;
	// 		}
	// 	}
	// }
};
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	/* height: 100%; */
	box-sizing: border-box;
	padding: 0 30rpx;
	padding-top: var(--status-bar-height);
	padding-bottom: 100rpx;
	overflow: auto;
	background: none;
	/* padding-top: calc(102rpx + var(--status-bar-height)); */
	/* padding-top: 102rpx; */
	/* padding-top: 100rpx; */
}

.navbar {
	border-radius: 10upx 10upx 0  0;
	width:100%;
	display: flex;
	height: 50px;
	// padding: 0 5px;
	background: #fff;
	/* margin-top: calc(var(--status-bar-height) + 88upx); */
	box-shadow: 0px 4upx 8upx #dcdfe6;
	// position: fixed;
	// z-index: 4000;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		// border-right: 2px solid #2189ff;
	font-size: 35rpx;
	font-weight: bold;
		color: #999;
		position: relative;
		
		&.current {
			// color: #f97020;
			color: #2189ff;
			font-size: 35rpx;
			font-weight: bold;
			border-bottom: 2px solid #2189ff;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 60px;
				height: 0;
				/* border-bottom: 2px solid #fa436a; */
			}
		}
	}
	.nav-item:last-of-type{
		border-right: none;
		}
}
.aa{
	box-sizing: border-box;
	// margin-top: 60rpx;
	padding: 0 50rpx;
	
}
.log_groud {
	width: 100%;
	background: #ffffff;
	border-radius: 10rpx;
	box-shadow: 0 0 10rpx #2189ff;
	z-index: 3000;
}

.swiper-box {
	height: 1200upx;
}
.headers {
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: nowrap;
}

.headers view {
	width: 200rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}

.headers .header_icon {
	/* width: 100%; */
	/* display: flex; */
	justify-content: flex-start;
	/* padding: 0 30rpx; */
}

.header_icon image {
	width: 50rpx;
	height: 50rpx;
}

.header_title {
	color: #333333;
	font-size: 30rpx;
	font-weight: bold;
}

// .log_groud {
// 	width: 100%;
// 	box-sizing: border-box;
// 	/* margin-top: 60rpx; */
// 	padding: 0 50rpx;
// 	background: #ffffff;
// 	// border-radius: 10rpx;
// 	box-shadow: 0 0 10rpx #2189ff;
// 	// border-top: 1px solid #000;
	
// }

.page_name {
	width: 100%;
	/* height: 100rpx; */
	box-sizing: border-box;
	padding: 30rpx 0;
	color: #2189ff;
	font-size: 38rpx;
	font-weight: bold;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.log {
	width: 100%;
	margin-top: 30rpx;
	box-sizing: border-box;
	/* padding: 0 50rpx; */
	/* height: 100rpx; */
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2rpx solid #2189ff;
	border-radius: 10rpx;
}

// .log:nth-of-type(2) {
// 	margin-top: 0rpx;
// }

.log text {
	width: 100%;
	padding-right: 30rpx;
	color: #2189ff;
	font-size: 26rpx;
}

.log image {
	width: 48rpx;
	height: 48rpx;
	margin: 0 20rpx;
}

.log_input {
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	/* border-bottom: 2rpx  solid #EEEEEE; */
}

.log_input input {
	width: 100%;
	color: #000000;
	font-size: 32rpx;
}

.log_input text {
	width: 200rpx;
	color: #2189ff;
	text-align: center;
}

.agree {
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: #333333;
	font-size: 26rpx;
	/* font-weight: bold; */
}

.agree text {
	color: #2189ff;
	padding: 0 10rpx;
	font-size: 26rpx;
	font-weight: bold;
}

radio {
	/* overflow: hidden; */
	/* padding-right: 30rpx; */
	transform: scale(0.8);
	/* background: #FFCD0B; */
}

/* uni-radio-input uni-radio-input-checked{
		background: #ffd004 !important;
	} */
/* uni-checkbox .uni-checkbox-wrapper,uni-checkbox .uni-checkbox-input{
		width: 100% !important;
		height: 100% !important;
	} */
.btn,
.btn1 {
	width: 100%;
	box-sizing: border-box;
	/* padding: 0rpx 70rpx; */
	padding-bottom: 32rpx;
}

.btn_button,
.btn_button1 {
	width: 100%;
	height: 90rpx;
	border-radius: 10rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 32rpx;
	background: #2189ff;
}

.btn_button1 {
	background: #2e5afd;
}

.bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: url(../../static/login/login_header.png) no-repeat, url(../../static/login/login_buttom.png) no-repeat;
	background-size: 100% 550rpx, 100% 215rpx;
	background-position: left top, left bottom;
}

/* .mask {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 1);
		opacity: 0.3;
		left: 0;
		top: 0;
		z-index: 998;
	} */

/* .choice_city {
		background: #fff;
		position: fixed;
		height: 884rpx;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 999;
		transition: .3s;
		transform: translateY(100%);
	} */

/* .mask_none {
		transform: translateY(100%);
	} */

/* .mask_show {
		transform: translateY(0);
	} */

/* .choice_city image {
		position: absolute !important;
		width: 40rpx;
		height: 40rpx;
		right: 20rpx;
		top: 20rpx;
	}

	.choice_city .ci_test1 {
		text-align: center;
		padding: 10rpx;
		color: #999;
		font-size: 30rpx;
	}

	.choice_city .ci_test {
		height: 144rpx;
		font-size: 30rpx;
		padding: 20rpx;
	}

	.choice_city .ci_test text {}

	.choice_city .ci_box {
		height: 700rpx;
	}

	.choice_city .ci_box .box_H {
		height: 700rpx;
		font-size: 30rpx;
	}

	.choice_city .ci_box .box_H view {
		padding: 10rpx;
	}

	.choice_city .ci_box .box_H .H_city_test {
		color: #999;
	} */
/* .addreebox{
		display: flex;
		
	} */
/* .adbox{
		width: 50%;
	}
	.adbox122{
		width: 50%;
		    
		    position: fixed;
		    height:780rpx;
		    top: 62rpx;
		    right: 0;
		    overflow: auto;
	} */
/* .placsty{
		color: #333333;
		font-size: 32upx;
	} */
/* 选择城市样式 */
.mask {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
}

.selcitybox {
	width: 100%;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	border-radius: 35upx 35upx 0 0;
	transform: translateY(100%);
	transition: 0.6s;
	z-index: 3;
}

.active {
	transform: translateY(0);
}

.selcityit {
	background-color: #ffffff;
	width: 100%;
	height: 550upx;
	border-radius: 35upx 35upx 0 0;
}

.item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.pick_header {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 30upx;
}

.pick_left,
.pick_right {
	color: #2189ff;
	font-size: 36upx;
}

.pick_left {
	color: #999999;
}

/* 选择城市样式 */

.notice_box {
	width: 90%;
	height: 95%;
	background-color: #ffffff;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	/* left: 0; */
	overflow: auto;
	border-radius: 20upx;
	box-sizing: border-box;
	padding: 30upx;
	/* border-top:10upx solid #FFFFFF ; */
	z-index: 3;
}
</style>
