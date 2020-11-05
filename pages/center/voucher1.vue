<template>
	<view class="content">
		<header-nav :subtitle='up' :url_ri="url_ri" :Htitle='title' :Hlicon='icon'></header-nav>
		<view class="tab">
			<view :class="['inn',current==0? 'active':'']" @click="current = 0">
				审核中
			</view>
			<view :class="['inn',current==1? 'active':'']" @click="current = 1">
				已通过
			</view>
		</view>
		<view class="list" v-if="current==0">
			<view class="liner">
				<image src="../../static/img/Snipaste_2020-04-01_09-37-01.png" mode=""></image>
				<view class="lbottom">
					<view class="status_btn">
						审核中
					</view>
					<view class="status_d">
						2020-4-7 13:45:03
					</view>
				</view>
			</view>
		</view>
		
		<view class="list" v-if="current==1">
			<view class="liner">
				<image src="../../static/img/Snipaste_2020-04-01_09-37-01.png" mode=""></image>
				<view class="details">
					<view class="in-detail">
						<text>商业险</text>
						<text>￥10</text>
					</view>
					
					<view class="in-detail">
						<text>商业险</text>
						<text>￥10</text>
					</view>
					
					<view class="in-detail">
						<text>商业险</text>
						<text>￥10</text>
					</view>
					
					<view class="in-detail">
						<text>商业险</text>
						<text>￥1500</text>
					</view>
				</view>
				<view class="lbottom">
					<view class="status_btn1">
						已通过
					</view>
					<view class="status_d">
						2020-4-7 13:45:03
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerNav from '@/components/header_nav.vue'
	export default {
		data() {
			return {
				title: '车险凭证',
				up:'上传凭证',
				icon:'../../static/icon/left_whitch.png',
				current:0,
				url_ri:'/pages/center/upload_voucher'
			}
		},
		components:{
			headerNav
		},
		methods:{
			
		},
		onShow() {
			this.$service.auth(this , this.$service.api.center.insuranceLog , "GET" , {
				status:3
			},function(self , res){
				console.log(res)
			})
		}
	}
</script>

<style lang="less">

	page {
		background-color: #EFF3F6;
	}
	.tab{
		width: 100%;
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		position: fixed;
		.inn{
			flex: 1;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 28rpx;
			color: #333;
			box-sizing: border-box;
			
			&.active{
				color: #2189FF;
				border-bottom: 4rpx solid #2189FF;
			}
		}
	}
	.list{
		width: 100%;
		box-sizing: border-box;
		padding: 100rpx 20rpx 0;
		.liner{
			background-color: #FFFFFF;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			border-radius: 20rpx;
			margin-top: 30rpx;
			image{
				width: 500rpx;
				height: 230rpx;
				margin-bottom: 20rpx;
			}
			.lbottom{
				margin-top: 30rpx;
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.status_btn{
					padding: 6rpx 18rpx;
					border-radius: 30rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					background-color: #FBB35A;
				}
				.status_btn1{
					padding: 6rpx 18rpx;
					border-radius: 30rpx;
					font-size: 28rpx;
					color: #FFFFFF;
					background-color: #2189FF;
				}
				.status_d{
					padding-left: 22rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}
	.details{
		width: 500rpx;
		display: flex;
		flex-wrap: wrap;
		.in-detail{
			// width: 250rpx;
			font-size: 26rpx;
			margin-top: 6rpx;
			text:first-child{
				color: #2189FF;
			}
			&:nth-child(odd){
				margin-right: 40rpx;
			}
			text:last-child{
				color: #333333;
				margin-left: 20rpx;
			}
		}
	}
</style>
