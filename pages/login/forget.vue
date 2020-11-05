<template>
	<view class="bg">
		<view class="content">
			<headers :title="title" :icon="icon" :url_left='url_left'></headers>
			<!-- :subtitle="subtitle" -->
			<view class="log_groud">
				<view class="navbar">
	<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
				</view>
				<view class="aa">
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
						<scroll-view class="list-scroll-content" scroll-y>
				<!-- <view class="page_name">
					忘记密码
				</view> -->
				<block v-if="tabIndex==0">
				<view class="log">
					<!-- <text>手机号码</text> -->
					<image src="../../static/login/login_phone.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="account" maxlength="11" placeholder="请输入你的手机号码" />
					</view>
				</view>
				<view class="log">
					<!-- <text>验证码</text> -->
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="send()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="send()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
					</view>
				</view>
				<view class="log">
					<!-- <text>登录密码</text> -->
					<image src="../../static/login/login_pw.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="password" v-model="pwd" maxlength="20" placeholder="请输入登录密码" />
					</view>
				</view>
				<view class="log">
					<!-- <text>确认登录密码</text> -->
					<image src="../../static/reg/presenter.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="password" v-model="repwd" maxlength="20" placeholder="请再次输入登录密码" />
					</view>
				</view>

				<view class="btn">
					<view class="btn_button" @click="submit()">
						确认
					</view>
				</view>
				</block>
				
				<block v-if="tabIndex==1">
				<view class="log">
					<!-- <text>手机号码</text> -->
					<image src="../../static/login/email.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="email" maxlength="35" placeholder="请输入你的邮箱号码" />
					</view>
				</view>
				<view class="log">
					<!-- <text>验证码</text> -->
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="emailCode" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="emailCodes()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="emailCodes()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
					</view>
				</view>
				<view class="log">
					<!-- <text>登录密码</text> -->
					<image src="../../static/login/login_pw.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="password" v-model="password" maxlength="20" placeholder="请输入登录密码" />
					</view>
				</view>
				<view class="log">
					<!-- <text>确认登录密码</text> -->
					<image src="../../static/reg/presenter.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="password" v-model="password2" maxlength="20" placeholder="请再次输入登录密码" />
					</view>
				</view>
				
				<view class="btn">
					<view class="btn_button" @click="emailSubmit()">
						确认
					</view>
				</view>
				</block>
				<!-- <view class="forget">
					<text @click="jump('/pages/reg/reg')">立即注册</text>
					<text @click="jump('/pages/login/login')">立即登录</text>
				</view> -->
				</scroll-view>
					</swiper-item>
				</swiper>
			</view>
</view>
		</view>
	</view>

</template>

<script>
	import service from '../../service.js';
	import headers from '@/components/header_top.vue';
	export default {
		components: {
			headers
		},
		data() {
			return {
				email:'',
				password:'',
				password2:'',
				emailCode:'',
				tabIndex: 0,
				navList: [
					{
						text: '手机号找回密码',
						state: '0'
					},
					{
						text: '邮箱号找回密码',
						state: '1'
					}
				],
				title: '',
				icon: '../../static/icon/left_whitch.png',
				url_left: '/pages/login/login',
				// subtitle: '',
				countdown: 62,
				account: '',
				pwd: '',
				repwd: '',
				verifycode: ''
			}
		},
		methods: {
			//swiper 切换
			changeTab(e){
				this.tabClick(e.target.current);
			},
			
			//顶部tab点击
			tabClick(index){
				this.change(index);
			},
			change(index){
				this.type = this.navList[index].type;
				this.tabIndex = index;
			},
			back() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			send() {
				var self = this
				uni.request({
					url: service.api.reg.code, 
					method: 'GET',
					data: {
						'mobile': this.account,
						'temp': 'sms_forget',
					},
					success: res => {
						console.log(res)
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
			// 邮箱验证码
			emailCodes(){
				var self = this;
				uni.request({
					url: service.api.reg.sendEmailCode,
					method: 'GET',
					data: {
						email: this.email,
					},
					success: res => {
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
					obj.countdown = "0" + num;
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
			submit() {
				var self = this
				if(!(/^1[3-9][0-9]\d{8,11}$/.test(self.account))){
					uni.showToast({
						icon: 'none',
						title: '手机号码格式不正确'
					});
					return;
				}
				if (self.pwd.length < 8 && !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(self.pwd))) {
					uni.showToast({
						icon: 'none',
						title: '请输入数字与字母结合的八位数以上登录密码'
					});
					return;
				}
				if(self.repwd !== self.pwd){
					uni.showToast({
						icon: 'none',
						title: '两次输入的密码不一致'
					});
					return;
				}
				uni.request({
					url: service.api.login.forget,
					method: 'POST',
					data: {
						account: self.account,
						pwd: self.pwd,
						repwd: self.repwd,
						verifycode: self.verifycode
					},
					success(res) {
						if (res.data.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 1000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
						}
						console.log(res.data)
					}
				})
			},
			
			emailSubmit() {
				var self = this
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
				if(self.password2 !== self.password){
					uni.showToast({
						icon: 'none',
						title: '两次输入的密码不一致'
					});
					return;
				}
				uni.request({
					url: service.api.login.emailForgetpwd,
					method: 'POST',
					data: {
						email: self.email,
						pwd: self.password,
						repwd: self.password2,
						verifycode: self.emailCode
					},
					success(res) {
						if (res.data.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 1000)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
						}
						console.log(res.data)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		padding-top: 100rpx;
		margin-top: 60rpx;
		background: none;
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
	.swiper-box{
		height: 850upx;
		}
	// .log_groud {
	// 	width: 100%;
	// 	box-sizing: border-box;
	// 	margin-top: 30rpx;
	// 	padding: 0 50rpx;
	// 	background: #FFFFFF;
	// 	border-radius: 10rpx;
	// 	box-shadow: 0 0 10rpx #2189FF;
	// }

	.page_name {
		width: 100%;
		/* height: 100rpx; */
		box-sizing: border-box;
		padding: 30rpx 0;
		color: #2189FF;
		font-size: 38rpx;
		font-weight: bold;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.log {
		width: 100%;
		margin-top: 40rpx;
		box-sizing: border-box;
		/* padding: 0 50rpx; */
		/* height: 100rpx; */
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx solid #2189FF;
		border-radius: 10rpx;
	}

	// .log:nth-of-type(2) {
	// 	margin-top: 0rpx;
	// }

	.log text {
		width: 100%;
		padding-right: 30rpx;
		color: #333333;
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
		border-bottom: 2rpx solid #EEEEEE;
	}

	.log_input input {
		width: 100%;
		color: #999999;
		font-size: 26rpx;
	}

	.log_input text {
		width: 200rpx;
		color: #2189FF;
		text-align: center;
	}

	.btn {
		width: 100%;
		margin: 60rpx 0 40rpx;
		box-sizing: border-box;
		/* padding: 0rpx 70rpx; */
		padding-bottom: 32rpx;
	}

	.btn_button {
		width: 100%;
		height: 90rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 32rpx;
		background: #2189FF;
	}

	/* .forget{
		width: 100%;
		height: 70rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		padding: 0 70rpx;
		color: #aaaaaa;
		font-size: 26rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	} */
	.bg {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: url(../../static/login/login_header.png) no-repeat,
			url(../../static/login/login_buttom.png) no-repeat;
		background-size: 100% 550rpx, 100% 215rpx;
		background-position: left top, left bottom;
	}
	.content .header {
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: transparent;
		border: 0;
	}

	.content .header .header_icon {
		justify-content: flex-start !important;
		padding: 0 !important;
	}
</style>
