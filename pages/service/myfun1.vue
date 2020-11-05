<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" ></headers>
		<view class="nav_box">
			<view :class="['nav_it', {'active':it.id === index }]" v-for="(it , i) in navlist" :key="it.id" @click="selnav(it.id)">
				<text>{{it.title}}</text>
			</view>
		</view>
		<!-- - -->
		<view v-if="index === 1" class="funtion_box" v-for="(it , i) in funlist" :key = "it.id">
				<view class="fun_top">
					<view class="top_text1">
						<text>{{it.name}}</text>
					</view>
					<view class="top_text2">
						<text>待使用</text>
					</view>
				</view>
				<view class="radi_box">
					<view class="rad1">
						
					</view>
					<view class="bord">
						
					</view>
					<view class="rad2">
						
					</view>
				</view>
				<view class="fun_botbox">
					<view class="fun_bott">
						<text>核销日期：</text>
						<text>{{it.time}}</text>
					</view>
					<view class="top_text3">
						<text>{{it.chebei}}</text>
					</view>
				</view>
		</view>
		<!-- - -->
		<view v-if="index === 2" class="funtion_box" v-for="(it , i) in funlist" :key = "it.id">
				<view class="fun_top">
					<view class="top_text1">
						<text>{{it.name}}</text>
					</view>
					<view class="top_text2">
						<text>待使用</text>
					</view>
				</view>
				<view class="radi_box">
					<view class="rad1">
						
					</view>
					<view class="bord">
						
					</view>
					<view class="rad2">
						
					</view>
				</view>
				<view class="fun_botbox">
					<view class="fun_bott">
						<text>核销日期：</text>
						<text>{{it.time}}</text>
					</view>
					<view class="top_text3">
						<text>{{it.chebei}}</text>
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
				Htitle: "我的劵",
				Hlicon: "../../static/icon/left_whitch.png",
				index: 1,
				navlist: [{
						id: 1,
						title: "待使用"
					},
					{
						id: 2,
						title: "已使用"
					}
				],
				funlist:[
					{
						id:1,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:2,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:3,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:4,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:5,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
					},
					{
						id:6,
						name:"洗车劵",
						chebei:"7车贝",
						time:"2020-05-04 15：30：02"
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
	/* .content{
		padding-left: 24upx;
		padding-right: 24upx;
	} */
	.funtion_box{
		background-color: #FFFFFF;
		margin: 30upx 0;
		border-radius: 6upx;
	}
	.fun_top{
		display: flex;
		padding: 40upx 30upx 20upx;
		align-items: center;
	}
	.top_text1{
		color: #0F82F8;
		font-size: 100upx;
		width: 80%;
		text-align: center;
		font-weight: bold;
		text-align: start;
	}
	.top_text2{
		width: 20%;
		color: #FFFFFF;
		font-size: 32upx;
		text-align: center;
		vertical-align:bottom;
		background-color:#2189FF;
		border-radius: 30upx;
		padding: 10upx 20upx;
		margin-right: 10upx;
	}
	/* .top_text2 text{
		display: block;
		margin-top: 100upx;
	} */
	.fun_bott{
		color: #999999;
		font-size: 24upx;
	}
	.radi_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 0;
	}
	.rad1{
		width: 10upx;
		height: 20upx;
		background-color: #f4f4f4;
		border-radius: 0 10upx 10upx 0;
	}
	.bord{
		border: 2upx solid #f4f4f4;
		width: 92%;
	}
	.rad2{
		background-color: #f4f4f4;
		width: 10upx;
		height: 20upx;
		border-radius: 10upx 0 0 10upx;
	}
	.fun_botbox{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 20upx;
	}
	.top_text3{
		color: #F99727;
		font-size: 32upx;
		margin-right: 20upx;
	}
</style>
