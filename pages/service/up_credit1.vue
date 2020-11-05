<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>上传信用卡首刷凭证
				</text>
			</view>
		</view>
		<view class="imgbox">
			<view class="tit">
				上传首刷凭证
			</view>
			<view class="imgs">
				<image src="../../static/icon/add_icon.png" mode=""></image>
			</view>
		</view>
		<view class="btns">
			确定
		</view>
	</view>
	
</template>

<script>
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
	.imgbox{
		width: 710rpx;
		margin: 36rpx auto 0;
		background-color: #fff;
		padding: 32rpx 20rpx 40rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		.tit{
			font-size: 28rpx;
			color: #666;
			box-sizing: border-box;
			margin-bottom: 36rpx;
			
		}
		.imgs{
			width: 100%;
			image{
				width: 140rpx;
				height: 140rpx;
			}
		}
	}
	.btns{
		text-align: center;
		margin: 150rpx auto 0;
		width: 70%;
	   color: #FFFFFF;
	   font-size: 36upx;
	   background-color:#2189FF;
	   padding: 20upx 0;
	   border-radius: 60upx;
	}
</style>
