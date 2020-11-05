<template>
	<view class="">
		<!-- <view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
		
			</view>
			<view class="center_title">
				<text>选择险种</text>
			</view>
		</view> -->
		
		<view class="inslist">
			<view class="inslist_it" v-for="(it , i ) in inslist" :key = "i" @click="selins(i,it.id)">
				<view class="inslist_selarch" v-if=" it.operate != true">
					<image :src="it.src1" mode=""></image>
				</view>
				<view class="inslist_selarch" v-else >
					<image :src="it.src2" mode=""></image>
				</view>
				<view class="inslist_name">
					<text>{{it.name}}</text>
				</view>
			</view>
		</view>
		<view class="hint">
			<text style="color:#333333; font-size: 22upx;">温馨提示：</text>
			<text>1. 请谨慎核对以上数据并在需要的地方打勾</text>
			<text>2. 2年内的车可以加划痕险</text>
			<text>3. 6年以上的车建议加自燃险</text>
		</view>
		
		<view class="insbtn">
			<text>提交</text>
		</view>
		
		<view class="clause">
			<view class="clause_img" @click="selclause">
				<image :src="clause?'../../static/icon/littlepitchon.png':'../../static/icon/littlenopitchon.png'" mode=""></image>
			</view>
			<view class="clause_cont">
				<text>免责条款</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			inslist:{
				type:Array
			}
		},
		data(){
			return{
				// inslist:[
				// 	{
				// 		id:1,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:2,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:3,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:4,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:5,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:6,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:7,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:8,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:9,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:10,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:11,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:12,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:13,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:14,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	},
				// 	{
				// 		id:15,
				// 		name:"交强险",
				// 		opartion:false,
				// 		src1:"../../static/icon/nopitchon.png",
				// 		src2:"../../static/icon/pitchon.png"
				// 	}
				// ],
				clause:true
			}
		},
		methods:{
			selclause(){
				this.clause = !this.clause
			},
			selins(i,id){
				this.$emit('xxx' , i,id);
				// this.$set(this.inslist[i] , 'operate' , true);
			}
		}
	}
</script>

<style>
	.header{
		background-color: #2575FE;
	}
	.left_{
		width: 36upx;
		height: 36upx;
	}
	.center_title{
		font-size: 36upx;
		color: #FFFFFF;
		margin-right: 72upx;
		width: 80%;
	}
	
	page{
		background-color: #EFF3F6;
	}
	/* .content{
		padding-right:24upx;
		padding-left: 24upx;
	} */
	.inslist{
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		/* justify-content: center; */
		align-items: center;
		color: #333333;
		font-size: 30upx;
		font-weight: bold;
		padding: 30upx 0;
	}
	.inslist_it{
		width:25%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
	}
	.inslist_selarch{
		width: 36upx;
		height: 36upx;
	}
	.inslist_name{
		
	}
	.hint{
		color: #666666;
		font-size: 22upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		box-sizing: border-box;
		padding: 30upx;
	}
	.hint text{
		margin-bottom:20upx;
	}
	.insbtn{
		background-color: #0089E2;
		color: #FFFFFF;
		padding: 20upx;
		text-align: center;
		width: 70%;
		border-radius: 44upx;
		margin: 30upx auto 0 ;
	}
	.clause{
		display: flex;
		/* justify-content: center; */
		align-items: center;
		/* text-align: center; */
		/* vertical-align: middle; */
		box-sizing: border-box;
		padding: 30upx 90upx;
		justify-content: flex-end;
	}
	.clause_img{
		display: flex;
		text-align: center;
		vertical-align: middle;
		width: 30upx;
		height: 30upx;
	}
	.clause_cont{
		font-size: 24upx;
		padding: 10upx 0;
		color: #FA9C22;
	}
</style>
