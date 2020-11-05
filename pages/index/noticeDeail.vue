<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/index/notice')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>公告详情</text>
			</view>
		</view>
		<view class="notice">
			<text>{{contents}}</text>
			<view class="time">
				{{time}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				time:uni.getStorageSync('noticeTime'),
				contents:uni.getStorageSync('noticeConten')
			}
		},
		methods:{
			jump(url){
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>

<style>
	.header {
		background-color: #2575FE;
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

	.content {
		/* padding-right: 24upx;
		padding-left: 24upx; */
	}
	.notice{
		/*overflow: hidden;
		 text-overflow:ellipsis; 
		white-space: ;*/
		background-color: #FFFFFF;
		word-break:break-all;
		padding: 40upx 40upx;
		/* text-align: center; */
		/* margin: 0 auto; */
	}
	.notice text{
		display: block;
		/* margin-left:20upx; */
		font-size: 26upx;
	}
	.time{
		padding: 20upx 0  10upx;
		font-size: 12upx;
		color: #999999;
		text-align: end;
	}
</style>
