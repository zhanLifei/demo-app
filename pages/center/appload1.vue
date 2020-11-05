<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="text_box">
			<view class="text_name">
				<text>收件人姓名</text>
			</view>
			<input type="text" value="" placeholder="请输入收件人姓名" placeholder-class="inplss" />
		</view>
		<view class="text_box">
			<view class="text_name">
				<text>收件人电话</text>
			</view>
			<input type="text" value="" placeholder="请输入收件人电话" placeholder-class="inplss" />
		</view>
		<view class="text_box">
			<view class="text_name">
				<text>收件人地址</text>
			</view>
			<input type="text" value="" placeholder="请输入收件人地址" placeholder-class="inplss" />
		</view>
		<view class="bottom_btn ">
			<text>提交</text>
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
				Htitle: "填写地址",
				Hlicon: "../../static/icon/left_whitch.png",
				// hstyle:"background:transparent"
			}
		}
	}
</script>

<style>
	.text_box {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}

	.text_name {
		color: #333333;
		font-size: 30upx;
		width: 30%;
	}

	.inplss {
		color: #C3C3C3;
		font-size: 30upx;
	}

	.text_box input {
		width: 70%;
	}

	.bottom_btn {
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 60%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 30upx auto 0;
	}
</style>
