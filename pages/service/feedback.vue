<template>
	<view class="content">
		<header-nav :subtitle='up' :Htitle='title' :Hlicon='icon'  :url_ri="url_ri"></header-nav>
		<view class="tabs">
			<view :class="['tab',current==index?'act':'']" v-for="(item,index) in tab" :key='index' @click="tabs(index)">
				{{item.name}}
			</view>
		</view>
		<view class="list">
			<view class="items" v-for="(it , i) in sercontlist" :key="i">
				<view class="item_title">
					{{it.content}}
				</view>
				<view class="img_box">
					<image :src="it.screenshot" mode=""></image>
					<!-- <image src="../../static/img/viedo.png" mode=""></image>
					<image src="../../static/img/viedo.png" mode=""></image> -->
				</view>
			<view class="day">
				{{it.createtime}}
			</view>
			</view>
		</view>
		<view class="loadclass" v-if="loadshow">
			<text>正在加载</text>
		</view>
		<view class="loadclass" v-else>
			<text>数据已加载完毕</text>
		</view>
	</view>
</template>

<script>
	import headerNav from '@/components/header_nav.vue'
	export default {
		data() {
			return {
				title: '反馈客服',
				up: '问题反馈',
				url_ri:'/pages/center/question',
				icon: '../../static/icon/left_whitch.png',
				page: 0,
				pages: 1,
				loadshow: true,
				sercontlist:[],
				current: 0,
				typess:1,
				tab: [{
					name: '处理中'
				}, {
					name: '已处理'
				}],
			}
		},
		methods: {
			tabs(index) {
				this.current = index
				let type = index + 1;
				this.typess = type;
				this.page = 0,
				this.pages = 1,
				this.loadshow = true,
				this.sercontlist = [],
				this.Loadthepage(type);
			},
			Loadthepage(e) {
				var self = this;
				if (!self.loadshow) {
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					self.$service.auth(self, self.$service.api.service.workorderList, "GET", {
						page: page,
						limit: 15,
						type: e
					}, function(self, res) {
						console.log(res)
						self.pages = res.data.list.last_page;
						self.page = page;
						// self.activity = res.data.activity
						var list = res.data.list.data;
						list.forEach((v, i) => {
							self.sercontlist.push(v);
						});
						if (self.pages == self.page || self.sercontlist.length == 0) {
							console.log("false");
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
		onReachBottom() {
			let type = this.typess
			this.Loadthepage(type);
		},
		onShow() {
			/* this.$service.auth(this , this.$service.api.service.workorderList , "GET" , {limit:15 , page:1 , type:1} , function(self , res){
				console.log(res.data.list.data);
			}) */
			this.Loadthepage(1);
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: auto;
	}
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
		padding: 0rpx 20rpx;

		.items {
			margin-top: 30rpx;
			width: 100%;
			background-color: #fff;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 30rpx 12rpx 16rpx;
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
					width: 217rpx;
					height: 160rpx;
				}
				image:nth-child(2){
					margin: 0 15rpx;
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
	.loadclass {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>
