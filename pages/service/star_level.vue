<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/my')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>星级达人规则
				</text>
			</view>
		</view>
		<view class="list">
			<view class="items" v-for="(it , i) in levls" :key="i">
				<view class="item_head">
					<view class="lev">
						{{it.levelname}}
					</view>
					<view class="lev_deta">
						<view class="lev_item">
							<view>大区活跃{{it.big_active}}人</view>
							<view>小区成交{{it.small_active}}人</view>
						</view>
						<view class="lev_item">
							<view>直推实名{{it.down}}人</view>
							<view>直推成交{{it.down_deal}}人</view>
						</view>
					</view>
				</view>
				<view class="item_foot">
					<view class="foot1">
						奖励{{it.catename}}{{it.reward_num}}
					</view>
					<view class="foot2">
						享受车贝置换手续费分红{{it.bonus}}%&商业险置换手续费{{it.deal_bonus}}%
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				levls:''
			}
		},
		methods:{
			jump(url){
				uni.switchTab({
					url:url
				})
			}
		},
		onShow() {
			this.$service.auth(this , this.$service.api.service.team_level_list , 'POST' , {
				page:1,
				limit:15
			},function(self , res){
				console.log(res);
				self.levls = res.data
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

	.list {
		width: 100%;
		box-sizing: border-box;
		padding: 8rpx 20rpx;

		.items {
			width: 100%;
			border-radius: 10rpx;
			overflow: hidden;
			margin-top: 28rpx;
			.item_head {
				width: 100%;
				display: flex;
				align-items: center;
				background-color: #FBB35A;
				color: #fff;
				padding: 20rpx 0 30rpx;

				.lev {
					font-size: 32rpx;
					font-weight: bold;
					padding-left: 40rpx;
				}

				.lev_deta {
					font-size: 24rpx;
					margin-left: 108rpx;
					display: flex;
					align-items: center;
					.lev_item view:last-child{
							margin-top: 4rpx;
						}
					.lev_item:last-child{
						margin-left: 20rpx;
						
					}
				}
			}

			.item_foot {
				width: 100%;
				padding: 26rpx 16rpx;
				color: #333333;
				font-size: 26rpx;
				background-color: #fff;	
				box-sizing: border-box;
			}
		}
	}
</style>
