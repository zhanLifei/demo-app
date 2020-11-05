<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<!-- - -->
		<view class="title_box">
			<text>广州市牛哄哄修车旗舰店</text>
		</view>
		<view class="defail_box">
			<view class="defail_block" v-for="(it , i) in defaillist" :key = "it.id">
				<view class="block_left">
					<image :src="it.img" mode=""></image>
				</view>
				<view class="block_right">
					<view class="right1">
						<text>{{it.title}}</text>
					</view>
					<view class="right2">
						<text>{{it.subtitle}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- - -->
		<view class="bott_box">
			<view class="bott_block">
				<view class="bott_img">
					<image src="../../static/icon/erweima.png" mode=""></image>
				</view>
				<view class="bott_title">
					<text>收券码</text>
				</view>
			</view>
			
			<view class="bott_block">
				<view class="bott_img">
					<image src="../../static/icon/youhuiquan.png" mode=""></image>
				</view>
				<view class="bott_title">
					<text>核销记录</text>
				</view>
			</view>
			
			<view class="bott_block">
				<view class="bott_img">
					<image src="../../static/icon/licai.png" mode=""></image>
				</view>
				<view class="bott_title">
					<text>佣金结算</text>
				</view>
			</view>
			
			<view class="bott_block">
				<view class="bott_img">
					<image src="../../static/icon/lishidingdan.png" mode=""></image>
				</view>
				<view class="bott_title">
					<text>佣金审核</text>
				</view>
			</view>
			
			<view class="bott_block">
				<view class="bott_img">
					<image src="../../static/icon/huoqi.png" mode=""></image>
				</view>
				<view class="bott_title">
					<text>预约列表</text>
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
				Htitle: "商家中心",
				Hlicon: "../../static/icon/left_whitch.png",
				defaillist:[
					{
						id:1,
						img:"../../static/icon/category.png",
						title:"店铺类别",
						subtitle:"洗车服务"
					},
					{
						id:2,
						img:"../../static/icon/addressred.png",
						title:"店铺地址",
						subtitle:"广州市天河区中山大道中66号某某路左侧对面"
					},
					{
						id:3,
						img:"../../static/icon/colorphone.png",
						title:"联系方式",
						subtitle:"020-8888888"
					},
					{
						id:4,
						img:"../../static/icon/sertime.png",
						title:"服务期限",
						subtitle:"2020-01-03至2022-01-04"
					}
				],
				bottlist:[
					{
						id:1,
						imgs:"../../static/icon/sertime.png",
						name:""
					},
					{
						id:2,
						imgs:"",
						name:""
					},
					{
						id:3,
						imgs:"",
						name:""
					},
					{
						id:4,
						imgs:"",
						name:""
					},
					{
						id:5,
						imgs:"",
						name:""
					}
				]
			}
		}
	}
</script>

<style>
	.title_box{
		color:#000000;
		font-size: 32upx;
		font-weight: bold;
		background-color: #FFFFFF;
		padding: 30upx;
	}
	.defail_box{
		background-color: #FFFFFF;
	}
	.defail_block{
		display: flex;
		padding: 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}
	.block_left{
		width: 15%;
		text-align: center;
	}
	.block_left image{
		width: 36upx;
		height: 36upx;
	}
	.block_right{
		width: 85%;
	}
	.right1{
		color: #333333;
		font-size: 26upx;
	}
	.right2{
		color: #666666;
		font-size: 26upx;
	}
	.bott_box{
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 30upx 50upx;
		margin-top: 20upx;
	}
	.bott_block{
		padding: 50upx 0 0;
		width: 25%;
		text-align: center;
	}
	.bott_img image{
		width: 54upx;
		height: 54upx;
	}
	.bott_title{
		font-size: 26upx;
		color: #333333;
		margin-top: 10upx;
	}
</style>
