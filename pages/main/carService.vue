<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<!-- <image src="../../static/icon/left_whitch.png" mode=""></image> -->

			</view>
			<view class="center_title">
				<text>车服务</text>
			</view>
		</view>

		<view class="navs">
			<view class="navs_left">
				<view class="navs_left_title" @click="serviceshow">
					<view class="navs_left_name">
						<text>{{titless}}</text>
					</view>
					<view class="navs_left_img">
						<image :src="sershow?'/static/icon/big_sort_buttom.png':'/static/icon/big_sort_up.png'" mode=""></image>
					</view>
				</view>
				<view class="service_list" v-show="sershow">
					<view :class="['service_list_it',{'service_active':serviceid == 0}]" @click="selservice(0 , '全部类型')">
						<text>全部类型</text>
					</view>
					<view :class="['service_list_it',{'service_active':serviceid == it.id}]" v-for="(it , i) in service_list" :key="it.id"
					 @click="selservice(it.id , it.catname)">
						<text>{{it.catname}}</text>
					</view>
				</view>
			</view>
			<view class="navs_list_right">
				<view class="navs_it" v-for="(it , i ) in navslis" :key="it.id">
					<view class="navs_it_title">
						<text>{{it.title}}</text>
					</view>
					<view class="navs_it_sort" @click="sort0(i , it.id)" v-if="it.lookway === 0">
						<image :src="it.sortimg" mode="widthFix"></image>
					</view>
					<view class="navs_it_sort" @click="sort1(i , it.id)" v-else-if="it.lookway === 1">
						<image :src="it.sortimgup" mode="widthFix"></image>
					</view>
					<view class="navs_it_sort" @click="sort2(i , it.id)" v-else-if="it.lookway === 2">
						<image :src="it.sortimgbtm" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>

		<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
			<view class="ser_box">
				<view class="ser_cont_it" v-for="(it , i) in sercontlist" :key="i">
					<view class="ser_cont_top">
						<view class="ser_cont_img">
							<image :src="it.merch_showimg" mode="widthFix"></image>
						</view>
						<view class="ser_cont_text">
							<view class="ser_text_title">
								<text>{{it.merchname}}</text>
							</view>
							<view class="ser_text_phaddress">
								<view class="ser_phadd_icon">
									<image src="/static/icon/servicephone.png" mode="widthFix"></image>
								</view>
								<text>{{it.merch_mobile}}</text>
							</view>
							<view class="ser_text_phaddress">
								<view class="ser_phadd_icon">
									<image src="/static/icon/serviceaddress.png" mode="widthFix"></image>
								</view>
								<text>{{it.merch_address}}</text>
							</view>
						</view>
						<view class="ser_cont_right">
							<text>{{it.distant_desc}}</text>
						</view>
					</view>
					<view class="ser_bottom_btn">
						<view class="ser_btn_it1" @click="navigation(it.lat , it.lng)">
							<text>导航</text>
						</view>
						<view class="ser_btn_it2 " @click="jump('/pages/index/storeinfo?id='+it.id+'&lat='+it.lat+'&lng='+it.lng)">
							<text>预约</text>
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
	export default {
		data() {
			return {
				lookway: 0, //升序OR降序的查看方式
				titless: '全部类型',
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
				service_list: uni.getStorageSync('category'),
				/* [
					{
						id: 0,
						name: "全部类型"
					},
					{
						id: 1,
						name: "洗车服务"
					},
					{
						id: 3,
						name: "年审服务"
					},
					{
						id: 4,
						name: "学车服务"
					},
					{
						id: 5,
						name: "加油服务"
					},
					{
						id: 2,
						name: "修车服务"
					},
				] */
				sercontlist: [
					// {
					// 	id: 1,
					// 	img: "/static/img/serimg.png",
					// 	title: "广州市牛哄哄修车旗舰店拉法基",
					// 	phone: "202_888888888",
					// 	address: "广州市天河区中山大道中66号某某路左侧对面",
					// 	distance: "1.1km",
					// 	btn: [{
					// 		id2:1,
					// 		name: "导航"
					// 	},
					// 	{
					// 		id2:2,
					// 		name:"预约"
					// 	}
					// 	]

					// },

				],
				serviceid: '', //店铺服务类型对应的服务类型id
				sershow: false, //控制店铺服务列表的展开
				page: 1,
				pages: 2,
				loadshow: true,
				longitude: uni.getStorageSync('longitude'), //经度
				latitude: uni.getStorageSync('latitude'), //纬度
				storeType: '', //
				CarWash: '',
				CarWashId: '',
				rateDisNum: 0,
				ratess: '',
				distss: ''
			}
		},
		methods: {
			jump(e) {
				uni.navigateTo({
					url: e
				});
			},

			sort0(i, id) {
				// this.lookway = 1;
				this.rateDisNum = this.rateDisNum + 1; //如果好评率和距离都选择了rateDisNum会等于2
				this.$set(this.navslis[i], "lookway", 1);
				this.$set(this.navslis[i], "sortimgup", "/static/icon/sort_up.png");
				if (id == 1 && this.rateDisNum == 1) {
					this.ratess = 1;
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				} else if (id == 2 && this.rateDisNum == 1) {
					this.distss = 1
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				} else if (this.rateDisNum == 2) {
					this.ratess = 1;
					this.distss = 1
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				}


				console.log("0", i, id, this.rateDisNum);
			},
			sort1(i, id) {
				// this.lookway = 2;
				this.$set(this.navslis[i], "lookway", 2);
				this.$set(this.navslis[i], "sortimgbtm", "/static/icon/sort_buttom.png");
				if (id == 1 && this.rateDisNum == 1) {
					this.ratess = 2;
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				} else if (id == 2 && this.rateDisNum == 1) {
					this.distss = 2
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				} else if (this.rateDisNum == 2) {
					if (id == 1) {
						this.ratess = 2;
						this.page = 0;
						this.pages = 1;
						this.loadshow = true;
						this.sercontlist = [];
						this.Loadthepagerrdd();
					} else if (id == 2) {
						this.distss = 2;
						this.page = 0;
						this.pages = 1;
						this.loadshow = true;
						this.sercontlist = [];
						this.Loadthepagerrdd();
					}
				}


				console.log("1", i, id);
			},
			sort2(i, id) {
				// this.lookway = 1;
				this.$set(this.navslis[i], "lookway", 1);
				this.$set(this.navslis[i], "sortimgup", "/static/icon/sort_up.png");
				if (id == 1 && this.rateDisNum == 1) {
					this.ratess = 2;
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				} else if (id == 2 && this.rateDisNum == 1) {
					this.distss = 2
					this.page = 0;
					this.pages = 1;
					this.loadshow = true;
					this.sercontlist = [];
					this.Loadthepagerrdd();
				} else if (this.rateDisNum == 2) {
					if (id == 1) {
						this.ratess = 2;
						this.page = 0;
						this.pages = 1;
						this.loadshow = true;
						this.sercontlist = [];
						this.Loadthepagerrdd();
					} else if (id == 2) {
						this.distss = 2;
						this.page = 0;
						this.pages = 1;
						this.loadshow = true;
						this.sercontlist = [];
						this.Loadthepagerrdd();
					}
				}


				console.log("2", i, id);
			},
			selservice(e, name) { //选择店铺服务类型
				var self = this;
				self.serviceid = e;
				self.titless = name;
				// self.storeType = e;
				self.sershow = !self.sershow //取反
				self.page = 0;
				self.pages = 1;
				self.loadshow = true;
				self.sercontlist = [];
				self.CarWashId = e;
				// setTimeout(() => { //对隐藏缓冲一下  不会很突兀
				self.Loadthepage(e);
				// }, 300);
				/*---清除洗车服务的缓存数据---*/
				uni.removeStorageSync('wasCarServ');
				/*---清除洗车服务的缓存数据---*/
			},
			serviceshow() { //显示店铺服务列表
				this.sershow = !this.sershow //取反
			},


			Loadthepage(e) {
				var self = this;
				if (!self.loadshow) {
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					self.$service.auth(self, self.$service.api.main.merch_list, "POST", {
						page: page,
						limit: 15,
						id: '',
						type: e,
						lat: self.longitude,
						lng: self.latitude,
						rate: 1,
						distance: 1
					}, function(self, res) {
						console.log(res)
						self.pages = res.data.page_total;
						self.page = page;
						// self.activity = res.data.activity
						var list = res.data.data;
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

			Loadthepagerrdd() {
				var self = this;
				if (!self.loadshow) {
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					self.$service.auth(self, self.$service.api.main.merch_list, "POST", {
						page: page,
						limit: 15,
						id: '',
						type: self.serviceid,
						lat: self.longitude,
						lng: self.latitude,
						rate: self.ratess,
						distance: self.distss
					}, function(self, res) {
						console.log(res)
						self.pages = res.data.page_total;
						self.page = page;
						// self.activity = res.data.activity
						var list = res.data.data;
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

			lower() {
				let e = this.CarWashId;
				this.Loadthepage(e);
				console.log('lower');
			},


			navigation(eee, iii) { //导航
				// uni.getLocation({
				//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				//     success: function (res) {
				//         const latitude = res.latitude;
				//         const longitude = res.longitude;
				// if(eee%1 == 0){
				// var ee = parseFloat(eee);
				// 	var lonnn = ee + 0.0000011;
				// var lon = parseFloat(lonnn);
				// console.log(typeof lon,lon,lonnn)
				// }else{
				// var lon = parseFloat(eee);
				// }
				// if(iii%1 == 0){
				//  var ii = parseInt(iii);
				// 	var latt = ii + 0.0000011;
				// var lat = parseFloat(latt);
				// }else{
				// var lat = parseFloat(iii);
				// }

				// console.log(lat , iii , lon , eee , "123");
				uni.openLocation({
					latitude: parseFloat(iii),
					longitude: parseFloat(eee),
					success: function() {
						console.log('success');
					}
				});
				//     }
				// });
			}


		},
		onLoad(op) {
			//#ifdef H5
			var self = this;
			uni.chooseLocation({
				success: function(res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					self.longitude = res.longitude;
					self.latitude = res.latitude;
					self.$service.auth(self, self.$service.api.main.merch_list, 'POST', {
						page: 1,
						limit: 15,
						id: '',
						type: '',
						lat: self.longitude,
						lng: self.latitude,
						rate: 1,
						distance: 1
					}, function(self, res) {
						console.log(res);
						self.sercontlist = res.data.data;
						if (self.sercontlist.length == 0) {
							self.loadshow = false
						}
					});
				},
				fail(res) {
					console.log(res, "fail");
				},
				complete() {
					console.log("res")
				}
			});
			//#endif
			
			//#ifdef APP-PLUS
			this.$service.auth(this, this.$service.api.main.merch_list, 'POST', {
				page: 1,
				limit: 15,
				id: '',
				type: '',
				lat: this.longitude,
				lng: this.latitude,
				rate: 2,
				distance: 2
			}, function(self, res) {
				console.log(res);
				self.sercontlist = res.data.data;
				if (self.sercontlist.length == 0) {
					self.loadshow = false
				}
				console.log("2111111111111111111111111111111")
			});
			//#endif
			
			
			
		/* 	if (uni.getStorageSync('wasCarServ').type == undefined) {

			} else {
				
				this.titless = uni.getStorageSync('wasCarServ').name;
				//可以考虑监听属性
				//#ifdef APP-PLUS
				this.$service.auth(this, this.$service.api.main.merch_list, 'POST', {
					page: 1,
					limit: 15,
					id: '',
					type: uni.getStorageSync('wasCarServ').type,
					lat: this.longitude,
					lng: this.latitude,
					rate: 2,
					distance: 2
				}, function(self, res) {
					console.log(res);
					self.sercontlist = res.data.data;
					if (self.sercontlist.length == 0) {
						self.loadshow = false
					}
					console.log("2111111111111111111111111111111")
				});
				//#endif



				//#ifdef H5
				var self = this;
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						self.longitude = res.longitude;
						self.latitude = res.latitude;
						self.$service.auth(self, self.$service.api.main.merch_list, 'POST', {
							page: 1,
							limit: 15,
							id: '',
							type: uni.getStorageSync('wasCarServ').type,
							lat: self.longitude,
							lng: self.latitude,
							rate: 1,
							distance: 1
						}, function(self, res) {
							console.log(res);
							self.sercontlist = res.data.data;
							if (self.sercontlist.length == 0) {
								self.loadshow = false
							}
						});
					},
					fail(res) {
						console.log(res, "fail");
					},
					complete() {
						console.log("res")
					}
				});
				//#endif
			} */





		},
		onShow() {
			console.log('1232')
			


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

	.scroll_list {
		margin-top: 20upx;
		width: 100%;
		height: 88%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.ser_cont_it {
		background-color: #FFFFFF;
		padding: 20upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
	}

	.ser_cont_top {
		display: flex;
		align-items: center;
	}

	.ser_cont_img {
		width: 20%;
		width: 172upx;
		height: 152upx;
		padding: 0 20upx;

	}

	.ser_phadd_icon {
		width: 20upx;
		height: 20upx;
		margin-right: 10upx;
	}

	.ser_text_title {
		color: #333333;
		font-size: 28upx;
		margin: 30upx 0 10upx;
	}

	.ser_text_phaddress {
		display: flex;
		padding-bottom: 10upx;
		/* align-items: center; */
		/* flex-wrap: wrap; */
	}

	.ser_cont_text {
		width: 65%;
		margin: 0 20upx;
		color: #999999;
		font-size: 22upx;
	}

	.ser_cont_right {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20upx;
		width: 15%;
		color: #666666;
		font-size: 24upx;
	}

	.ser_bottom_btn {
		font-size: 28upx;
		display: flex;
		justify-content: flex-end;
		padding: 40upx 10upx;
	}

	.ser_btn_it1 {
		background-color: #E8F3FF;
		color: #2189FF;
		padding: 20upx 60upx;
		border-radius: 40upx;
		margin-right: 20upx;
	}

	.ser_btn_it2 {
		background-color: #2189FF;
		color: #FFFFFF;
		padding: 20upx 60upx;
		border-radius: 40upx;
	}

	.loadclass {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
		box-sizing: border-box;
	}

	::-webkit-scrollbar {
		//隐藏scroll-view的滚动条
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
