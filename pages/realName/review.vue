<template>
	<view class="content">
		<headers :Htitle="title" :Hlicon="icon" :url_le="url_left"></headers>
		<!-- <view class="img" @click="change()">
			<block v-if="ii == 0"><image src="/static/me/review.png" mode="widthFix"></image></block>
			<block v-else-if="ii == 1"><image src="/static/me/success.png" mode="widthFix"></image></block>
			<block v-else><image src="/static/me/fail.png" mode="widthFix"></image></block>
			<view class="sta">
				<text v-if="ii == 0">审核中</text>
				<text v-else-if="ii == 1">提交成功</text>
				<text v-else>提交失败</text>
			</view>
		</view> -->
		<view class="pwd">
			<view class="oldpwd">
				<input type="text" v-model="alipay_name" placeholder="请输入支付宝名称"/>
			</view>
			 <view class="oldpwd">
				<input type="text" v-model="alipay_account" placeholder="请输入支付宝账号"/>
			</view> 
			
		</view>
		<view class="btn" @click="submit()">
			确认
		</view>
	</view>
</template>

<script>
	import service from '../../service.js'
	import headers from '@/components/header_nav.vue';
	export default {
		components: {
			headers
		},
		data(){
			return{
				ii:0,
				title: '绑定账号',
				icon: '/static/icon/left_whitch.png',
				url_left: '/pages/realName/real_name',
				alipay_name:'',
				alipay_account:''
			}
		},
		methods:{
			// change(){
			// 	this.ii = this.ii+1
			// 	if(this.ii >= 3){
			// 		this.ii = 0
			// 	}
			// 	console.log(this.ii)
			// },
			submit(){
				service.auth(this,service.api.realName.bindAccount,"POST",{
					alipay_name:this.alipay_name,
					alipay_account:this.alipay_account
				},function(self,res){
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				})
			},
		}
		
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
	}
	.content {
		width: 100%;
		height: 100%;
		padding-top: calc(102rpx + var(--status-bar-height));
	}
	/* .header {
		 background: #FAFAFA;
		 border-bottom: 2rpx solid #F2F2F2;
	} */
	// .img{
	// 	margin: 184rpx auto 0;
	// 	width: 168rpx;
	// 	image{
	// 		width: 168rpx;
	// 		height: 168rpx;
	// 	}
	// 	.sta{
	// 		font-size: 38rpx;
	// 		font-weight: bold;
	// 		color: #333333;
	// 		text-align: center;
	// 	}
	// }
	
	.pwd{
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		font-size: 32rpx;
		color: #333333;
		margin-top: 28rpx;
	}
	.pwd .oldpwd{
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		height: 86rpx;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		border-bottom: 2rpx solid #409afe;
	}
	.btn{
		width: 600rpx;
		height: 76rpx;
		line-height: 76rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 34rpx;
		border-radius: 38rpx;
		margin: 52rpx auto 0;
		background: #409afe;
	}
</style>
