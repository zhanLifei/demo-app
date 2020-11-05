<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>车服务</text>
			</view>
		</view>

		<view class="navs">
			<view class="navs_left">
				<view class="navs_left_title">
					<view class="navs_left_name">
						<text>全部店铺类型</text>
					</view>
					<view class="navs_left_img" @click="serviceshow">
						<image :src="sershow?'/static/icon/big_sort_buttom.png':'/static/icon/big_sort_up.png'" mode=""></image>
					</view>
				</view>
				<view class="service_list" v-show="sershow">
					<view :class="['service_list_it',{'service_active':serviceid == it.id}]" v-for="(it , i) in service_list" :key="it.id"
					 @click="selservice(it.id)">
						<text>{{it.name}}</text>
					</view>
				</view>
			</view>
			<view class="navs_list_right">
				<view class="navs_it" v-for="(it , i ) in navslis" :key="it.id">
					<view class="navs_it_title">
						<text>{{it.title}}</text>
					</view>
					<view class="navs_it_sort" @click="sort0(i)" v-if="it.lookway === 0">
						<image :src="it.sortimg" mode="widthFix"></image>
					</view>
					<view class="navs_it_sort" @click="sort1(i)" v-else-if="it.lookway === 1">
						<image :src="it.sortimgup" mode="widthFix"></image>
					</view>
					<view class="navs_it_sort" @click="sort2(i)" v-else-if="it.lookway === 2">
						<image :src="it.sortimgbtm" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>

		<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
			<view class="ser_box">
				<view class="ser_cont_it" v-for="(it , i) in sercontlist" :key = "it.id">
					<view class="ser_cont_top">
						<view class="ser_cont_img">
							<image src="/static/img/serimg.png" mode="widthFix"></image>
						</view>
						<view class="ser_cont_text">
							<view class="ser_text_title">
								<text>{{it.title}}</text>
							</view>
							<view class="ser_text_phaddress">
								<view class="ser_phadd_icon">
									<image src="/static/icon/servicephone.png" mode="widthFix"></image>
								</view>
								<text>{{it.phone}}</text>
							</view>
							<view class="ser_text_phaddress">
								<view class="ser_phadd_icon">
									<image src="/static/icon/serviceaddress.png" mode="widthFix"></image>
								</view>
								<text>{{it.address}}</text>
							</view>
						</view>
						<view class="ser_cont_right">
							<text>{{it.distance}}</text>
						</view>
					</view>
					<view class="ser_bottom_btn">
						<view :class="'ser_btn_it' +  (i2+ 1)" v-for="(it2 , i2) in it.btn" :key = "it2.id2">
							<text>{{it2.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				lookway: 0, //升序OR降序的查看方式
				navslis: [
					// {
					// 	id:1,
					// 	title:"全部店铺类型",
					// 	sortimg:""
					// },
					{
						id: 1,
						title: "好评率",
						sortimg: "/static/icon/sort_wiath.png",
						lookway: 0

					},
					{
						id: 2,
						title: "距离",
						sortimg: "/static/icon/sort_wiath.png",
						lookway: 0
					}
				],
				service_list: [{
						id: 1,
						name: "洗车服务"
					},
					{
						id: 2,
						name: "年审服务"
					},
					{
						id: 3,
						name: "学车服务"
					},
					{
						id: 4,
						name: "加油服务"
					},
				],
				sercontlist: [{
						id: 1,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店拉法基",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					},
					{
						id: 2,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					},
					{
						id: 3,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					},
					{
						id: 4,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					},
					{
						id: 5,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					},
					{
						id: 6,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					},
					{
						id: 7,
						img: "/static/img/serimg.png",
						title: "广州市牛哄哄修车旗舰店",
						phone: "202_888888888",
						address: "广州市天河区中山大道中66号某某路左侧对面",
						distance: "1.1km",
						btn: [{
							id2:1,
							name: "导航"
						},
						{
							id2:2,
							name:"预约"
						}
						]

					}
				],
				serviceid: 1, //店铺服务类型对应的服务类型id
				sershow: false //控制店铺服务列表的展开
			}
		},
		methods: {
			sort0(i) {
				// this.lookway = 1;
				this.$set(this.navslis[i], "lookway", 1);
				this.$set(this.navslis[i], "sortimgup", "/static/icon/sort_up.png");
			},
			sort1(i) {
				// this.lookway = 2;
				this.$set(this.navslis[i], "lookway", 2);
				this.$set(this.navslis[i], "sortimgbtm", "/static/icon/sort_buttom.png");
			},
			sort2(i) {
				// this.lookway = 1;
				this.$set(this.navslis[i], "lookway", 1);
				this.$set(this.navslis[i], "sortimgup", "/static/icon/sort_up.png");
			},
			selservice(e) { //选择店铺服务类型
				var self = this
				self.serviceid = e
				setTimeout(() => { //对隐藏缓冲一下  不会很突兀
					self.sershow = !self.sershow //取反
				}, 300);

			},
			serviceshow() { //显示店铺服务列表
				this.sershow = !this.sershow //取反
			}

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

	.navs {
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		padding: 20upx 0;
		background-color: #FFFFFF;
	}

	.navs_left {
		position: relative;
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navs_left_title {
		display: flex;
		color: #333333;
		font-size: 26upx;
		justify-content: center;
		align-items: center;
	}

	.navs_left_name {
		padding: 20upx 0;
	}

	.navs_left_img {
		width: 30upx;
		height: 30upx;
		/* text-align: center; */
		/* vertical-align: middle; */
		margin-top: 4upx;
	}

	.navs_list_right {
		width: 60%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #999999;
		font-size: 26upx;
	}

	.navs_it {
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.navs_it_title {
		padding: 20upx 0;
	}

	.navs_it_sort {
		width: 46upx;
		height: 46upx;
	}

	.service_list {
		color: #999999;
		font-size: 24upx;
		background-color: #FFFFFF;
		position: absolute;
		left: 22upx;
		top: 78upx;
		z-index: 1;
	}

	.service_list_it {
		padding: 20upx 66upx;
		border-bottom: 2upx solid #F4F4F4;
	}

	.service_active {
		border-left: #2189FF 4upx solid;
		box-sizing: border-box;
	}
	.scroll_list{
		margin-top: 20upx;
		width: 100%;
		height: 90%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.ser_cont_it{
		background-color: #FFFFFF;
		padding: 20upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
	}
	.ser_cont_top{
		display: flex;
		align-items: center;
	}
	.ser_cont_img{
		width: 20%;
		width: 172upx;
		height: 152upx;
		padding: 0 20upx;
		
	}
	.ser_phadd_icon{
		width: 20upx;
		height: 20upx;
		margin-right: 10upx;
	}
	.ser_text_title{
		color: #333333;
		font-size: 28upx;
		margin: 30upx 0 10upx;
	}
	.ser_text_phaddress{
		display: flex;
		padding-bottom: 10upx;
		/* align-items: center; */
		/* flex-wrap: wrap; */
	}
	.ser_cont_text{
		width: 65%;
		margin: 0 20upx;
		color: #999999;
		font-size: 22upx;
	}
	.ser_cont_right{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20upx;
		width: 15%;
		color: #666666;
		font-size: 24upx;
	}
	.ser_bottom_btn{
		font-size: 28upx;
		display: flex;
		justify-content: flex-end;
		padding: 40upx 10upx;
	}
	.ser_btn_it1{
		background-color: #E8F3FF;
		color: #2189FF;
		padding: 20upx 60upx;
		border-radius: 40upx;
		margin-right: 20upx;
	}
	.ser_btn_it2{
		background-color: #2189FF;
		color: #FFFFFF;
		padding: 20upx 60upx;
		border-radius: 40upx;
	}
	::-webkit-scrollbar {
		//隐藏scroll-view的滚动条
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
