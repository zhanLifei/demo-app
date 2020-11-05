
<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump()">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
			</view>
				<view class="center_title">
					<text>汽车资讯列表</text>
				</view>
		</view>
	
			<view class="reading-box" v-for="(item,index) in dataList" :key="index">
				<view class="text-one" @click="carDetails('/pages/mycar/car-details?id='+item.id)" >
					<view class="car-text">{{item.title}}</view>
					<view class="car-img">
						<image :src="item.thumb1" mode=""></image>
						<image :src="item.thumb2" mode=""></image>
						<image :src="item.thumb3" mode=""></image>
					</view>
					<view class="time-author">
						<view class="reading">
							<view class="car-name">{{item.author}}</view>
							<view class="car-name">{{item.read}}</view>
						</view>
						<view class="car-time">{{item.createtime}}</view>
					</view>
					
				</view>
				
			</view>
			
		<!-- </scroll-view> -->
		
		
	<!-- <view class="loadclass" v-if="loadshow"><text>数据已加载完毕</text></view> -->
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import service from "../../service.js";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			headers,
			uniLoadMore
		},
		data() {
			return {
				dataList:[],
			
				textid: '',//文章id
				url_left:"/pages/main/index",
				
				navid:1,
			
				textlist:[
					// {
					// 	id:1,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// },	
				],
					loadshow: true,
					colorshow: false,
					isLoading: false,
					scroll: false,
					status: 0,
					pages: 1,
					limit: 15,
					page: 0,
					out: 0,
			}
		},
		methods:{
			jump(){
					uni.navigateBack({
						delta:1
					})
			},
			jum(id,type){
				uni.navigateTo({
					url:'/pages/index/article?id='+id+'&&type='+type 
				})
			},
		carDetails(url){
			uni.navigateTo({
				url: url
			});
		},
			lower(){
				// console.log("121")
			},
			Loadthepage() {
				
				var self = this;
				if (!self.loadshow) {
					return;
				}
				if (self.page <= self.pages) {
					var page = self.page + 1;
					this.$service.auth(
						this,
						this.$service.api.index.cargetArticle,
						'GET',
						{
							page: page,
							limit: 15,
						},
						function(self, res) {
							console.log(res);
							self.pages = res.data.last_page;
							self.page = page;
							// self.activity = res.data.activity
							var list = res.data.data;
							self.usdt = list.usdt;
							self.alipay = list.alipay;
							list.forEach((v, i) => {
								self.dataList.push(v);
							});
							self.$forceUpdate();
							console.log(self.dataList);
							if (self.pages == self.page || self.dataList.length == 0) {
								self.loadshow = false;
								uni.showToast({
									title: '数据已加载完毕',
									icon: 'none'
								});
								console.log('1', self.page, self.pages);
							} else {
								self.loadshow = true;
								console.log('2', self.page, self.pages);
							}
						}
					);
				} else {
					self.loadshow = false;
					uni.showToast({
						title: '数据已加载完毕',
						icon: 'none'
					});
					console.log('3', self.page, self.pages);
				}
			},
			
		},
		onLoad() {
		this.Loadthepage()
			// service.auth(this , service.api.index.cararticleDetail , 'GET' ,  function(self , res){
			// 	// console.log(res);
			// 	// self.textlist = res.data.list;
			// });
			// this.loadData();
		}
		
	}
</script>

<style>
/* 	page{
		background-color: #fff;
	} */
	.top_nav {
		color: #666666;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 40upx;
		background-color: #FFFFFF
	}
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
	.reading-box{
		padding: 20upx;
		margin: 40upx 30upx auto; 
		box-shadow:0 0 10upx #666 ;
		background-color: #fff;
	}
	.more{
		font-size: 28upx;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20upx;
	}
	.more-img {
		width: 50upx;
		height: 50upx;
	}
	.text-one{
		margin-top: 20upx;
		/* border-bottom: 1px solid #ccc; */
	}
	
	.car-text{
		font-size: 28upx;
	}
	.car-img{
		display: flex;
		justify-content: space-around;
		margin: 20upx 0;
	}
	.car-img image{
		width: 200upx;
		height: 200upx;
	}
	.time-author{
		display: flex;
		justify-content: space-between;
		}
	.car-name{
		font-size: 23upx;
		margin-bottom: 40upx;
		color: #999;
		margin-left: 20upx;
		}
		.reading{
			display: flex;
			}
	.car-time{
		font-size: 23upx;
		margin-bottom: 40upx;
		color: #999;
	}
</style>
