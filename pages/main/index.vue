<template>
	<view class="content">
		<view class="swiper">
			<view class="header">
				<view class="left_">
					<image src="../../static/icon/indexlogo.png" mode=""></image>
					<!-- <text>首页</text> -->
				</view>
				<view class="center_title">
					<text></text>
				</view>
				<view class="right_" @click="scanCode">
					<image src="../../static/index/scanCode.png"></image>
				</view>
			</view>
			<swiper class="swiperss" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item , index) in swipers" :key="index">
					<view class="swiper-item">
						<image @click="tiaoz(item.url)" :src="item.img" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="platformInfo">
			<view class="platInfo_title">
				<image src="../../static/index/PlatformAnnouncement.png" mode=""></image>
			</view>
			<view class="platInfo_cont">
				<view class="marquee">
					<text @click="lookDeail">{{consss}}</text>
				</view>
				<!-- <textscroll @lookDeail="lookDeail" :list="informList"/> -->
			</view>
			<view class="platInfo_much" @click="jump('/pages/index/notice')">
				<text>更多</text>
			</view>
		</view>

		<view class="navs">
			<view class="navs_itemss navs_item navs_itemss1" @click="jump('/pages/index/masters')">
				<view class="navs_img">
					<image src="../../static/index/home.png" mode=""></image>
				</view>
				<view class="navs_text">
					<text>当家做主</text>
				</view>
			</view>
		<!-- 	<view class="navs_itemss navs_item navs_itemss1" @click="jump('/pages/index/masters')">
				<view class="navs_img">
					<image src="../../static/index/home.png" mode=""></image>
				</view>
				<view class="navs_text">
					<text>我要洗车</text>
				</view>
			</view> -->
			<view class="navs_itemss navs_item navs_itemss2" @click="jump('/pages/index/beguide')">
				<view class="navs_img">
					<image src="../../static/index/newP.png" mode=""></image>
				</view>
				<view class="navs_text">
					<text>新手指南</text>
				</view>
			</view>
			<view class="navs_itemss navs_item navs_itemss3" @click="jump('/pages/index/myteam')">
				<!--  -->
				<view class="navs_img">
					<image src="../../static/index/myTeam.png" mode=""></image>
				</view>
				<view class="navs_text">
					<text>我的团队</text>
				</view>
			</view>
			<view class="navs_itemss navs_item navs_itemss4" @click="jump('/pages/center/invitefrient')">
				<view class="navs_img">
					<image src="../../static/index/inviteFriend.png" mode=""></image>
				</view>
				<view class="navs_text">
					<text>邀请好友</text>
				</view>
			</view>
		</view>

		<view class="platformInfo">
			<view class="platInfo_title">
				<image src="../../static/index/CharityAmbassador.png" mode=""></image>
			</view>
			<view class="platInfo_cont3">
				<!-- <text>热烈祝贺平台正式上线，id="floorTop"新用户可获...:style=""</text> -->
				<textscroll :list="heroList" />
			</view>
		</view>

		<view class="reading-box">
			<view class="more" @click="more('/pages/mycar/more')">
				<view>查看更多</view>
				<view class="more-img"><image src="../../static/reg/more.png" mode=""></image></view>
			</view>
			<view class="text-one" @click="carDetails('/pages/mycar/car-details?id='+item.id)" v-for="(item,index) in dataList" :key="index">  <!-- '/pages/mycar/car-details?id='+item.id -->
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
		<!-- <view class="loadclass" v-if="loadshow"><text>数据已加载完毕</text></view> -->
	</view>
</template>

