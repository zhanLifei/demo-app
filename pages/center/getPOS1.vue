<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="getpos_box">
			<view class="getpos_left">
				<view class="get_title">
					<text>建设银行信用卡</text>
				</view>
				<view class="get_img">
					<image src="../../static/img/getpos.png" mode=""></image>
				</view>
			</view>
			<view class="getpos_right">
				<view class="get_text">
					<text>收到POS机后，进行首刷600元及以上的金额，首刷成功拍照上传至系统，审核通过奖励20个车贝与退还扣除的30个车贝。</text>
				</view>
				<view class="btn_padd">

					<view class="get_btn">
						<text>申请领用</text>
					</view>
				</view>
			</view>
		</view>
		<view class="getpos_box">
			<view class="getpos_left">
				<view class="get_title">
					<text>建设银行信用卡</text>
				</view>
				<view class="get_img">
					<image src="../../static/img/getpos.png" mode=""></image>
				</view>
			</view>
			<view class="getpos_right">
				<view class="get_text">
					<text>收到POS机后，进行首刷600元及以上的金额，首刷成功拍照上传至系统，审核通过奖励20个车贝与退还扣除的30个车贝。</text>
				</view>
				<view class="btn_padd">

					<view class="get_btn">
						<text>申请领用</text>
					</view>
				</view>
			</view>
		</view>
		<view class="getpos_box">
			<view class="getpos_left">
				<view class="get_title">
					<text>建设银行信用卡</text>
				</view>
				<view class="get_img">
					<image src="../../static/img/getpos.png" mode=""></image>
				</view>
			</view>
			<view class="getpos_right">
				<view class="get_text">
					<text>收到POS机后，进行首刷600元及以上的金额，首刷成功拍照上传至系统，审核通过奖励20个车贝与退还扣除的30个车贝。</text>
				</view>
				<view class="btn_padd">

					<view class="get_btn">
						<text>申请领用</text>
					</view>
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
				Htitle: "领用POS机",
				Hlicon: "../../static/icon/left_whitch.png",
				// hstyle:"background:transparent"
			}
		}
	}
</script>

<style>
	.content {
		background-color: #2189FF;
		/* padding-left: 24upx; */
		/* padding-right: 24upx; */
	}

	.getpos_box {
		background-color: #faf7fa;
		display: flex;
		border-radius: 10upx;
		box-shadow: 10upx 10upx 0upx 0px #7ab5fa, 20upx 20upx 0upx 0px #5a9ff1;
		width: 92%;
		margin: 0 auto 30upx;

	}

	.getpos_left {
		width: 40%;
	}

	.getpos_right {
		width: 60%;
	}

	.get_title {
		background-color: #FF8A1A;
		color: #FFFFFF;
		font-size: 26upx;
		width: 83%;
		padding: 10upx;
		border-radius: 0 26upx 26upx 0;
		margin: 20upx 0;
	}

	.get_img {
		padding: 10upx;
	}

	.get_img image {
		width: 267upx;
		height: 168upx;
	}

	.get_text {
		color: #6F7274;
		font-size: 22upx;
		padding: 30upx;
		
	}
.get_text text{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}
	.btn_padd {
		padding: 10upx 30upx;
		text-align: center;
		display: flex;
		justify-content: center;
	}

	.get_btn {
		color: #FFFFFF;
		font-size: 26upx;
		background-image: radial-gradient(#52A3FF, #1B7FF0);
		width: 60%;
		padding: 18upx;
		border-radius: 40upx;
		font-weight: bold;
	}
</style>
