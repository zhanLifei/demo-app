<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/my')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>我的团队</text>
			</view>
		</view>
		<view class="top_back">
			<image src="../../static/img/myteamBack.png" mode=""></image>
		</view>
		<view class="top_info">
			<view class="top_info_it" >
				<view class="top_it_num">
					<text>{{teamData.total}}</text>
				</view>
				<view class="top_it_name">
					<text>团队人数</text>
				</view>
			</view>
			<view class="top_info_it" >
				<view class="top_it_num">
					<text>{{teamData.valid_member}}</text>
				</view>
				<view class="top_it_name">
					<text>大区实名</text>
				</view>
			</view>
			<view class="top_info_it" >
				<view class="top_it_num">
					<text>{{teamData.samll_active}}</text>
				</view>
				<view class="top_it_name">
					<text>小区实名</text>
				</view>
			</view>
			<view class="top_info_it" >
				<view class="top_it_num">
					<text>{{teamData.direct_user}}</text>
				</view>
				<view class="top_it_name">
					<text>直推人数</text>
				</view>
			</view>
			<view class="top_info_it" >
				<view class="top_it_num">
					<text>{{teamData.direct_active}}</text>
				</view>
				<view class="top_it_name">
					<text>直推成交</text>
				</view>
			</view>
			<view class="top_info_it" >
				<view class="top_it_num">
					<text>{{teamData.direct_real}}</text>
				</view>
				<view class="top_it_name">
					<text>直推实名</text>
				</view>
			</view>
			
		</view>

		<!-- <view class="midd_search">
			<view class="midd_inp">
				<input type="text" value="" placeholder="请输入手机号搜索" />
			</view>
			<view class="midd_icon">
				<image src="../../static/icon/search.png" mode=""></image>
			</view>
		</view> -->

		<scroll-view scroll-y="true" class="scroll_list" @scrolltolower="lower">
			<view>
				<view class="scroll_it" v-for="(it , i) in scrolllist2" :key="it.id">
					<view class="scroll_top">
						<view class="top_ima">
							<image :src="it.avatar" mode=""></image>
						</view>
						<view class="top_scroll_info">
							<view class="info_name_load">
								<text>{{it.nickname}}</text>
								<text>{{it.city}}</text>
							</view>
							<view class="info_phone">
								<text>{{it.account}}</text>
							</view>
						</view>
						<view class="info_time_am">
							<view class="info_time_auth" v-if="it.real == 1">
								<text>已认证</text>
							</view>
							<view class="info_time_auth1" v-if="it.real == 2">
								<text>未认证</text>
							</view>
							<view class="info_time_time">
								<text>{{it.add_time}}</text>
							</view>
						</view>

					</view>
					<view class="scroll_buttom">
						<view class="buttom_info" >
							<view class="buttom_num">
								<text>{{it.direct_user}}</text>
							</view>
							<view class="buttom_name">
								<text>直推人数</text>
							</view>
						</view>
						<view class="buttom_info" >
							<view class="buttom_num">
								<text>{{it.direct_real}}</text>
							</view>
							<view class="buttom_name">
								<text>直推实名</text>
							</view>
						</view>
						<view class="buttom_info" >
							<view class="buttom_num">
								<text>{{it.valid_member}}</text>
							</view>
							<view class="buttom_name">
								<text>大区活跃</text>
							</view>
						</view>
						<view class="buttom_info" >
							<view class="buttom_num">
								<text>{{it.samll_active}}</text>
							</view>
							<view class="buttom_name">
								<text>小区成交</text>
							</view>
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
		</scroll-view> 
	</view>
</template>

