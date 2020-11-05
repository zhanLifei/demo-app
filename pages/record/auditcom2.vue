<template>
	<view class="content">
		<header-nav  :Htitle='title' :Hlicon='icon'  ></header-nav><!-- :url_ri="url_ri" -->
		<view class="tabs">
			<view :class="['tab',current==index?'act':'']" v-for="(item,index) in tab" :key='index' @click="tabs(index,index + 1)">
				{{item.name}}
			</view>
		</view>
		
		<view class="list">
			<view class="" v-for="(it , i) in list" :key="i">
			<view class="pireNum">
				<view class="pirBox">
					<view class="pri1">
				<text>申请救济金额:</text>
				<text>{{it.price}}</text>
			</view>
			<view class="pri2">
				<text>{{it.createtime.substr(0,11)}}</text>
			</view>
				</view>
		</view>
			<view class="items">
				<view class="item_title">
					{{it.content}}
				</view>
				<view class="img_box" >
					<image :src="it.thumb" mode=""></image>
					<!-- <image src="../../static/img/viedo.png" mode=""></image> -->
					<!-- <image src="../../static/img/viedo.png" mode=""></image> -->
				</view>
			<!-- <view class="day">
				2020-4-7 13:45:03
			</view>    v-for="(it1 , is) in it.thumb" :key="is"-->
			</view>
			</view>
			
			<view class="loadclass" v-if="loadshow">
				<text>正在加载</text>
			</view>
			<view class="loadclass" v-else>
				<text>数据已加载完毕</text>
			</view>
			
			
			
			<!-- <view class="items">
				<view class="item_title">
					我是新用户，但是没有享受新用户立减/不能用优惠券。上传不了截图，没有获得相应的好评返现。
				</view>
				<view class="img_box">
					<image src="../../static/img/viedo.png" mode=""></image>
					<image src="../../static/img/viedo.png" mode=""></image>
					<image src="../../static/img/viedo.png" mode=""></image>
				</view>
			<view class="day">
				2020-4-7 13:45:03
			</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import headerNav from '@/components/header_nav.vue'
	export default {
		data() {
			return {
				title: '救济申请',
				// up: '问题反馈',
				// url_ri:'/pages/center/question',
				icon: '../../static/icon/left_whitch.png',
				list:[],
				current: 0,
				type:1,
				page: 0,
				pages: 1,
				loadshow:true,
				tab: [{
					name: '处理中'
				}, {
					name: '已处理'
				}],
			}
		},
		methods: {
			tabs(index , type) {
				this.current = index;
				this.list = [];
				this.page = 0;
				this.pages = 1;
				this.loadshow = true;
				this.type = type;
				this.Loadthepage();
				console.log("1213")
			},
			
			Loadthepage() {
				var self = this;
				if(!self.loadshow){
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					self.$service.auth(self, self.$service.api.record.reliefFund, "GET", {
						page: page,
						limit: 15,
						type:self.type
					}, function(self, res) {
						console.log(res)
						self.pages = res.data.last_page;
						self.page = page;
						
						var lists = res.data.data;
						lists.forEach((v, i) => {
							self.list.push(v);
						});
						if (self.pages == self.page || self.list.length == 0) {
							self.loadshow = false
							uni.showToast({
								title: '数据已加载完毕',
								icon: 'none'
							});
						} else {
							self.loadshow = true
						}
					});
				} else {
					self.loadshow = false
					uni.showToast({
						title: '数据已加载完毕',
						icon: 'none'
					});
				}
			},
		},
		components: {
			headerNav
		},
		onShow() {
			this.Loadthepage()
			/* this.$service.auth(this , this.$service.api.record.reliefFund , "GET" , {
				page:1,
				limit:15,
				type:1
			},function(self , res){
				console.log(res);
				self.list = res.data.data;
			}); */
		}
	}
</script>

<style lang="less">
	.tabs {
		width: 100%;
		display: flex;
		background-color: #FFF;

		.tab {
			flex: 1;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #333333;
			font-size: 28rpx;
			box-sizing: border-box;

			&.act {
				color: #2189FF;
				border-bottom: 4rpx solid #2189FF;
			}
		}
	}

	.list {
		width: 100%;
		box-sizing: border-box;
		// padding: 0rpx 20rpx;
		// margin-top: 20rpx;

		.items {
			margin-bottom: 30rpx;
			width: 100%;
			background-color: #fff;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 30rpx 12rpx 26rpx;
			.item_title{
				font-size: 26rpx;
				color: #333333;
				text-indent: 20rpx;
			}
			.img_box{
				margin-top: 26rpx;
				margin-bottom: 20rpx;
				width: 100%;
				
				image{
					width: 227rpx;
					height: 160rpx;
				}
				image:nth-child(2){
					margin: 0 25rpx;
				}
			}
			.day{
				width: 100%;
				text-align: right;
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	.pireNum{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding:0upx 20upx ;
		.pirBox{
			display: flex;
			padding: 20upx 0;
			border-bottom: 2upx solid #F4F4F4;
			justify-content: space-between;
			align-items: center;
			.pri1 text:nth-child(1){
				font-size:26upx;
				color: #333333;
				margin-right: 10upx;
			}
			.pri1 text:nth-child(2){
				font-size:30upx;
				color: #FA9C22;
			}
			.pri2{
				text-align: right;
				color: #999999;
				font-size: 20upx;
			}
		}
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>
