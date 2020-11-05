<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/tradingCenter')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>正在出售</text>
			</view>
		</view>
		<view class="bg_blue"></view>
		<view class="d_box">
			<view class="deal">
				<view class="month">
					<view class="month_">
						单价
					</view>
					<view class="price">
						{{money_ss}}
					</view>
				</view>
				<!-- <view class="inp">
					 <input type="number" placeholder=" -->
				<!-- " v-model="num" /> 
				</view> -->
				<view class="month">
					<view class="month_">
						数量
					</view>
					<view class="price">
						{{num}}
					</view>
				</view>
				<view class="month">
					<view class="month_">
						总金额￥
					</view>
					<view class="price">
						￥{{money}}
					</view>
				</view>
				<view class="month">
					<view class="month_">
						总金额$
					</view>
					<view class="price">
						${{ds_money}}
					</view>
				</view>
				<!-- <view class="all">
					总金额：3.46
				</view> -->
				<view class="psw">
					<input type="password" placeholder="请输入置换密码" v-model="psw" />
				</view>
				
			<!-- 	
				<view class="logo_ipt">
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="send()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="send()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
				</view>
				</view> -->
				
				
				
				<view class="logo_ipt" v-if="type=='mobile'">
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="send()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="send()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
				</view>
				</view>
				
				<view class="logo_ipt" v-else-if="type=='email'">
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="emailValue()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="emailValue()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
				</view>
				</view>
				
				
				
				
				
				<!-- <view class="code">
					<input type="text" placeholder="请输入验证码" v-model="code" />
					<image :src="captcha" mode=""></image>
				</view> -->
			</view>
		</view>
		<view class="btns">
			<view class="btn" @click="submit">
				确认
			</view>
			<view class="btn" @click="jump('/pages/main/tradingCenter')">
				取消
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				type:'',
				ds_money:'',
				verifycode:'',
				countdown: 62,
				num: '',
				psw: '',
				code: '',
				captcha: '',
				uniqid: '',
				price: '',
				money: '',
				id: '',
				verification: [
					{
						name: 'num',
						title: '请输入数量'
					},
					{
						name: 'psw',
						title: '请输入置换密码'
					},
					{
						name: 'code',
						title: '请输入验证码'
					}
				],

			}
		},
		// computed:{
		// 	money(){
		// 		 var AllPrice = this.num * this.price * 7          
		// 		return AllPrice.toFixed(2); //保留两位小数的字符串
		// 	},
		// 	dollars(){
		// 		var AllPrice = this.num * this.numberValue 
		// 		return AllPrice.toFixed(2); //保留两位小数的字符串
		// 	}
		// },
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
					url: service.api.index.verifycode, 
					method: 'GET',
					data: {
						'temp': 'sms_sell',
						
					},
					
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
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
						'email': uni.getStorageSync("member").email,
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
			},
			jump(e) {
				uni.switchTab({
					url: e
				})
			},
			submit() {
				/*在这里使用some会报Vue 引入js对象错误 */
				let canNext = this.verification.some(item => {
					if (this[item.name] == '') { //从原型链里拿数据进行判断 "this指向Vue实例"  this[item.name] 相当于this.psw item中的name的属性值必须要在data中定义
						uni.showToast({
							icon: 'none',
							title: item.title
						})
					}
					return this[item.name] == ''
				})
				if (!canNext) {
					 // 这里发请求
					 
					this.captchas();
					uni.request({
					url:this.$service.api.center.claimPurchasingOrder,
					method:"POST",
					data:{
						num: this.num,
						password: this.psw,
						verifycode: this.code,
						uniqid: this.uniqid,
						id: this.id,
						type:this.type
					},
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						if(res.code == 1){
							uni.showToast({
								icon: 'none',
								title: res.info
							});
							
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/center/my_deal?type='+ 1
								});
							},600);
						}else{
							uni.showToast({
								icon: 'none',
								title: res.info,
								duration:2000
							});
						}
					},
					complete:(res)=>{
						var res = res.data;
						// console.log(res,'complete');
						uni.showToast({
							icon: 'none',
							title: res.info,
							duration:2000
						});
					}
				});
					/* this.$service.auth(this, this.$service.api.center.claimPurchasingOrder, "POST", {
						num: this.num,
						password: this.psw,
						verifycode: this.code,
						uniqid: this.uniqid,
						id: this.id
					}, (self, res) => {
						// console.log(res)
						uni.showToast({
							icon: 'none',
							title: res.info
						});

						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/center/my_deal'
							})
						}, 1500);
					}); */
				}
				
				/*------------*/
				
				/*------------*/
				
			},
			captchas() { //图形验证
				/* this.$service.auth(this, this.$service.api.home.captcha, "GET", {
					// s:'think/admin/captcha'
				}, (self, res) => {
					console.log(res)
					self.captcha = res.data.image;
					self.uniqid = res.data.uniqid;
				}); */
				
				uni.request({
					url:this.$service.api.home.captcha,
					method:"GET",
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						// console.log(res);
						this.captcha = res.data.image;
						this.uniqid = res.data.uniqid;
						}
				});
				
			}
		},
		onShow() {
			this.captchas();
			var ttt = uni.getStorageSync('type');
			
			this.type = ttt
		
		},
		onLoad(op) {
			this.num = op.A;
			this.price = op.c;
			this.money_ss = op.b;
			this.id = op.id;
			var str = uni.getStorageSync("tr")
			
			this.ds_money = Number(this.num * this.money_ss).toFixed(2);
			this.money = Number(this.ds_money * str).toFixed(2);
		}
	}
</script>

<style lang="less">
	.header {
		background-color: #2389ff;
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
.logo_ipt image {
		width: 32upx;
		height: 48upx;
		vertical-align: middle;
		padding: 20upx 28upx;
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
	.logo_ipt text {
		width: 100%;
		// padding-right: 30rpx;、
		color: #333333;
		font-size: 26rpx;
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
	page {
		background-color: #EFF3F6;
	}

	.bg_blue {
		width: 100%;
		height: 140rpx;
		background-color: #2189FF;
	}

	.d_box {
		width: 100%;
		margin-top: -70rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 120rpx;

		.deal {
			width: 100%;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx;

			.month {
				display: flex;
				justify-content: space-between;
				color: #333333;
				font-size: 32rpx;
				margin-bottom: 20upx;
			}

			.psw,
			.inp {
				width: 100%;
				padding-top: 40rpx;
				padding-bottom: 24rpx;
				border-bottom: 2rpx solid #F3F3F3;
			}

			.all {
				font-size: 24rpx;
				color: #333333;
				margin-top: 20rpx;
			}

			.code {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 24rpx;

				image {
					width: 174rpx;
					height: 108rpx;
				}
			}
		}

	}

	.btn {
		width: 560rpx;
		height: 96rpx;
		font-size: 36rpx;
		line-height: 96rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #FFFFFF;
		margin: 0 auto;

	}

	.btns .btn:first-child {
		background-color: #2189FF;
	}

	.btns .btn:last-child {
		background-color: #BEBEBE;
		margin-top: 32rpx;
	}
</style>
