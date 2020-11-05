<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="nav_box">
			<view :class="['nav_it', {'active':it.id === index }]" v-for="(it , i) in navlist" :key="it.id" @click="selnav(it.id)">
				<text>{{it.title}}</text>
			</view>
		</view>
		<!-- - -->
		<view v-if="index === 1" class="com_box" v-for="(it ,i ) in appoinlist" :key="it.id">
			<view class="com_top">
				<view class="left_top">
					<image src="../../static/icon/headimg.png" mode=""></image>
				</view>
				<view class="left_mid">
					<text>{{it.name}}</text>
				</view>
				<view class="right_time">
					<text style="margin-right: 4upx;">预约时间:</text>
					<text>{{it.time}}</text>
				</view>
			</view>
			<view class="com_bot">
				<view class="bot_btn1">
					<text>取消</text>
				</view>
				<view class="bot_btn">
					<text>同意</text>
				</view>
			</view>
		</view>
		<!-- - -->
		<view v-if="index === 2" class="com_box2" v-for="(it ,i ) in appoinlist" :key="it.id">
			<view class="com_left">
				<view class="left_top2">
					<image src="../../static/icon/headimg.png" mode=""></image>
				</view>
				<view class="left_mid2">
					<text>{{it.name}}</text>
				</view>
				
			</view>
			<view class="com_right">
				<view class="right_text">
					<text>广州市牛哄哄洗车旗舰店</text>
				</view>
				<view class="right_time2">
					<text style="margin-right: 4upx;">预约时间:</text>
					<text>{{it.time}}</text>
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
				Htitle: "我的预约",
				Hlicon: "../../static/icon/left_whitch.png",
				index: 1,
				navlist: [{
						id: 1,
						title: "处理中"
					},
					{
						id: 2,
						title: "已通过"
					},
					{
						id: 3,
						title: "已取消"
					}
				],
				appoinlist:[
					{
						id:1,
						name:"牛哄哄",
						time:"2020-4-7 13:45:03",
						
					},
					{
						id:2,
						name:"牛哄哄",
						time:"2020-4-7 13:45:03",
						
					},
					{
						id:3,
						name:"牛哄哄",
						time:"2020-4-7 13:45:03",
						
					},
					{
						id:4,
						name:"牛哄哄",
						time:"2020-4-7 13:45:03",
						
					},
					{
						id:5,
						name:"牛哄哄",
						time:"2020-4-7 13:45:03",
						
					},
					
				]
			}
		},
		methods:{
			selnav(e){
				this.index = e
			}
		}
	}
</script>

<style>
	.content{
		padding:calc(224rpx + var(--status-bar-height)) 24upx 0;
	}
	.nav_box{
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		left: 0;
		top: calc(102rpx + var(--status-bar-height));
		width: 100%;
		background-color: #FFFFFF;
		/* padding: 30upx 0; */
		color: #333333;
		font-size: 28upx;
	}
	.nav_it{
		border-bottom: 2upx solid #FFFFFF;
		padding: 30upx 0;
		width: 50%;
		box-sizing: border-box;
		text-align: center;
		
	}
	.active{
		border-bottom: 2upx solid #2189FF;
		color: #2189FF;
	}
	.com_box{
		background-color: #FFFFFF;
		margin:20upx auto ;
		padding: 40upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.com_top{
		display: flex;
		align-items: center;
	}
	.left_top{
		width: 15%;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.left_top image{
		width: 60upx;
		height: 60upx;
	}
	.left_mid{
		width: 35%;
		color: #333333;
		font-size: 28upx;
	}
	.right_time{
		width: 50%;
		color: #999999;
		font-size: 22upx;
	}
	.com_bot{
		display: flex;
		align-items: center;
		justify-content:space-around ;
		padding: 20upx 0;
		color: ;
	}
	.bot_btn1{
		color: #FFFFFF;
		font-size: 28upx;
		background-color: #999999;
		border-radius: 28upx;
		padding: 10upx 50upx;
	}
	.bot_btn{
		color: #FFFFFF;
		font-size: 28upx;
		border-radius: 28upx;
		background-color: #2189FF;
		padding: 10upx 50upx;
	}
	.com_box2{
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		margin:20upx auto ;
		padding: 40upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.right_time2{
		color: #999999;
		font-size: 22upx;
	}
	.com_left{
		display: flex;
		width: 50%;
		align-items: center;
	}
	.left_top2{
		margin-right: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.left_top2 image{
		width: 60upx;
		height: 60upx;
	}
	.left_mid2{
		color: #333333;
		font-size: 28upx;
	}
	.com_right{
		text-align: end;
		width: 50%;
	}
	.right_text{
		padding-bottom:10upx ;
		color: #333333;
		font-size: 28upx;
	}
	
</style>
