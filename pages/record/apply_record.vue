<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
			<view class="center_title">
				<text>申请记录</text>
			</view>
		</view>
		<view class="tabs">
			<view :class="['tit',current == index?'active':'']" v-for="(item,index) in tabs" :key="index" @click="change(index)">
				{{item.tit}}
			</view>
		</view>
		<view style="width: 100%; height: 30rpx; background-color: #f6f3f7;"></view>
		<view class="list">
			<view class="data_list">
				<view class="list_left">
					<view class="nums">
						申请笔数5笔
					</view>
					<view class="day">
						2020-03-31 19:59
					</view>
				</view>
				<view class="list_right" :style="{color:col.col}">
					{{col.theme}}
				</view>
			</view>
			<view class="data_list">
				<view class="list_left">
					<view class="nums">
						申请笔数5笔
					</view>
					<view class="day">
						2020-03-31 19:59
					</view>
				</view>
				<view class="list_right" :style="{color:col.col}">
					{{col.theme}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						tit: '待审核',
					},
					{
						tit: '已通过'
					},
					{
						tit: '驳回'
					}
				],
				current: 0,
				col: {
						col: '#FA9C22',
						theme: '待审核'
					}
			}
		},
		methods: {
			change(i) {
				this.current = i
				const col = [{
						col: '#FA9C22',
						theme: '待审核'
					},
					{
						col: '#1AB560',
						theme: '已通过'
					},
					{
						col: '#E4393D',
						theme: '驳回'
					}
				];
				this.col = col[i]

			}
		},
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

	.content,
	page {
		background-color: #FFFFFF;
	}

	.tabs {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		font-size: 30rpx;
		color: #666666;
		display: flex;
		justify-content: space-around;

		// align-items: center;
		.tit {
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
		}

		.active {
			color: #2189FF;
			border-bottom: 4rpx solid #2189FF;
		}
	}

	.list {
		width: 100%;
		box-sizing: border-box;
		padding: 0 29rpx;

		.data_list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #F3F3F3;
			.list_left{
				.nums{
					font-size: 28rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
				.day{
					color: #B1B1B1;
					font-size: 24rpx;
				}
			}
			.list_right{
				font-size: 26rpx;
			}
		}
	}
</style>
