<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jum('/pages/record/integral')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>积分提现</text>
			</view>
		</view>
		<view class="top">
			<view class="topin">
				
					<view class="can">
						<view class="can_bor_bot">
						<view class="can_nums">
							可提现积分
							<text style="padding-left: 10rpx;">{{unfreeze}}</text>
						</view>
						<view class="topall" @click="allsubmit(unfreeze)">
							全部提现
						</view>
						</view>
					</view>
				
				<view class="top_bot">
					<view class="inp_num">
						提现数额
					</view>
					<view class="keyword">
						<input type="number" v-model="money" placeholder="请输入提现数额" placeholder-class="ex"/>
						<image src="../../static/img/close.png" mode="" @click="money=''"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="msg_box" v-if="moneyType == ''">
			<view class="message">
				<view class="msg_title">
					收款信息
				</view>
				<view class="msg_item">
					<text>支付宝名称</text>
					<input type="text" placeholder="请输入支付宝名称" v-model="owner"/>
				</view>
				<!-- <view class="msg_item">
					<text>开户银行</text>
					<input type="text" placeholder="请输入开户银行及分行" v-model="bank"/>
				</view> -->
				<view class="msg_item">
					<text>支付宝账号</text>
					<input type="text" placeholder="请输入支付宝账号" v-model="bankAcount"/>
				</view>
			</view>		
		</view>
		<view class="msg_box" v-else>
			<view class="message">
				<view class="msg_title">
					收款信息
				</view>
				<view class="msg_item">
					<text>支付宝名称</text>
					<view class="ffff">
						{{owner}}
					</view>
					<!-- <input type="text" placeholder="请输入开户名" v-model="owner"/> -->
				</view>
				<!--<view class="msg_item">
					<text>开户银行</text>
					<view class="ffff">
						{{bank}}
					</view>
					  
				</view>-->
				<view class="msg_item">
					<text>支付宝账号</text>
					<view class="ffff">
						{{bankAcount}}
					</view>
					<!-- <input type="text" placeholder="请输入开户银行账号" v-model="bankAcount"/> -->
				</view>
			</view>		
		</view>
		<view class="tips">
			<view class="tip1">
				提现扣取5%的手续费
			</view>
			<view class="tip2">
				温馨提示：自购买车险后10日起可申请提现，但公司审核时间是每月
				10日、20日、30日，请合理安排时间，感谢您的贡献。
			</view>
			<view class="tip3">
				注：收款银行仅支持中国银行，农业银行、建设银行、工商银行
			</view>
		</view>
		<view class="submit" @click="submit">
			<view :class="[isOk?'bg2':'bg1','_submit']">
				提现
			</view>
		</view>
	</view>
</template>

<script>
	import service from "../../service.js";
	export default {
		data() {
			return {
				money:'',
				owner:'',
				bank:'',
				bankAcount:'',
				unfreeze:'',
				subBloon:true,
				moneyType:''
			}
		},
		methods: {
			jum(url){
				uni.navigateTo({
					url:url
				})
			},
			allsubmit(e){
				this.money = e;
			},
			submit(){
				/* if(this.subBloon){
					service.auth(this , service.api.record.withdrawSubmit , "POST" , {
					integral :this.money, 
					name :this.owner,
					bank :this.bank, 
					card :this.bankAcount 
				} , function(self , res){
					console.log(res);
					self.subBloon=false;
					// service.auth(self, service.api.record.index, 'GET', '', function(_self, res) {
					// 	console.log(res);
					// 	_self.unfreeze = res.data.unfreeze;
					// 	self.freeze = res.data.freeze;
					// 	self.paid = res.data.paid;
					// });
					self.unfreeze = res.data;
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						self.subBloon=true;
						self.money='';
					},3000);
				});
				}else{
					uni.showToast({
						title:'请3秒后再点击!',
						icon:'none'
					})
				} */
				
				
				
				if(this.subBloon){
				uni.request({
					url:service.api.record.withdrawSubmit,
					method:"POST",
					data:{
						integral :this.money,
						name :this.owner,
						bank :this.bank, 
						card :this.bankAcount 
					},
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						if(res.code == 1){
							this.subBloon=false;
						this.unfreeze = res.data;
						uni.showToast({
							title:res.info,
							icon:'none'
						});
						setTimeout(()=>{
							this.subBloon=true;
							this.money='';
						},3000);
						}else{
							uni.showToast({
								title:res.info,
								icon:'none'
							});
						}
						
					},
					fail: (res) => {
						uni.showToast({
							title:res.info,
							icon:'none'
						});
					}
				});
				}else{
					uni.showToast({
						title:'请3秒后再点击!',
						icon:'none'
					})
				}
				
			}
		},
		computed: {
			isOk() {
				if(this.owner.trim()!=='' && this.bank.trim()!=='' && this.bankAcount.trim() !==''){
					return true
				}else{
					return false
				}
				
			}
		},
		onLoad(op) {
			console.log(op)
			this.unfreeze = op.unfreeze;
		},
		onShow() {
			this.$service.auth(this , this.$service.api.record.withdrawDetail , "GET" , '' , function(self , res){
				console.log(res , "res");
				self.moneyType = res.data;
				self.owner = res.data.alipay_name;
				// self.bank = res.data.bank;
				self.bankAcount = res.data.alipay_account;
			});
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
	
	page {
		background-color: #EFF3F6;
	}
	.top{
		padding: 30rpx;
		box-sizing: border-box;
		width: 100%;
		.topin{
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding-bottom: 40rpx;
			.can_bor_bot{
				padding-bottom: 27rpx;
				border-bottom: 2rpx solid #F4F4F4;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.can{
				width: 100%;
				padding: 40rpx 30rpx 0;
				margin-bottom: 30rpx;
				box-sizing: border-box;
				.can_nums{
					font-size: 28rpx;
					color: #666666;
					text{
						color: #FA9C22;
						font-weight: bold;
					}
				}
				.topall{
					width: 136rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					background-color: #FA9C22;
					border-radius: 20rpx;
				}
			}
			.top_bot{
				box-sizing: border-box;
				padding: 0 30rpx;
				.inp_num{
					font-size: 24rpx;
					color: #999999;
				}
				.keyword{
					padding-bottom: 20rpx;
					border-bottom: 2rpx solid #F4F4F4;
					margin-top: 10rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.ex{
						font-size: 34rpx;
						color: #999;
					}
					input{
						width: 70%;
						font-size: 56rpx;
						color: #333;
					}
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
		}
	}
	.msg_box{
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		.message{
			width:100%;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding:40rpx 30rpx;
			.msg_title{
				font-size: 28rpx;
				color: #333333;
			}
		}
		.msg_item{
			width: 100%;
			display: flex;
			align-items: center;
			padding: 40rpx 0 20rpx;
			border-bottom: 2rpx solid #F4F4F4;
			text{
				font-size: 26rpx;
				color: #666666;
				flex: 1;
			}
			input{
				flex: 2;
				font-size: 26rpx;
			}
		}
	}
	.tips{
		box-sizing: border-box;
		padding: 34rpx 30rpx 80rpx;
		font-size: 24rpx;
		color: #999999;
		.tip2{
			margin: 24rpx 0;
		}
	}
	.submit{
		box-sizing: border-box;
		padding: 0 100rpx;
		._submit{
			width: 100%;
			height: 100rpx;
			border-radius: 50rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 100rpx;
			margin-bottom: 20rpx;
		}
		.bg1{
			background-color: #B5D8FF;
		}
		.bg2{
			background-color: #2189FF;
		}
	}
	.ffff{
		font-size: 28upx;
		color: #333333;
	}
</style>
