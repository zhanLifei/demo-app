<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/index/provinceCity')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>选择保险公司</text>
			</view>
		</view>
		
		<view class="inscom">
			<view class="inscom_item" v-for="(it , i ) in inscomlis" :key = "i" @click="selins(i , it.id)">
				<view class="inscom_sel_icon" >
					<image :src="index == i ? '../../static/icon/radio_select.png':'../../static/icon/radio.png'" mode=""></image>  
				</view>
				<view class="inscom_coms">
					<text>{{it.company_name}}</text>
					<text>{{it.discounts}}折</text>
				</view>
			</view>
		</view>
		
		<view class="btns" @click="next">下一步</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				index:0,
				res:'',
				selectbloon:false,//用来判断用户是否是没有选择保险公司而是直接点击下一步,
				compsId:'',//保险公司id
				inscomlis:[
					// {
					// 	id:1,
					// 	name:"保险公司1",
					// 	discount:"95折"
					// },
					// {
					// 	id:2,
					// 	name:"保险公司1",
					// 	discount:"95折"
					// },
					// {
					// 	id:3,
					// 	name:"保险公司1",
					// 	discount:"95折"
					// },
					// {
					// 	id:4,
					// 	name:"保险公司1",
					// 	discount:"95折"
					// },
					// {
					// 	id:5,
					// 	name:"保险公司1",
					// 	discount:"95折"
					// }
				]
			}
		},
		methods:{
			jump(e){
				uni.navigateTo({
					url:e
				})
			},
			selins(e,id){
				this.selectbloon = !this.selectbloon;
				this.index = e;
				console.log(id)
				this.compsId = id;
			},
			next(){
				if(this.inscomlis.length == 1){//如果数组只有一项 ,用户可能会直接点击一下步,所以默认取第一项的id
					this.compsId = this.inscomlis[0].id;
					console.log(this.compsId , this.inscomlis.length,'1');
					uni.navigateTo({
						url:'/pages/record/custom?id='+this.compsId
					})
				}else if(this.compsId == ''){//用户默认第一项
					this.compsId = this.inscomlis[0].id;
					uni.navigateTo({
						url:'/pages/record/custom?id='+this.compsId
					})
					console.log(this.compsId,'2');
				}else{
					uni.navigateTo({
						url:'/pages/record/custom?id='+this.compsId
					})
				}
			}
		},
		onShow() {
			this.res = uni.getStorageSync('inscompanys');
			this.inscomlis = uni.getStorageSync('inscompanys').data.company_list;
			console.log(this.inscomlis)
		}
	}
</script>

<style>
	.content{
		background-color: #FFFFFF;
	}
	.header{
		background-color: #2189FF;
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
	.inscom{
		margin-bottom: 300upx;
	}
	.inscom_item{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0upx 40upx;
		/* text-align: center; */
		/* justify-content: center; */
	}
	.inscom_sel_icon{
		padding-right:20upx ;
		width: 40upx;
		height: 40upx;
	}
	.inscom_coms{
		color: #333333;
		font-size: 30upx;
		text-align: center;
		display: flex;
		justify-content:space-between ;
		width: 90%;
		padding: 40upx 0;
		border-bottom: 2upx solid #F4F4F4;
	}
	.inscom_coms text:nth-of-type(2){
		background-color: #FFF0DD;
		color: #FA9C22;
		padding: 0upx 20upx; 
	}
	.btns{
		text-align: center;
		margin: 0 auto;
		width: 70%;
	   color: #FFFFFF;
	   font-size: 36upx;
	   background-color: #0089E2;
	   padding: 30upx 0;
	   border-radius: 60upx;
	}
</style>
