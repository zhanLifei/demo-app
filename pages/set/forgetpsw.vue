<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/set/dealpsw')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>忘记置换密码
				</text>
			</view>
		</view>
		
		<view class="blue_bg"></view>
		
		<view class="box">
			<view class="navbar">
	<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
				</view>
				
			<view class="aa">
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
					<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
						<scroll-view class="list-scroll-content" scroll-y>
			<block v-if="tabIndex==0">
				<view class="inp">
					<input type="text" v-model="account" placeholder="手机号" maxlength="11"/>
				</view>
				<view class="inp">
					<input type="text" v-model="verifycode"  placeholder="请输入验证码" maxlength="6"/>
					<view class="getcode" @click="count">{{status}}</view>
				</view>
				<view class="inp">
					<input type="text" v-model="pwd2" placeholder="请输入置换密码" maxlength="20"/>
				</view>
				<view class="inp">
					<input type="text" v-model="repwd2" placeholder="请重新输入置换密码" maxlength="20"/>
				</view>
			
			<view class="btns" @click="btns">
				确认
			</view>
			</block>
			
			<block v-if="tabIndex==1">
				<view class="inp">
					<input type="text" v-model="email" placeholder="邮箱号" maxlength="35"/>
				</view>
				<view class="inp">
					<input type="text" v-model="emailCodes"  placeholder="请输入验证码" maxlength="6"/>
					<view class="getcode" @click="emailCode">{{status}}</view>
				</view>
				<view class="inp">
					<input type="text" v-model="password" placeholder="请输入置换密码" maxlength="20"/>
				</view>
				<view class="inp">
					<input type="text" v-model="password2" placeholder="请重新输入置换密码" maxlength="20"/>
				</view>
			
			<view class="btns" @click="emailBtns">
				确认
			</view>
			</block>
			</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	export default {
		data() {
			return {
				email:'',
				password:'',
				password2:'',
				emailCodes:'',
				tabIndex: 0,
				navList: [
					{
						text: '手机号',
						state: '0'
					},
					{
						text: '邮箱号',
						state: '1'
					}
				],
				status: '获取验证码',
				account:'',
				repwd2:'',
				pwd2:'',
				verifycode:''
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
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			count() {
				if (this.status > 0) {
					return
				} else {
					// console.log(22);
					service.auth(this, service.api.reg.code, "GET", {
						'mobile': this.account,
						'temp': 'sms_forget'
					},function(self,res){
						
					self.status = 60
					var timer = setInterval(() => {
						self.status--
						if (self.status == 0) {
							clearInterval(timer)
							self.status = '重新获取'
						};
					}, 1000);
					uni.showToast({
						title:res.info,
						icon:'none'
					})
					})
				};
			},
			// 邮箱验证码
			emailCode(){
				if (this.status > 0) {
					return
				} else {
					// console.log(22);
					service.auth(this, service.api.reg.sendEmailCode, "GET", {
						email: this.email,
					},function(self,res){
						
					self.status = 60
					var timer = setInterval(() => {
						self.status--
						if (self.status == 0) {
							clearInterval(timer)
							self.status = '重新获取'
						};
					}, 1000);
					uni.showToast({
						title:res.info,
						icon:'none'
					})
					})
				};
				},
			btns(){
				service.auth(this , service.api.set.forget2 , 'POST' , {
					verifycode:this.verifycode,
					repwd2:this.repwd2,
					pwd2:this.pwd2,
					account:this.account,
					type:2
				} , function(self , res){
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/main/my"
						})
					},1500)
				})
			},
			// 邮箱确认按钮
			emailBtns(){
				service.auth(this , service.api.set.forget2 , 'POST' , {
					verifycode:this.emailCodes,
					repwd2:this.password2,
					pwd2:this.password,
					email:this.email,
					type:1
				} , function(self , res){
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/main/my"
						})
					},1500)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: #2389ff;
	}

.navbar {
		margin-bottom: 15upx;
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
	.swiper-box{
		height:550upx;
		}
	.left_ {
		width: 36upx;
		height: 36upx;
	}

	.center_title {
		font-size: 36upx;
		color: #FFFFFF;
		margin-right: 72upx;
		width: 80%;
	}

	page {
		background-color: #EFF3F6;
	}

	.blue_bg {
		width: 100%;
		height: 120rpx;
		background-color: #2189FF;
	}
	
	.box {
		width: 94%;
		background-color: #fff;
		border-radius: 20rpx;
		margin: -90rpx auto 0;
		// padding: 20rpx 30rpx 50rpx;
		box-sizing: border-box;
		margin-bottom: 120rpx;

		.inp {
			width: 100%;
			padding: 24rpx 0;
			border-bottom: 2rpx solid #F3F3F3;
			margin-bottom: 10rpx;

			input {
				font-size: 28rpx;
				color: #333;
			}
		}

		.inp:nth-child(2) {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.btns {
		text-align: center;
		margin: 0 auto;
		width: 70%;
		color: #FFFFFF;
		font-size: 36upx;
		background-color: #2189FF;
		padding: 20upx 0;
		border-radius: 60upx;
		margin-top: 50upx;
	}

	.getcode {
		font-size: 28rpx;
		color: #FBB35A;
		// margin-right:30upx;
		border-left: 2upx solid #F4F4F4;
		padding: 0 10upx;
		width: 160upx;
		text-align: center;
	}
</style>
