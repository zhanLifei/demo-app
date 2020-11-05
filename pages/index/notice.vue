<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jum('/pages/main/index')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>公告</text>
			</view>
		</view>

		<view class="notice_list">
			<view class="notice_item" v-for="(item , i) in notice_list" :key="i" @click="jump('/pages/index/noticeDeail?id='+item.id , item)">
				<view class="notice_item_cont">
					<text style="font-size: 30upx; color: #333333;">{{item.title}}</text>
				</view>
				<view class="notice_item_time">
					<text style="font-size: 20upx; color: #999999;">{{item.createtime}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				Page: '',
				notice_list: [
					/* {
						conts:"公告",
						time:"2020-3-25",
						id:1
					}, */
				]
			}
		},
		methods: {
			jump(url, item) {
				var crateTime = item.createtime;
				console.log(crateTime);
				var time = crateTime.substr(0, 11); //字符串方法
				var times = time.split('-'); //字符串方法
				var time = times.join('/'); //数组方法
				uni.setStorageSync('noticeTime', time);
				uni.setStorageSync('noticeConten', item.content);
				// uni.setStorageSync('noticeDeail',item);
				uni.navigateTo({
					url
				});
			},
			jum(url) {
				if (this.Page == 1) {
					uni.switchTab({
						url:'/pages/main/my'
					});
				}else{
					uni.switchTab({
						url
					});
				}

			}
		},
		onShow() {
			this.$service.auth(this, this.$service.api.home.inform, "GET", '', function(self, res) {
				console.log(res.data, 'inform');
				self.notice_list = res.data;
			});
		},
		onLoad(e) {
			this.Page = e.page;
		}

	}
</script>

<style>
	.header {
		background-color: #2575FE;
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

	page {
		background-color: #EFF3F6;
	}

	.content {
		padding-right: 24upx;
		padding-left: 24upx;
	}

	.notice_list {
		/* background-color: #FFFFFF; */

	}

	.notice_list .notice_item:nth-child(1) {
		margin-top: 54upx;
	}

	.notice_item {
		background-color: #FFFFFF;
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
		padding: 30upx 40upx;
		margin-top: 34upx;
		border-radius: 10upx;

	}
	.notice_item_cont{
		/* width: 60%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden; */
	}
</style>