<script>
	import service from "../../service.js"
	export default {
		data() {
			return {
				page: 0,
				pages: 1,
				loadshow:true,
				teamData:'',
				team_count:'',//团队人数
				total_one:'',//有效直推人数
				big_activity:'',//大区活跃度
				small_activity:'',//小区活跃度
				is_idverifly:'',//直推实名
				total_one_buy:'',//直推成交
				top_infolis: [
					// {
					// 	id: 1,
					// 	num: 3232,
					// 	name: "团队人数"
					// },
					// {
					// 	id: 2,
					// 	num: 3232,
					// 	name: "大区活跃"
					// },
					// {
					// 	id: 3,
					// 	num: 3232,
					// 	name: "小区成交 "
					// },
					// {
					// 	id: 4,
					// 	num: 3232,
					// 	name: "直推人数"
					// },
					// {
					// 	id: 5,
					// 	num: 3232,
					// 	name: "直推成交"
					// },
					// {
					// 	id: 6,
					// 	num: 3232,
					// 	name: "直推实名"
					// }
				],
				scrolllist2: [
					// {
					// 	id: 1,
					// 	scr: '../../static/img/headerimg.png',
					// 	name: "牛哄哄",
					// 	address: "广州",
					// 	phone: "13322222221 (88888888)",
					// 	auth: "已认证",
					// 	time: "2020-03-20 20:40:49",
					// 	otharr: [{
					// 			id: 1,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 2,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 3,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 4,
					// 			num: 243,
					// 			name: "直推人数"
					// 		}
					// 	]

					// },
					// {
					// 	id: 2,
					// 	scr: "../../static/img/headerimg.png",
					// 	name: "牛哄哄",
					// 	address: "广州",
					// 	phone: "13322222221 (88888888)",
					// 	auth: "已认证",
					// 	time: "2020-03-20 20:40:49",
					// 	otharr: [{
					// 			id: 1,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 2,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 3,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 4,
					// 			num: 243,
					// 			name: "直推人数"
					// 		}
					// 	]

					// },
					// {
					// 	id: 3,
					// 	scr: "../../static/img/headerimg.png",
					// 	name: "牛哄哄",
					// 	address: "广州",
					// 	phone: "13322222221 (88888888)",
					// 	auth: "已认证",
					// 	time: "2020-03-20 20:40:49",
					// 	otharr: [{
					// 			id: 1,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 2,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 3,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 4,
					// 			num: 243,
					// 			name: "直推人数"
					// 		}
					// 	]

					// },
					// {
					// 	id: 4,
					// 	scr: "../../static/img/headerimg.png",
					// 	name: "牛哄哄",
					// 	address: "广州",
					// 	phone: "13322222221 (88888888)",
					// 	auth: "已认证",
					// 	time: "2020-03-20 20:40:49",
					// 	otharr: [{
					// 			id: 1,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 2,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 3,
					// 			num: 243,
					// 			name: "直推人数"
					// 		},
					// 		{
					// 			id: 4,
					// 			num: 243,
					// 			name: "直推人数"
					// 		}
					// 	]

					// }
				]
			}
		},
		methods:{
			jump(e){
				uni.switchTab({
					url:e
				});
			},
			Loadthepage() {
				var self = this;
				if(!self.loadshow){
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					service.auth(self, service.api.index.direct_user , "POST", {
						page: page,
						limit: 15
					}, function(self, res) {
						console.log(res)
						self.pages = res.data.page_total;
						self.page = page;
						var list = res.data.data;
						list.forEach((v, i) => {
							self.scrolllist2.push(v);
						});
						if (self.pages == self.page || self.scrolllist2 == '') {
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
			lower(){
				this.Loadthepage();
			}
		},
		onShow() {
			this.Loadthepage();
			/*---我的团队详情---*/
			service.auth(this , service.api.index.my_team , 'POST' , '' , function(self , res){
				console.log(res,"11111");
				self.teamData = res.data;
			});
			/*---我的团队详情---*/
			
			service.auth(this , service.api.index.direct_user , 'POST' , '' , function(self , res){
				console.log(res,"22222");
				
			});
			
		}
	}
</script>

<style>
	/* .header {
		background-color: #2575FE;
	} */

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

	.top_back {
		position: fixed;
		width: 100%;
		height: 288upx;
		top: 0;
		left: 0;
		/* z-index: -1; */
		/* background: url(../../static/img/myteamBack.png) no-repeat;
		background-size: 100% 288upx;
		background-position: left top; */
	}

	.top_info {
		background: url(../../static/img/myteamback2.png) no-repeat;
		/* background-size: 100% 305upx; */
		background-size: cover;
		background-position: left bottom;
		display: flex;
		flex-wrap: wrap;
		width: 95%;
		margin: 0 auto;
		border-radius: 5upx;
		padding: 54upx 0upx;
		box-sizing: border-box;
		position: relative;
	}

	.top_info_it {
		width: 33.3%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

	}

	.top_it_num {
		color: #333333;
		font-size: 36upx;
	}

	.top_it_name {
		color: #999999;
		font-size: 24upx;
	}

	.top_info_it:nth-of-type(1) {
		margin-bottom: 60upx;
	}

	.top_info_it:nth-of-type(2) {
		margin-bottom: 60upx;
	}

	.top_info_it:nth-of-type(3) {
		margin-bottom: 60upx;
	}

	.midd_search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		margin: 20upx auto 0;
		background-color: #FFFFFF;
		border-radius: 5upx;
		box-sizing: border-box;
		padding: 20upx 20upx;
	}

	.midd_inp {
		width: 98%;
	}

	.midd_inp input {
		color: #999999;
		font-size: 28upx;
		width: 98%;
	}

	.midd_icon {

		width: 58upx;
		height: 58upx;
	}

	.scroll_list {
		width: 100%;
		height: 71%;
		background-color: transparent;
		margin-top: 20upx;
	}

	.scroll_it {
		background-color: #FFFFFF;
		padding: 0 20upx;
		margin-bottom: 20upx;
		box-sizing: border-box;
	}

	.scroll_top {
		display: flex;
		/* padding: 20upx 36upx; */
		align-items: center;
		box-sizing: border-box;
		margin: 0 36upx;
		padding: 20upx 0;
		border-bottom: 2upx solid #F4F4F4;
	}

	.top_ima {
		width: 88upx;
		height: 88upx;
		border-radius: 44upx;
		margin-right: 10upx;
	}

	.top_scroll_info {
		width: 50%;

	}

	.info_name_load text:nth-of-type(1) {
		font-size: 28upx;
		color: #333333;
		font-weight: bold;
	}

	.info_name_load text:nth-of-type(2) {
		font-size: 20upx;
		color: #8B8B8B;
		background-color: #F0F0F0;
		padding: 5upx 16upx;
		margin-left: 5upx;
		border-radius: 24upx;
	}

	.info_phone text {
		color: #2189FF;
		font-size: 24upx;
	}

	.info_time_auth text {
		color: #FFFFFF;
		font-size: 24upx;
		background-color: #F89926;
		padding: 5upx 26upx;
		border-radius: 20upx;
	}
    .info_time_auth1 text{
		color: #FFFFFF;
		font-size: 24upx;
		background-color: #999999;
		padding: 5upx 26upx;
		border-radius: 20upx;
	}
	.info_time_time text {
		color: #999999;
		font-size: 20upx;
	}

	.buttom_num text {
		color: #333333;
		font: 30upx;
		font-weight: bold;
	}

	.buttom_name text {
		color: #999999;
		font-size: 20upx;
	}

	.info_time_am {
		width: 40%;
		display: flex;
		flex-direction: column;

		align-items: flex-end;
	}

	.scroll_buttom {
		display: flex;
		padding: 20upx 0;
	}

	.buttom_info {
		width: 25%;
		/* flex-direction: column;
		justify-content: center;
		align-items: center; */
		text-align: center;
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
	}
</style>
