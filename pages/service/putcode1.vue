<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="code_box">
			<view class="code_img">
				<image src="../../static/login/login_logo.png" mode=""></image>
			</view>
			<view class="code_title">
				<text>收款金额(元)</text>
			</view>
			<view class="code_inp">
				<view class="code_icon">
					<text>¥</text>
				</view>
				<input class="inp_cl" type="text" value="" placeholder="" />
			</view>
		</view>
		<!-- - -->
		<view class="bottom_btn " >
						<text>确认</text>
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
				Htitle: "收劵码",
				Hlicon: "../../static/icon/left_whitch.png",
			}
		}
	}
</script>

<style>
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.code_box{
		background-color: #FFFFFF;
		padding: 30upx;
		margin-top: 30upx;
	}
	.code_img{
		text-align: center;
		padding: 50upx;
	}
	.code_img image{
		width: 414upx;
		height: 414upx;
	}
	.code_title{
		padding: 20upx 0;
		color: #333333;
		font-size: 30upx;
	}
	.code_inp{
		display: flex;
		align-items: center;
		border-bottom: 2upx solid #F4F4F4;
	}
	.code_icon{
		width: 10%;
		color: #333333;
		font-size: 50upx;
	}
	.inp_cl{
		width: 90%;
	}
	.bottom_btn{
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 60%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 90upx auto 0;
	}
</style>