<script>
	// import header from "../../components/header_nav.vue";
	import service from "../../service.js";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{
		uniLoadMore,
		},
		data() {
			return {
				dataList:[],
				title:'',
				detail:'',
				str:false,
				informList: [],
				heroList: [],
				wtiing: "", //已产出车贝
				wti: "", // 用户车贝
				consss: "",
				activity: "", // 马力
				glory: "", // 荣耀值
				integral: "", // 积分
				dailyCheckinweb: '', //签到成功要跳转的网页
				swipers: [{
					src: '../../static/index/banner.png'
				}],
				navs_img: [{
					id: 1,
					src: "../../static/index/home.png",
					name: "当家做主"
				}],
				floor_cont_list: [{
					num: '1.02',
					name: "车贝",
					id: 1
				}],
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
		
		methods: {
			Loadthepage() {
				
				var self = this;
				if (!self.loadshow) {
					return;
				}
				if (self.page <= self.pages) {
					var page = self.page + 1;
					console.log(this);
					this.$service.auth(
						this,
						this.$service.api.index.cargetArticle,
						'GET',
						{	
							// id:
							page: page,
							limit: 15,
						},
						function(self, res) {
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
			//点击跳转到更多汽车资讯
			more(url){
				uni.navigateTo({
					url: url
				});
			},
			// 点击跳转到汽车资讯的文章
			carDetails(url){
				uni.navigateTo({
					url: url
				});
			},
			good(){
				this.str = false
			},
			xxxxx() {
				uni.showToast({
					title: "功能开发中",
					icon: 'none'
				})
			},
			jump(url) {
				uni.navigateTo({
					url: url
				});
			},
			jum(url, e) {
				if (e == 1) {
					var wasCarServ = {
						type: e,
						name: "洗车服务"
					};
					uni.setStorageSync('wasCarServ', {
						type: e,
						name: "洗车服务"
					});
				}
				uni.switchTab({
					url
				});
			},
			tiaoz(e) {
				uni.setStorageSync('webUrl', e);
				uni.navigateTo({
					url: '/pages/index/webview'
				});
			},
			scanCode() {
				uni.scanCode({
					success: function(res) {

						var arr = res.result.split('-');
						uni.setStorageSync('item', arr)
						uni.navigateTo({
							url: '/pages/main/scan'
						})
						/* console.log('条码内容：' + res.result); */
					}
				});
			},
			// 我要加油
			myGasoline(){ 
				var url ='https://hxtx.96zb.com/gash5/gaslist.html?parentId=0277a9657124478da48ce6095715ab41&mobile=' + uni.getStorageSync('member').account
				uni.setStorageSync('webUrl', url);
				uni.navigateTo({
					url: '/pages/index/webview'
				});
			},
			jumpJd(){
				var self = this;
				uni.request({
					url: service.api.record.jdList,
					method:"GET",
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						if (res.code == 1) {
							uni.showToast({
								title: res.info,
								icon: 'none'
							});
							var dailyCheckinweb = res.data;
							console.log(dailyCheckinweb)
							if (dailyCheckinweb == undefined || dailyCheckinweb == '') {
				
								console.log("no")
							} else {
								uni.setStorageSync('webUrl', dailyCheckinweb);
								// setTimeout(() => {
									uni.navigateTo({
										url: "/pages/index/webview"
									});
									// window.location.href = dailyCheckinweb;
								// }, 1500)
							}
						} else {
							uni.showToast({
								title: res.info,
								icon: 'none'
							});
						}
						// console.log(res);
					}
				})
			},
			dailyCheckin() {
				var self = this;
				uni.request({
					url: service.api.main.dailyCheckin,
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						var res = res.data;
						if (res.code == 1) {
							uni.showToast({
								title: res.info,
								icon: 'none'
							});
							var dailyCheckinweb = res.data;
							console.log(dailyCheckinweb)
							if (dailyCheckinweb == undefined || dailyCheckinweb == '') {

								console.log("no")
							} else {
								uni.setStorageSync('webUrl', dailyCheckinweb);
								setTimeout(() => {
									uni.navigateTo({
										url: "/pages/index/webview"
									});
									// window.location.href = dailyCheckinweb;
								}, 1500)
							}
							setTimeout(() => {
							service.auth(self, service.api.main.asset, 'GET', '', function(self, res) {
								// console.log(res)
								var member = res.data.list;
								uni.setStorageSync("memberss", member);
								self.wti = member.wti;
								self.activity = member.activity;
								self.glory = member.glory;
								self.integral = member.integral;
								self.wtiing = res.data.wti;
							});
								}, 1500)

						} else {
							uni.showToast({
								title: res.info,
								icon: 'none'
							});
						}
						// console.log(res);
					}
				})
			},
			lookDeail(e) {
				var e = this.informList;
				var crateTime = e.createtime;
				var time = crateTime.substr(0, 11); //字符串方法
				var times = time.split('-'); //字符串方法
				var time = times.join('/'); //数组方法
				uni.setStorageSync('noticeTime', time);
				uni.setStorageSync('noticeConten', e.content);
				uni.navigateTo({
					url: '/pages/index/noticeDeail'
				});
				// console.log(e, "infoxxxxxxxxxx")
			},


			/*----获取位置权限----*/

			/* uni.getLocation({//H5无法获取经纬
			    type: 'gcj02',
			    success:(res)=>{
			        console.log('当前位置的经度：' + res.longitude ,"longitude");
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			}); */
			openSetting() {
				console.log("openSe");
				// App跳转系统的设置界面
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success(res) {
						if (res.platform == 'ios') { //IOS
							plus.runtime.openURL("app-settings://");
						} else if (res.platform == 'android') { //安卓
							let main = plus.android.runtimeMainActivity();
							let Intent = plus.android.importClass("android.content.Intent");
							let mIntent = new Intent('android.settings.ACTION_SETTINGS');
							main.startActivity(mIntent);
						}
					}
				});
				// #endif
			},

			chooseLocation() {
				// 先判断定位权限是否开启
				var self = this;
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						uni.setStorageSync('longitude', res.longitude);
						uni.setStorageSync('latitude', res.latitude);
						// console.log('当前位置的经度：' + uni.getStorageSync("longitude"), "longitude");
						// console.log('当前位置的纬度：' + res.latitude);
					}
					/* ,
			        fail(e) {
						
			            // 定位权限未开启，引导设置
			            uni.showModal({
			                title: '温馨提示',
			                content: '未开启定位,请开启',
			                confirmText: '确定',
			                success:(res)=>{
			                    if (res.confirm) {
			                        //打开授权设置
			                        self.openSetting()
			                    }
			                }
			            })
			        } */
				})
			}
			/*----获取位置权限----*/
		},
		onLoad(e){
			console.log(e,'前端')
			var self = this;
			if(uni.getStorageSync('tan') == 1){
				// 公告接口		
				service.auth(this , service.api.service.notice , 'GET' , '' , function(self , res){
					console.log(res,"66666");
					uni.getStorageSync('tan', 0);
					if(res.code == 1){
						self.detail = res.data.detail
						self.title = res.data.title
						if(res.data == null ){
							self.str = false
						}else{
								self.str = true;
							}
					}
				});
			}
			this.Loadthepage()
		},
		onShow() {
			var self = this;
		



	// service.auth(this, service.api.index.cargetArticle, 'GET', '', function(self, res) {
	// 				self.dataList  = res.data
	// 			console.log(res)
	// 			})


			/*----获取位置权限----*/
			this.chooseLocation();
			/*----获取位置权限----*/


			/*---清除我的车险上传的缓存数据---*/
			uni.removeStorageSync('upcardata');
			uni.removeStorageSync('proCityId');
			/*---清除我的车险上传的缓存数据---*/


			/*---清除洗车服务的缓存数据---*/
			uni.removeStorageSync('wasCarServ');
			/*---清除洗车服务的缓存数据---*/


			/*-----获取会员信息------*/
			if (uni.getStorageSync('member') == '' || uni.getStorageSync('member') == undefined) { //判断是否有缓存,如果没有就请求接口 , 用户退出应清除这个接口,否则无法更新等级等问题
				service.auth(this, service.api.home.info, 'GET', '', function(self, res) {
					// console.log("没有缓存,请求接口", res)
					var member = res.data.member;
					uni.setStorageSync("member", member);
					self.account = member.account;
					self.nickname = member.nickname;
					self.avatar = member.avatar;
					self.levelname = member.levelname;
				})
			} else {
				var member = uni.getStorageSync('member');

				// console.log("已经有缓存了,没有请求接口")
				this.account = member.account;
				this.nickname = member.nickname;
				this.avatar = member.avatar;
				this.levelname = member.levelname;
			}
			/*-----获取会员信息------*/

			/*----首页轮播图----*/
			service.auth(this, service.api.index.getSlide, 'GET', '', function(self, res) {

				self.swipers = res.data;

			})
			/*----首页轮播图----*/

			service.auth(this, service.api.main.asset, 'GET', '', function(self, res) {

				var member = res.data.list;
				uni.setStorageSync("memberss", member);
				self.wti = member.wti;
				self.activity = member.activity;
				self.glory = member.glory;
				self.integral = member.integral;
				self.wtiing = res.data.wti;
			});

			/*----获取实名认证的状态---*/
			uni.request({ //获取实名认证的状态
				url: this.$service.api.index.check_status,
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					var res = res.data;
					
			 uni.setStorageSync('realName', res.data.status);
					console.log(res.data.status,1111)

				}
			});
			/*----获取实名认证的状态---*/

			/*---获取车主认证状态---*/
			uni.request({ //获取车主认证状态
				url: this.$service.api.index.car_check,
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					var res = res.data;
					uni.setStorageSync('carAuth', res.data.status);

				}
			});
			/*---获取车主认证状态---*/


			/*---获取商家认证状态---*/
			uni.request({ //获取商家认证状态
				url: this.$service.api.center.check_status,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					var res = res.data;
					uni.setStorageSync('merchantAuth', res.status);

				}
			});
			/*---获取商家认证状态---*/

			/*---获取申请合伙人状态---*/
			uni.request({ //获取申请合伙人状态
				url: this.$service.api.record.partner_status,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {

					var res = res.data;
					uni.setStorageSync('partnerStatus', res.status);


				}
			});
			/*---获取申请合伙人状态---*/

			/*---获取免责声明---*/
			this.$service.auth(this, this.$service.api.home.liability, "GET", '', function(self, res) {

				uni.setStorageSync('liability', res.data);
			});
			/*---获取免责声明---*/

			/*---获取公告---*/
			this.$service.auth(this, this.$service.api.home.inform, "GET", '', function(self, res) {

				self.informList = res.data[0];
				self.consss = self.informList.content.replace(/[\r\n]/g, "");

			});


			this.$service.auth(this, this.$service.api.home.hero, "GET", '', function(self, res) {
				// self.informList.push(res.data[0]);
				res.data.forEach((v, i) => {
					self.heroList.push({
						content: v.content
					});
				});
			});
			/*---获取公告---*/

			/*---店铺类型---*/
			uni.request({
				url: service.api.home.category,
				method: 'POST',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					uni.setStorageSync('category', res.data.data);
				}
			});
			/*---店铺类型---*/


		}

	}
