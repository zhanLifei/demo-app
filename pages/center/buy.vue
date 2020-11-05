<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/tradingCenter')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>发布买单</text>
			</view>
		</view>
		<view class="bg_blue"></view>
		<view class="d_box">
			<view class="deal">
				<view class="month">
					<!-- <view class="month_">
						本月价格<br>
						({{data.mining_now_min_price}}~{{data.mining_now_max_price}})
					</view>
					<view class="price">
						{{now_price}}
						{{ss}}
					</view> -->
					
					
					<view class="interval">
						<view class="month-font">美元单价</view>
						$({{data.mining_now_min_price}}~{{data.mining_now_max_price}})
					</view>
					<view class="number-change">
						<!-- <view class="number">{{numberValue}}</view> -->
						<input type="text" value="" class="number" v-model="numberValue"/>
						<view>
							<uni-number-box :value="numberValue" 
								:min="Number(data.mining_now_min_price)"
								:max="Number(data.mining_now_max_price)"
								:step="0.01"
								@change="change" 
								style="width: 150upx;border: #999;background-color: #fff;box-sizing: border-box;"/>
						</view>
					</view>
				</view>
				<view class="inp">
					<input type="number" @input="inputss" placeholder="请输入数量" v-model="num" />
				</view>
				<view class="alls">
					人民币单价￥&nbsp;：￥ {{rmbprice}} <!-- parseInt() -->
				</view>
				<view class="alls">
					总金额$&nbsp;：$ {{dollars}} <!-- parseInt() -->
				</view>
				<view class="all">
					总金额￥：￥{{allNums}} <!-- parseInt() -->
				</view>
				<view class="psw">
					<input type="password" placeholder="请输入置换密码" v-model="password" />
				</view>
				
				
				<view class="logo_ipt" v-if="type=='mobile'">
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="send()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="send()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
				</view>
				</view>
				
				<view class="logo_ipt" v-else-if="type=='email'">
					<image src="../../static/reg/verification.png" mode="widthFix"></image>
					<view class="log_input">
						<input type="text" v-model="verifycode" maxlength="6" placeholder="请输入验证码" />
						<block v-if="countdown > 61"><text @click="emailValue()">获取验证码</text></block>
						<block v-if="countdown == 61"><text @click="emailValue()">重新发送</text></block>
						<block v-if="countdown < 61"><text>{{countdown}}</text></block>
				</view>
				</view>
				
				<!-- <view class="code">
					<input type="text" placeholder="请输入验证码" v-model="verifycode" />
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
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		
		},
		data() {
			return {
				// rmbprice:'',
				type:'',
				verifycode:'',
				countdown: 62,
				numChange:'',
				numberValue: 0.00,  // 获取输入的值
				data:uni.getStorageSync("data_fo"),
				num: "",
				password: '',
				captcha:'',//图形验证
				uniqid:'',
				allnum:'',
				now_price:'',
				ss:0,
				// allNums:'',
				verification: [{
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
		// 	comput(){
		// 		this.allnum = this.number*this.now_price
		// 		return this.allnum
		// 	}
		// },
		
		
		computed:{
			allNums(){
				var str = uni.getStorageSync("tr")
				 var AllPrice = this.num * this.numberValue * str       
				return AllPrice.toFixed(2); //保留两位小数的字符串
			},
			dollars(){
				var AllPrice = this.num * this.numberValue 
				return AllPrice.toFixed(2); //保留两位小数的字符串
			},
			rmbprice(){
				var AllPrice =Number(this.numberValue *  uni.getStorageSync("tr")) 
				return AllPrice.toFixed(2);
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
					url: service.api.index.verifycode, 
					method: 'GET',
					data: {
						'temp': 'sms_buy',
					},
					
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
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
			change(value) {
				this.numberValue = Number(value).toFixed(2) 
				this.numChange = value
				console.log(value)
			},
			jump(e){
				uni.switchTab({
					url:e
				});
			},
			inputss(){
				
			},
			submit() {
				let canNext = this.verification.some(item => {
					
					if(this.numberValue > this.data.mining_now_max_price){
						uni.showToast({
							icon: 'none',
							title: '超过限制无效！'
						})
						return
					}
					
					if (this[item.name] == '') {
						uni.showToast({
							icon: 'none',
							title: item.title
						})
					}
					return this[item.name] == ''
				})
				if (!canNext) {
					//  这里发请求
					// this.captchas();
					/* this.$service.auth(this,this.$service.api.center.submitPurchasing,"POST",{
						num:this.num,
						password:this.password,
						verifycode:this.verifycode,
						uniqid:this.uniqid
					},(self,res)=>{
						// console.log(res)
						if(res.code == 1){
							setTimeout(()=>{
								uni.navigateTo({
									url:'/pages/center/my_deal' 
								})
							},1500)
						}
						uni.showToast({
							icon:'none',
							title:res.info
						});
					}); */
					
					uni.request({
						url:this.$service.api.center.submitPurchasing,
						method:"POST",
						data:{
							num:this.num,
							password:this.password,
							verifycode:this.verifycode,
							uniqid:this.uniqid,
							type:this.type,
							purchase_price:this.numberValue * uni.getStorageSync("tr"),
						},
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token')
						},
						success: (res) => {
							if(res.data.code == 1){
								uni.showToast({
								icon:'none',
								title:res.data.info
							});
								
								setTimeout(()=>{
									uni.navigateTo({
										url:'/pages/center/my_deal' 
									})
								},1500);
								
							}else{
								uni.showToast({
									icon:'none',
									title:res.data.info,
									duration:2000
								});
								this.captchas();
							}
							
						},
						fail: (res) => {
							uni.showToast({
								icon:'none',
								title:res.data.info
							});
						}
					});
				}
			},
			captchas(){//图形验证
				/* this.$service.auth(this,this.$service.api.home.captcha,"GET",{
					// s:'think/admin/captcha'
				},(self,res)=>{
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
						console.log(res , "captcha");
						this.captcha = res.data.image;
						this.uniqid = res.data.uniqid;
					}
				});
				
			}
		},
		onShow(){
			this.captchas()	
			this.numberValue = this.data.mining_now_min_price
		var ttt = uni.getStorageSync('type');
			// this.rmbprice = Number(this.numberValue * uni.getStorageSync("tr")).toFixed(2) 
		this.type = ttt
		},
		onLoad(op) {
			var sss =parseFloat(op.now_price) 
			this.now_price = sss;
			/* var a = uni.getStorageSync("data_fo")
			this.now_price = (Number(a.mining_now_min_price)+Number(a.mining_now_max_price))/2 */
				var str = uni.getStorageSync("tr")
				console.log(str,66666)
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
		padding-right: 30rpx;
		color: #333333;
		font-size: 26rpx;
		text-align: right;
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
			}

			.psw,
			.inp {
				width: 100%;
				padding-top: 40rpx;
				padding-bottom: 24rpx;
				border-bottom: 2rpx solid #F3F3F3;
			}

			.all {
				font-size: 27rpx;
				color: #333333;
				margin-top: 20rpx;
			}
			.alls{
				margin: 20upx 0;
				font-size: 27rpx;
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
	.price{
		
	}
	.month{
		display: flex;
		justify-content: space-around;
	}
	.number-change{
		display: flex;
		border: 1px solid #e5e5e5;
		// border-radius: 10upx;
		}
	.number{
		width: 220upx;
		height: 78upx;
		line-height: 78upx; 
		text-indent: 20upx;
		// border: 1px solid #e5e5e5;
		border-right: none;
		background-color: #ffffff;
		// border-radius: 10upx 0 0 10upx;
		box-sizing: border-box;
	}
	
</style>
