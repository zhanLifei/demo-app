<template>
	<view class="content">
		<view class="login_header">
			<image src="../../static/login/login_header.png" mode=""></image>
		</view>
		<view class="login_logo">
			<image :src="site_logo" class="logo" mode=""></image>
		</view>
	
		<view class="login_box">
			<view class="navbar">
		<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
			</view>
			<view class="aa">
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
						<scroll-view class="list-scroll-content" scroll-y>
			<block v-if="tabIndex==0">
			<view class="logo_ipt">
				<view>
					<image src="../../static/login/login_phone.png" mode="widthFix"></image>
				</view>
				<input type="text" value="" v-model="account" placeholder="请输入账号" />
			</view>
			
			<!-- <view class="logo_ipt">
				<image src="../../static/reg/verification.png" mode="widthFix"></image>
				<view class="log_input">
					<input type="text" v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
					<block v-if="countdown > 61"><text @click="send()">获取验证码</text></block>
					<block v-if="countdown == 61"><text @click="send()">重新发送</text></block>
					<block v-if="countdown < 61"><text>{{countdown}}</text></block>
			</view>
			</view> -->
			
			<view class="logo_ipt">
				<view>
					<image src="../../static/login/login_pw.png" mode="widthFix"></image>
				</view>
				<input type="text" v-model="password" password="true" value="" placeholder="请输入密码" />
			</view>
			
			<button style="height: 88upx; background-color: #2189FF; border-radius: 10upx; margin-top: 62upx; font-size: 34upx; color: #FFFFFF;"
			 @tap="login">确认</button> <!-- :disabled="disabled" -->
				
				
			<view class="logo_test">
				<text @click="jum('../login/forget')">忘记密码</text>
				<text @click="jum('../reg/reg?invite_code=')">注册</text>
				<text @click="jum('../login/unbind')">解除绑定</text>
			</view>
			</block>
			<block v-if="tabIndex==1">
			<view class="logo_ipt">
				<view>
					<image src="../../static/login/email.png" mode="widthFix"></image>
				</view>
				<input type="text" value="" v-model="email" placeholder="请输入账号" maxlength="35"/>
			</view>
			
			<!-- <view class="logo_ipt">
				<image src="../../static/reg/verification.png" mode="widthFix"></image>
				<view class="log_input">
					<input type="text" v-model="emailCode" maxlength="6" placeholder="请输入验证码" />
					<block v-if="countdown > 61"><text @click="emailValue()">获取验证码</text></block>
					<block v-if="countdown == 61"><text @click="emailValue()">重新发送</text></block>
					<block v-if="countdown < 61"><text>{{countdown}}</text></block>
			</view>
			</view> -->
			
			
			<view class="logo_ipt">
				<view>
					<image src="../../static/login/login_pw.png" mode="widthFix"></image>
				</view>
				<input type="text" v-model="psd" password="true" value="" placeholder="请输入密码" maxlength="20"/>
			</view>
			<button style="height: 88upx; background-color: #2189FF; border-radius: 10upx; margin-top: 62upx; font-size: 34upx; color: #FFFFFF;"
			 @tap="emailLogin">确认</button> <!-- :disabled="disabled" -->
				
				
			<view class="logo_test">
				<text @click="jum('../login/forget')">忘记密码</text>
				<text @click="jum('../reg/reg?invite_code=')">注册</text>
				<text @click="jum('../login/unbind')">解除绑定</text>
			</view>
			</block>
			</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class='login-footer'>
			<image src="../../static/login/login_buttom.png" mode=""></image>
		</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				emailCode:'',
				verifycode:'',
				countdown: 62,
				tabIndex: 0,
				navList: [
					{
						text: '手机号登录',
						state: '0'
					},
					{
						text: '邮箱号登录',
						state: '1'
					}
				],
				email:'',
				psd:'',
				type:2,
				account: '', //用户名
				password: '', //密码
				disabled: false,
				system: '', //获取手机的系统信息
				device_info: '' ,//设备号,后台返回,后续拿缓存的
				site_logo:'',//网站logo
				site_name:''//网站名称

			}
		},
		methods: {
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
			send() {
				var self = this
				uni.request({
					url: service.api.reg.code, 
					method: 'GET',
					data: {
						'mobile': this.account,
						'temp': 'sms_login',
					},
					success: res => {
						// console.log(res)
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
			emailValue(){
				var self = this
				uni.request({
					url: service.api.reg.sendEmailCode, 
					method: 'GET',
					data: {
						'email': this.email,
					},
					success: res => {
						// console.log(res)
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
			login() {
				var self = this;
				uni.switchTab({
					url: '/pages/main/index'
				})
				// const reg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/
				// if(self.password.length < 8 && !(/^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/.test(self.password))){
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入数字与字母结合的八位数以上密码'
				// 	})
				// 	return
				// }
				// uni.request({
				// 	url: service.api.login.login,
				// 	method:"POST",
				// 	data: {
				// 		account: self.account,
				// 		password: self.password,
				// 		// verifycode: self.verifycode,
				// 		type:2,
				// 		versions:service.config.version
				// 	},
				// 	success(res) {
				// 		// console.log(res, "login-------");
				// 		if (res.data.code == 1) {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.data.info
				// 			})
				// 			var type = res.data.data.type
				// 			var is_idverifly = res.data.data.is_idverifly
				// 			uni.setStorageSync('type', type);
				// 			var token = res.data.data.token
				// 			uni.setStorageSync('token', token);
				// 			uni.setStorageSync('tan', 1);
				// 			uni.removeStorageSync('proCityId');
				// 			uni.removeStorageSync('upcardata');
				// 			// var yyy = res.data.type
				// 			console.log(res)
				// 		if(is_idverifly == 0 && type == "mobile"){
				// 			setTimeout(function() {
				// 				// uni.redirectTo({
				// 				// 	url: '/pages/realName/real_name?type=0'
				// 				// })
				// 				uni.switchTab({
				// 					url: '/pages/main/index'
				// 				})
				// 			}, 1000)
				// 		}else{
				// 		    setTimeout(function() {
				// 			// console.log('21321321')
				// 			uni.switchTab({
				// 				url: '/pages/main/index'
				// 			})
				// 		}, 1000)
				// 		}
				// 		} else {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.data.info
				// 			})
				// 		}
				// 	}

				// })
			},
			// 邮箱登录
			emailLogin() {
				var self = this;
				// if(self.psd.length < 8 && !(/^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/.test(self.psd))){
				// 					uni.showToast({
				// 						icon: 'none',
				// 						title: '请输入数字与字母结合的八位数以上密码'
				// 					})
				// 					return
				// 				}
				uni.request({
					url: service.api.login.login,
					method:"POST",
					data: {
						email: self.email,
						password: self.psd,
						// verifycode:self.emailCode,
						type:1,
						versions:service.config.version
					},
					success(res) {
						// console.log(res, "login-------");
						if (res.data.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
							// var type = res.data.data.type
							var type = res.data.data.type
							var is_idverifly = res.data.data.is_idverifly
							uni.setStorageSync('type', type);
							var token = res.data.data.token
							uni.setStorageSync('token', token);
							uni.setStorageSync('tan', 1);
							uni.removeStorageSync('proCityId');
							uni.removeStorageSync('upcardata');
							if(is_idverifly == 0 && type == "email"){
								setTimeout(function() {
									// uni.redirectTo({
									// 	url: '/pages/realName/real_name?type=1',
									// 	// ?type=1
									// })
									uni.switchTab({
										url: '/pages/main/index'
									})
								}, 1000)
							}else{
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/main/index'
								})
							}, 1000)
							}
							
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							})
						}
					}
			
				})
			},
			jum(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		onShow() {
              uni.request({
				  url:service.api.login.logo,
				  success:(res)=>{
					  if(res.data.code == 1){
						  // console.log(res);
						  this.device_info = res.data.data.device_info;
						  this.site_name = res.data.data.site_name; 
						  this.site_logo = res.data.data.site_logo;
						  uni.setStorageSync('site_name',this.site_name);
						  uni.setStorageSync('site_logo',this.site_logo);
						  
					  }
              	 
				  }
              })
		}
	}
</script>

<style lang="scss" scoped>
	page {
		margin: 0;
		padding: 0;
		border: 0;
		height: 100%;
		width: 100%;
	}

	.content {
		width: 100%;
		height: 100%;
		padding-top: 0;
	}
.logo_ipt {
		display: flex;
		align-items: center;
		align-items: center;
		border-radius: 10upx;
		height: 88upx;
		border: 2upx #2189FF solid;
		margin-top: 42upx;
	}
	.log_input {
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.logo_ipt text {
		width: 100%;
		padding-right: 30rpx;
		color: #333333;
		font-size: 26rpx;
		text-align: right;
	}
	
	
	
	
	
	
	.logo_ipt image {
		width: 32upx;
		height: 48upx;
		vertical-align: middle;
		padding: 20upx 28upx;
	}

	.logo_ipt input {
		text-align: start;
		font-size: 32upx;
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
	// .log_groud {
	// 	width: 100%;
	// 	background: #ffffff;
	// 	border-radius: 10rpx;
	// 	box-shadow: 0 0 10rpx #2189ff;
	// 	z-index: 3000;
	// }
	.login_header {
		position: fixed;
		width: 100%;
	}

	.login_header image {
		width: 100%;
		height: 543upx;
	}

	.login_logo {
		width: 180upx;
		height: 183upx;
		position: relative;
		left: 286upx;
		top: 139upx;
	}

	.login_logo image {
		width: 100%;
		height: 100%;
	}

	.login_box {
		width: 694upx;
		height: 768upx;
		position: relative;
		top: 225upx;
		margin: 0 auto;
		box-shadow: 0 0 40upx #2189FF;
		border-radius: 10upx;
		background: #fff;
		text-align: center;
		// padding:0 52upx 30upx;
		box-sizing: border-box;
		z-index: 1;
	}
	.swiper-box{
		height: 850upx;
		}
	.login_title {
		font-size: 38upx;
		color: #3394FF;
		margin-bottom: 48upx;
		font-weight: bold;
	}

	.logo_ipt {
		display: flex;
		align-items: center;
		align-items: center;
		border-radius: 10upx;
		height: 88upx;
		border: 2upx #2189FF solid;
		margin-top: 42upx;
	}

	.logo_ipt image {
		width: 32upx;
		height: 48upx;
		vertical-align: middle;
		padding: 20upx 28upx;
	}

	.logo_ipt input {
		text-align: start;
		font-size: 32upx;
	}

	.logo_test {
		margin-top: 30upx;
		font-size: 30upx;
		color: #2189FF;
		display: flex;
		justify-content: space-between;
	}

	.logo_test text:nth-child(1) {
		width: 58%;
		display: flex;
		justify-content: start;
	}

	.login-footer {
		width: 100%;
		height: 216upx;
		position: fixed;
		bottom: 0;
	}

	.login-footer image {
		width: 100%;
		height: 100%;

	}
</style>