</script>

<style>
	page {
		background-color: #f1f7fc;
	}

	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		/* padding-top:var(--status-bar-height); */
		padding-top: 0;
		overflow: auto;
		
	}
	.bounced-box{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		z-index: 30;
	}
.bounced{
	width: 550upx;
	height: 700upx;
	position: fixed;
	/* border: 1px solid #000; */
	top:20%;
	left:96upx;
	z-index: 50;
	
}
.bounced-img{
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -1;
}
.bounced button{
	width: 400upx;
	height: 60upx;
	background-color: #5fa9fd;
	border-radius: 25upx;
	line-height: 60upx;
	text-align: center;
	position: absolute; 
	left: 14%;
	 bottom: 40upx;
	color: #fff;
}
.announcement{
	color: #fff;
	font-size: 50upx;
	font-weight: bold;
	margin-top: 70upx;
	text-align: center;
}
.text-font{
	width: 400upx;
	margin: 100upx auto;
	/* padding: 0 30upx; */
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
	font-size: 20upx;
	/* position: absolute;
	top:30%;
	left: 10%; */
	
}
	.header {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		/* display: flex; */
		/* justify-content: space-between; */
		/* align-items: center; */
		width: 100%;
		background-color: transparent;
		background: transparent;
	}

	/*.right_{
		width: 20%;
		text-align: center;
	} */
	.left_ {
		margin-left: 40upx;
		width: 20%;
	}

	.left_ image {
		width: 102upx;
		height: 46upx;
	}

	.right_ image {
		width: 36upx;
		height: 36upx;

	}

	/* .center_title{
		text-align: center;
		width: 60%;
	} */
	.swiperss {
		width: 100%;
		height: 440upx;
	}

	/* .swiper-item{
		width: 100%;
		height: 659upx;
	} */
	.swiper {
		position: relative;
	}

	.swiper-item image {
		width: 100%;
		/* height: 659upx; */
	}

	.platformInfo {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx #F5F5F5 solid;
		width: 100%;
		/* height: 86upx; */
		padding: 12upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}

	.platInfo_title {
		width: 123upx;
		height: 29upx;
		/* margin: 0 auto; */
		display: flex;
		justify-content: center;
		align-items: center;
		/* vertical-align: middle; */
		/* width:20%; */
		padding-right: 22upx;
		border-right: 2upx solid #DFDFDF;
	}

	.platInfo_title image {
		width: 100%;
		height: 100%;
	}

	.platInfo_cont {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 70%;
		padding: 0 22upx;
		font-size: 28upx;
	}

	.platInfo_much {
		width: 10%;
		font-size: 24upx;
		color: #999999;
		/* padding: 0 22upx; */
		padding-left: 22upx;
		border-left: 2upx solid #DFDFDF;
		text-align: center;
	}

	.navs {
		display: flex;
		flex-wrap: wrap;
		padding: 10upx 0;
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}

	.navs_item {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		/* margin: 0 auto; */
		/* text-align: center; */
		/* vertical-align: middle; */
	}

	.navs_itemss1,
	.navs_itemss2,
	.navs_itemss3,
	.navs_itemss4,
	.navs_itemss5 {
		margin-bottom: 20upx;
	}

	.navs_img {
		width: 67upx;
		height: 66upx;
	}

	.navs_img image {
		width: 100%;
		height: 100%;
	}

	.navs_text {
		padding-top: 20upx;
		font-size: 26upx;
		color: #333333;
	}

	.platInfo_cont3 {
		padding: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* width: 70%; */
		width: 100%;
		/* padding: 0 22upx; */
		font-size: 28upx;
		text-align: center;
	}

	.floor_cont {
		width: 95%;
		height: 39%;
		margin: 20upx auto 4upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		padding: 10upx 0 20upx;
		border: 2upx solid #277bfc;
	}

	.floor_cont_chebei {
		font-size: 22upx;
		color: #0548D0;
		padding: 20upx 60upx;
		background-color: #e7edff;
		border-radius: 36upx;
		margin-bottom: 40upx;
	}

	.floor_cont_num {
		color: #2678FD;
		font-size: 66upx;
		font-weight: bold;
		/* padding: 32upx 0upx 80upx; */
	}

	.floor_cont_list {
		display: flex;
		width: 100%;
		margin-bottom: 30upx;
	}

	.floor_cont_item {
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.floor_cont_happly {
		font-size: 36upx;
		color: #FFFFFF;
		background: linear-gradient(to right, #2B94F9, #2676FD);
		border-radius: 44upx;
		padding: 18upx 134upx;
		/* letter-spacing: ;  字间距 */
	}

	.marquee {
		width: 1000upx;
		animation: move 18s linear infinite;
		text-align: center;
	}

	@keyframes move {
		0% {
			transform: translateX(1000upx);
		}

		/* 50%
	    {
	        transform:translateX(-1000upx);
	    } */
		100% {
			transform: translateX(-2600upx);
		}

		/* from {left:200upx;}
		to {left:1000px;} */

	}
	
.reading-box{
	padding: 20upx;
	margin: 40upx 30upx auto; 
	border: 2px solid #69AFFF;
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
	border-bottom: 1px solid #ccc;
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
