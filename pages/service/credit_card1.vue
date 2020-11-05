<template>
	<view class="content">
		<header-nav :subtitle='up' :Htitle='title' :Hlicon='icon' :url_ri="url_ri"></header-nav>
		<view class="tab">
			<view :class="['inn',current==0? 'active':'']" @click="current = 0">
				审核中
			</view>
			<view :class="['inn',current==1? 'active':'']" @click="current = 1">
				已通过
			</view>
			<view :class="['inn',current==2? 'active':'']" @click="current = 2">
				驳回
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="img_box">
					<image src="../../static/img/imgevalu.png" mode=""></image>
					<image src="../../static/img/imgevalu.png" mode=""></image>
					<image src="../../static/img/imgevalu.png" mode=""></image>
				</view>
				<view class="item_sta">
					<view class="sta">
						<view class="status bg1">
							审核中
						</view>
						<view class="tim">
							2020-4-7 13:45:03
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="img_box">
					<image src="../../static/img/imgevalu.png" mode=""></image>
					<image src="../../static/img/imgevalu.png" mode=""></image>
					<image src="../../static/img/imgevalu.png" mode=""></image>
				</view>
				<view class="item_sta">
					<view class="sta">
						<view class="status bg2">
							已通过
						</view>
						<view class="tim">
							2020-4-7 13:45:03
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="img_box">
					<image src="../../static/img/imgevalu.png" mode=""></image>
					<image src="../../static/img/imgevalu.png" mode=""></image>
					<image src="../../static/img/imgevalu.png" mode=""></image>
				</view>
				<view class="item_sta">
					<view class="sta">
						<view class="status bg3">
							驳回
						</view>
						<view class="tim">
							2020-4-7 13:45:03
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import headerNav from '@/components/header_nav.vue';
	import service from "../../service.js";
	export default {
		data() {
			return {
				title: '信用卡首刷',
				up:'上传凭证',
				icon:'../../static/icon/left_whitch.png',
				current:0,
				url_ri:'/pages/service/up_credit'
			}
		},
		components:{
			headerNav
		},
		methods:{
			
		},
		onShow() {
			service.auth(this , service.api.service.cardCheck , 'GET' , {card_fields:'' , card_id:1} , function(self ,res){
				console.log(res);
			})
		}
	}
</script>

<style lang="scss">

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
		padding: 0 20rpx;
		box-sizing: border-box;
		padding-top:100rpx;
		.item{
			margin-top: 20rpx;
			width: 100%;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			.img_box{
				width: 100%;
				display: flex;
				justify-content: space-around;
				image{
					width: 210rpx;
					height: 210rpx;
					border-radius: 10rpx;
				}
			}
			.item_sta{
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;
				.sta{
					display: flex;
					align-items: center;
				}
				.status{
					margin-right: 22rpx;
					padding: 4rpx 20rpx;
					border-radius: 20rpx;
					font-size: 28rpx;
					color: #FFFFFF;
				}
				.bg1{
					background-color: #FBB35A;
				}
				.bg2{
					background-color: #2189FF;
				}
				.bg3{
					background-color: #999999;
				}
				.tim{
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>
