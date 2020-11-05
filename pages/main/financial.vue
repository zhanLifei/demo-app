<template>
	<view class="content">
		<headers :Htitle="Htitle" ></headers>
		<view class="apply_box" >
			<view class="apply_left">
				<image src="../../static/img/financial_img.png" mode="widthFix"></image>
			</view>
			<view class="apply_right">
				<view class="right_title">
					<text>免费申请信用卡</text>
				</view>
				<view class="right_btn" @click="jump('/pages/center/credit_card')">
					<text>马上申请</text>
				</view>
			</view>
		</view>
		<view class="apply_box">
			<view class="apply_left">
				<image src="../../static/img/postttt.png" mode="widthFix"></image>
			</view>
			<view class="apply_right">
				<view class="right_title">
					<text>申请领用POS</text>
				</view>
				<view class="right_btn" @click="jump('/pages/center/getPOS')">
					<text>马上申请</text>
				</view>
			</view>
		</view>
		<view class="apply_box">
			<view class="apply_left">
				<image src="../../static/img/xxxxx.png" mode="widthFix"></image>
			</view>
			<view class="apply_right">
				<view class="right_title">
					<text>点我申请贷款</text>
				</view>
				<view class="right_btn" @click="jump('/pages/center/apploans2')"><!--  -->
					<text>马上申请</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue"
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "金融",
				// Hlicon: "../../static/icon/left_whitch.png",
				// hstyle:"background:transparent"
			}
		},
		methods:{
			jump(e){
				uni.navigateTo({
					url:e
				})
			}
		}
	}
</script>

<style>
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.apply_box{
		background: url(../../static/background/financial_back.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		margin: 30upx auto;
	}
	.apply_left{
		width: 40%;
		padding: 30upx;
		box-sizing: border-box;
	}	
	.apply_right{
		width: 60%;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.right_title{
		color: #333333;
		font-size: 36upx;
		font-weight: bold;
		
	}
	.right_btn{
		color: #FFFFFF;
		font-size: 22upx;
		background-image:radial-gradient(#FFBC65 , #FA9A1C) ;
		width: 40%;
		padding: 10upx;
		border-radius: 30upx;
		margin-top:10upx ;
	}
</style>
