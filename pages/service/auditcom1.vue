<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="nav_box">
			<view :class="['nav_it', {'active':it.id === index }]" v-for="(it , i) in navlist" :key="it.id" @click="selnav(it.id)">
				<text>{{it.title}}</text>
			</view>
		</view>
		<!-- - -->
		<view v-if="index === 1" class="com_box" v-for="(it ,i ) in comlist" :key="it.id">
			<view class="com_left">
				<view class="left_top">
					<view class="top_title">
						<text>2月佣金结算</text>
					</view>
					<view class="top_num">
						<text>{{it.nums}}</text>
					</view>
				</view>
				<view class="left_bot">
					<text>{{it.time}}</text>
				</view>
			</view>
			<view class="com_right">
				<view class="right_btn">
					<text>{{it.btnname}}</text>
				</view>
			</view>
		</view>
		<!-- - -->
		<view v-if="index === 2" class="com_box" v-for="(it ,i ) in comlist" :key="it.id">
			<view class="com_left">
				<view class="left_top">
					<view class="top_title">
						<text>2月佣金结算</text>
					</view>
					<view class="top_num">
						<text>{{it.nums}}</text>
					</view>
				</view>
				<view class="left_bot">
					<text>{{it.time}}</text>
				</view>
			</view>
			<view class="com_right">
				<view class="right_btn2">
					<text>{{it.btnname}}</text>
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
				Htitle: "佣金审核",
				Hlicon: "../../static/icon/left_whitch.png",
				index:1,
				navlist:[
					{
						id:1,
						title:"审核中"
					},
					{
						id:2,
						title:"已通过"
					}
				],
				comlist:[
					{
						id:1,
						nums:"58张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:2,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:3,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:4,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:5,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:6,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:7,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					},
					{
						id:8,
						nums:"57张",
						time:"2020-4-7 13:45:03",
						btnname:"审核中"
					}
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
		display: flex;
		align-items: center;
		padding: 40upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.left_top{
		display: flex;
		font-size: 28upx;
		padding-bottom: 10upx;
	}
	.top_title{
		color: #333333;
		margin-right: 20upx;
	}
	.top_num{
		color: #007AFF;
	}
	.com_left{
		width: 60%;
		
	}
	.left_bot{
		color: #999999;
		font-size: 22upx;
	}
	.com_right{
		width:40%;
		font-size: 28upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right_btn{
		background-color: #fbb35a;
		color: #FFFFFF;
		text-align: center;
		padding:10upx 30upx;
		border-radius: 29upx;
	}
	.right_btn2{
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding:10upx 30upx;
		border-radius: 29upx;
	}
</style>
