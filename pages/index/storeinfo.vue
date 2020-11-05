<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jum('/pages/main/carService')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>店铺信息</text>
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" autoplay="true">
			<swiper-item>
				<view class="swiper-it uni-bg-red">
					<image src="../../static/img/Snipaste_2020-04-01_09-37-01.png" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="detail_info">
			<!-- <view class="store_title">
				<text></text>
			</view> -->
			<view class="conway,item1">
				<view class="coninfo_icon">
					<image mode="widthFix"></image>
				</view>
				<view class="coninfo_text">
					<text style="color: #333333; font-size: 26upx;">{{sercon.merchname}}</text>
					<text style="color: #999999; font-size: 22upx; padding-top: 10upx;"></text>
				</view>
			</view>
			<view class="conway , item2">
				<view class="coninfo_icon">
					<image src="../../static/icon/colorphone.png" mode="widthFix"></image>
				</view>
				<view class="coninfo_text">
					<text style="color: #333333; font-size: 26upx;">联系方式</text>
					<text style="color: #999999; font-size: 22upx; padding-top: 10upx;">{{sercon.merch_mobile}}</text>
				</view>
			</view>
			<view class="conway , item3">
				<view class="coninfo_icon">
					<image src="../../static/icon/addrs.png" mode="widthFix"></image>
				</view>
				<view class="coninfo_text">
					<text style="color: #333333; font-size: 26upx;">店铺地址</text>
					<text style="color: #999999; font-size: 22upx; padding-top: 10upx;">{{sercon.merch_address}}</text>
				</view>
			</view>
			<view class="conway , item4">
				<view class="coninfo_icon">
					<image src="../../static/icon/sertime.png" mode="widthFix"></image>
				</view>
				<view class="coninfo_text">
					<text style="color: #333333; font-size: 26upx;">服务期限</text>
					<text style="color: #999999; font-size: 22upx; padding-top: 10upx;">{{sercon.effective_time}}</text>
				</view>
			</view>
			<!-- <view class="storeloads">
				<view class="coninfo_icon">
					<image src="../../static/icon/addrs.png" mode=""></image>
				</view>
				<view class="coninfo_text">
					<h3></h3>
					<text></text>
				</view>
			</view> -->
			<!-- <view class="storestime">
				<view class="coninfo_icon">
					<image src="../../static/icon/sertime.png" mode=""></image>
				</view>
				<view class="coninfo_text">
					<h3></h3>
					<text></text>
				</view>
			</view> -->
		</view>

		<view class="store_eval" v-if="commentss.length != 0">
			<view class="store_eval_header">
				<view class="eval_header_tilte">
					<text style="color: #000000; font-size: 32upx;">店铺评价</text>
				</view>
				<view class="eval_star">
					<view class="stars" v-for="(it , i) in starlist" :key="it.id">
						<image :src="it.opartion?'../../static/icon/star.png':'../../static/icon/nolightstar.png'" mode="widthFix"></image>
					</view>
					<view class="eval_star_text" >
						<text>{{comment.star}}星</text>
					</view>
				</view>
			</view>
			<view class="store_eval_butom">
				<view class="eval_butom_img">
					<image :src="avatar" mode="widthFix"></image><!-- :src="comment.user.avatar" -->
				</view>
				<view class="eval_butom_text">
					<view class="butom_name_time">
						<text style="color: #333333; font-size: 26upx; font-weight: bold;">{{nickname}}</text><!-- {{comment.user.nickname}} -->
						<text style="color: #999999; font-size: 22upx;">{{comment.create_time}}</text>
					</view>
					<view class="eval_butom_lookmore" @click="jumpp('/pages/index/allevalu')">
						<text style="color: #FA9C22; font-size: 26upx;">查看更多评价</text>
					</view>
					<view class="eval_butom_conts">
						<text style="color: #333333; font-size: 26upx;">{{comment.content}}</text>
					</view>
				</view>
			</view>
		</view>
		

		<view class="floor_btn">
			<view class="nav1" @click="navigation">
				<text>导航</text>
			</view>
			<view class="sub2">
				<!-- @click="subscribe" -->
				<!-- <text>预约</text> -->
				<picker class="" @tap='pickerTap' mode="multiSelector" @change="bindStartMultiPickerChange" @columnchange="bindMultiPickerColumnChange"
				 :value="multiIndex" :range="multiArray">预约</picker>
			</view>
		</view>

		<!-- 评价 -->
		<view class="writeeval" @click="jump('/pages/index/issueeval?id='+id)">
			<image src="../../static/icon/evaluate.png" mode=""></image>
		</view>
		<!-- 评价 -->

		<view class="mask" v-if="showwind == 1" @click="showwinds">
			<!-- 遮罩层 -->
		</view>

		<!-- 预约时间 -->



		<!-- <view :class="['selcitybox' , {'active':showwind == 1}]">
			<view class="pick_header">
				<view class="pick_left" @click="cancel">
					<text>取消</text>
				</view>
				<view class="pick_midd">
					<text>选择城市</text>
				</view>
				<view class="pick_right" @click="comsel">
					<text>完成</text>
				</view>
			</view>
			<picker-view class="selcityit" :indicator-style="indicatorstyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in multiArray[0]" :key="index">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in multiArray[1]" :key="index">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in multiArray[2]" :key="index">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view> -->
		<!-- 预约时间 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				id: '', //
				indicatorDots: '',
				// indicatorstyle: "border-top:4upx solid #DADADA;border-bottom:4upx solid #DADADA;height:100upx;text-align:center;",
				value: [],
				commentss:'',//店铺评价列表
				/* deinfos: [
					{
						id: 1,
						title: "广州市牛哄哄修车旗舰店",
						src: "",
						text: ""
					},
					{
						id: 2,
						title: "联系方式",
						src: "../../static/icon/colorphone.png",
						text: "202-88888888888"
					},
					{
						id: 3,
						title: "店铺地址",
						src: "../../static/icon/addrs.png",
						text: "广州市天河区中山大道中66号某某路左侧对面"
					},
					{
						id: 4,
						title: "服务期限",
						src: "../../static/icon/sertime.png",
						text: "2020-01-03 至 2022-01-04"
					}
				], */
				starlist: [{
						id: 1,
						opartion: false
					},
					{
						id: 2,
						opartion: false
					},
					{
						id: 3,
						opartion: false
					},
					{
						id: 4,
						opartion: false
					},
					{
						id: 5,
						opartion: false
					}
				],
				starnum: '', //店铺的评价星星数
				sercon: '',
				comment: '',
				lat: '', //经纬
				lng: '', //纬度
				nickname: '',
				avatar: '',
				showwind: 0, //控制遮罩层的显示隐藏
				
				// currentHours: '', //当前小时
				// currentMinute: '', //当前分钟
				multiArray: [], //
				multiIndex: [],
				subscribe_time: ''

			}
		},
		methods: {
			xxxxx() {
				uni.showToast({
					title: "功能开发中",
					icon: 'none'
				})
			},
			jum(e) {
				uni.switchTab({
					url: e
				});
			},
			jump(e) {
				if (this.sercon.can_comment == 1) {
					uni.navigateTo({
						url: e
					});
				} else {
					uni.showToast({
						title: '未使用兑换券',
						icon: "none"
					});
				}
			},
			jumpp(e) {
				uni.navigateTo({
					url: e
				});
			},
			navigation() { //导航
				// uni.getLocation({
				//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				//     success: function (res) {
				//         const latitude = res.latitude;
				//         const longitude = res.longitude;
				if (this.lat % 1 == 0) {
					var lon = parseInt(this.lat) + 0.0000001
				} else {
					var lon = parseFloat(this.lat);
				}
				if (this.lng % 1 == 0) {
					var lat = parseInt(this.lng) + 0.0000001
				} else {
					var lat = parseFloat(this.lng);
				}

				console.log(lat, lon);
				uni.openLocation({
					latitude: lat,
					longitude: lon,
					success: function() {
						console.log('success');
					}
				});
				//     }
				// });
			},

			showwinds() {
				this.showwind = 0;

			},

			subscribe() { //预约
				this.showwind = 1;
			},

			getTime(year, mon) { //用于获取月份的天数,这样就不用进行大规模的判断
				var d = new Date(year, mon, 0);
				return d.getDate();
			},


			/*-----时间选择器-----*/
			bindStartMultiPickerChange(e) { //确定选择
				console.log(e, "bindStartMultiPickerChange");
				var date22 = new Date();
				var year22 = date22.getFullYear();
				var mount22 = date22.getMonth() + 1;
				var day22 = date22.getDate();
				var valueArray = e.detail.value;
				var valueNum0 = valueArray[0];
				var valueNum1 = valueArray[1];
				var valueNum2 = valueArray[2];
				if (valueArray.length == 0) { //用户三列都没有选
					this.subscribe_time = year22 + "-" + mount22 + "-" + day22 + " " + this.multiArray[1][0] + ":" + this.multiArray[2][0];
					console.log(this.subscribe_time);
				} else if (valueArray.length == 1) { //用户只选择了第一列
					// if(valueArray[0] != undefined || valueArray[0] == 0){
					if (valueNum0 == 0) {
						this.subscribe_time = year22 + "-" + mount22 + "-" + day22 + " " + this.multiArray[1][0] + ":" + this.multiArray[2][0];

					} else if (valueNum0 == 1) {
						this.subscribe_time = year22 + "-" + mount22 + "-" + (day22 + 1) + " " + this.multiArray[1][0] + ":" + this.multiArray[2][0];
					} else {
						this.subscribe_time = year22 + "-" + this.multiArray[0][valueNum0] + " " + this.multiArray[1][0] + ":" + this.multiArray[2][0];
						console.log(this.subscribe_time, "11111111111111111");
					}
					// }
					/* else if(valueArray[1] != undefined || valueArray[1] == 0){
						var valueNum1 = valueArray[1]
						this.subscribe_time = year22+"-"+mount22+"-"+day22+" "+this.multiArray[1][valueNum1]+":"+this.multiArray[2][0];
					}else if(valueArray[2] != undefined || valueArray[2] == 0){
						var valueNum2 = valueArray[2]
						this.subscribe_time = year22+"-"+mount22+"-"+day22+" "+this.multiArray[1][0]+":"+this.multiArray[2][valueNum2];
					} */
				} else if (valueArray.length == 2) { //用户选择了前两列
				
					if (valueNum0 == 0 || valueNum0 == undefined) {
						this.subscribe_time = year22 + "-" + mount22 + "-" + day22 + " " + this.multiArray[1][valueNum1] + ":" + this.multiArray[2][0];

					} else if (valueNum0 == 1 ) {
						this.subscribe_time = year22 + "-" + mount22 + "-" + (day22 + 1) + " " + this.multiArray[1][valueNum1] + ":" + this.multiArray[2][0];
					} else {
						this.subscribe_time = year22 + "-" + this.multiArray[0][valueNum0] + " " + this.multiArray[1][valueNum1] + ":" + this.multiArray[2][0];
						console.log(this.subscribe_time, "11111111111111111");
					}
				}else if(valueArray.length == 3){
					if (valueNum0 == 0 || valueNum0 == undefined) {
						if(valueNum1 == undefined){
						this.subscribe_time = year22 + "-" + mount22 + "-" + day22 + " " + this.multiArray[1][0] + ":" + this.multiArray[2][valueNum2];
						}else{
							this.subscribe_time = year22 + "-" + mount22 + "-" + day22 + " " + this.multiArray[1][valueNum1] + ":" + this.multiArray[2][valueNum2];
						}
						
					} else if (valueNum0 == 1) {
						if(valueNum1 == undefined){
						this.subscribe_time = year22 + "-" + mount22 + "-" + (day22 + 1) + " " + this.multiArray[1][0] + ":" + this.multiArray[2][valueNum2];
						}else{
							this.subscribe_time = year22 + "-" + mount22 + "-" + (day22 + 1) + " " + this.multiArray[1][valueNum1] + ":" + this.multiArray[2][valueNum2];
						}
					} else if(valueNum1 == undefined){
						this.subscribe_time = year22 + "-" + this.multiArray[0][valueNum0] + " " + this.multiArray[1][0] + ":" + this.multiArray[2][valueNum2];
						console.log(this.subscribe_time, "11111111111111111");
					}else{
					this.subscribe_time = year22 + "-" + this.multiArray[0][valueNum0] + " " + this.multiArray[1][valueNum1] + ":" + this.multiArray[2][valueNum2];
					}
				}
				
				/* this.$service.auth(this , this.$service.api.index.subscribe , "POST" , {
					merch_id:this.id,
					subscribe_time:this.subscribe_time
				},function(self , res){
					if(res.code == 1){
						uni.showToast({
						title:res.info,
						icon:"none",
						duration:6000
					});
					}
					console.log(res , "success");
					
				}); */
				
				uni.request({
					url:this.$service.api.index.subscribe,
					method:'POST',
					data:{
						merch_id:this.id,
						subscribe_time:this.subscribe_time
					},
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res ,"afadsfasd");
						if(res.data.code == 1){
							uni.showToast({
								title:res.data.info,
								icon:"none"
							});
						}else{
							uni.showToast({
								title:res.data.info,
								icon:"none"
							});
						}
					}
				});
				
			},


			pickerTap() {
				// this.showwind = 1;
				console.log("pickerTap")
				var date = new Date();
				var monthDay = ['今天', '明天'];
				var hours = [];
				var minute = [];

				var currentHours = date.getHours();
				var currentMinute = date.getMinutes();

				// 月-日
				for (var i = 2; i <= 31; i++) {
					var date1 = new Date();
					date1.setDate(date.getDate() + i);
					var md = (date1.getMonth() + 1) + "-" + date1.getDate();
					// console.log(date1.getMonth() + 1 , date1.getDate());
					monthDay.push(md);
				}

				var minuteIndex;
				if (currentMinute > 0 && currentMinute <= 10) {
					minuteIndex = 10;
				} else if (currentMinute > 10 && currentMinute <= 20) {
					minuteIndex = 20;
				} else if (currentMinute > 20 && currentMinute <= 30) {
					minuteIndex = 30;
				} else if (currentMinute > 30 && currentMinute <= 40) {
					minuteIndex = 40;
				} else if (currentMinute > 40 && currentMinute <= 50) {
					minuteIndex = 50;
				} else {
					minuteIndex = 60;
				}

				if (minuteIndex == 60) {
					// 时
					for (var i = currentHours + 1; i < 24; i++) {
						if(i < 10){
						hours.push("0"+i);
							
						}else{
							hours.push(i);
						}
					}

					// 分
					for (var i = 0; i < 60; i += 10) {
						// minute.push(i);
						if(i < 10){
						minute.push("0"+i);
							
						}else{
							minute.push(i);
						}
					}

				} else {
					// 时
					for (var i = currentHours; i < 24; i++) {
						// hours.push(i);
						if(i < 10){
						hours.push("0"+i);
							
						}else{
							hours.push(i);
						}
					}

					// 分
					for (var i = minuteIndex; i < 60; i += 10) {
						// minute.push(i);
						if(i < 10){
						minute.push("0"+i);
							
						}else{
							minute.push(i);
						}
					}
				}
				/* var data = {
				   multiArray: this.data.multiArray,
				   multiIndex: this.data.multiIndex
				}; */
				this.multiArray[0] = monthDay;
				this.multiArray[1] = hours;
				this.multiArray[2] = minute;
				this.multiIndex.length = 3;
				// this.setData(data);
				console.log(this.multiArray, "data.multiArray", this.multiIndex[0]);
				this.$forceUpdate();
			},


			bindMultiPickerColumnChange(e) {
				console.log(e, "bindChange");
				var date = new Date();

				var that = this;

				var monthDay = ['今天', '明天'];
				var hours = [];
				var minute = [];

				var currentHours = date.getHours();
				var currentMinute = date.getMinutes();

				/* var data = {
				  multiArray: this.data.multiArray,
				  multiIndex: this.data.multiIndex
				}; */
				// 把选择的对应值赋值给 multiIndex
				that.multiIndex[e.detail.column] = e.detail.value;
				console.log(that.multiIndex, "that.multiIndex");
				// 然后再判断当前改变的是哪一列,如果是第1列改变
				if (e.detail.column === 0) {
					// 如果第一列滚动到第一行
					if (e.detail.value === 0) {
						that.loadData(hours, minute);
					} else {
						that.loadHoursMinute(hours, minute);
					}
					that.multiIndex[1] = 0;
					that.multiIndex[2] = 0;


					// 如果是第2列改变
				} else if (e.detail.column === 1) {

					// 如果第一列为今天
					if (that.multiIndex[0] === 0 || that.multiIndex[0] == undefined) {
						if (e.detail.value === 0) {
							that.loadData(hours, minute);
						} else {
							that.loadMinute(hours, minute);
						}
						// 第一列不为今天
					} else {
						that.loadHoursMinute(hours, minute);
					}
					that.multiIndex[2] = 0;

					// 如果是第3列改变
				} else {
					// 如果第一列为'今天'
					if (that.multiIndex[0] === 0 || that.multiIndex[0] == undefined) {

						// 如果第一列为 '今天'并且第二列为当前时间
						if (that.multiIndex[1] === 0 || that.multiIndex[1] == undefined) {
							that.loadData(hours, minute);
						} else {
							that.loadMinute(hours, minute);
						}
					} else {
						that.loadHoursMinute(hours, minute);
					}
				}
				that.multiArray[1] = hours;
				that.multiArray[2] = minute;
				// this.setData(that);
				that.$forceUpdate();
			},

			loadData: function(hours, minute) {
				var date = new Date();
				var currentHours = date.getHours();
				var currentMinute = date.getMinutes();
				var minuteIndex;
				if (currentMinute > 0 && currentMinute <= 10) {
					minuteIndex = 10;
				} else if (currentMinute > 10 && currentMinute <= 20) {
					minuteIndex = 20;
				} else if (currentMinute > 20 && currentMinute <= 30) {
					minuteIndex = 30;
				} else if (currentMinute > 30 && currentMinute <= 40) {
					minuteIndex = 40;
				} else if (currentMinute > 40 && currentMinute <= 50) {
					minuteIndex = 50;
				} else {
					minuteIndex = 60;
				}

				if (minuteIndex == 60) {
					// 时
					for (var i = currentHours + 1; i < 24; i++) {
						// hours.push(i);
						if(i < 10){
							hours.push("0"+i)
						}else{
							hours.push(i);
						}
					}
					// 分
					for (var i = 0; i < 60; i += 10) {
						// minute.push(i);
						if(i < 10){
							minute.push("0"+i)
						}else{
							minute.push(i);
						}
					}
				} else {
					// 时
					for (var i = currentHours; i < 24; i++) {
						// hours.push(i);
						if(i < 10){
							hours.push("0"+i)
						}else{
							hours.push(i);
						}
					}
					// 分
					for (var i = minuteIndex; i < 60; i += 10) {
						// minute.push(i);
						if(i < 10){
							minute.push("0"+i)
						}else{
							minute.push(i);
						}
					}
				}
			},

			loadHoursMinute: function(hours, minute) {
				// 时
				for (var i = 0; i < 24; i++) {
					// hours.push(i);
					if(i < 10){
						hours.push("0"+i)
					}else{
						hours.push(i);
					}
				}
				// 分
				for (var i = 0; i < 60; i += 10) {
					// minute.push(i);
					if(i < 10){
						minute.push("0"+i)
					}else{
						minute.push(i);
					}
				}
			},

			loadMinute: function(hours, minute) {
				var date = new Date();
				var currentHours = date.getHours();
				var currentMinute = date.getMinutes();
				var minuteIndex;
				if (currentMinute > 0 && currentMinute <= 10) {
					minuteIndex = 10;
				} else if (currentMinute > 10 && currentMinute <= 20) {
					minuteIndex = 20;
				} else if (currentMinute > 20 && currentMinute <= 30) {
					minuteIndex = 30;
				} else if (currentMinute > 30 && currentMinute <= 40) {
					minuteIndex = 40;
				} else if (currentMinute > 40 && currentMinute <= 50) {
					minuteIndex = 50;
				} else {
					minuteIndex = 60;
				}

				if (minuteIndex == 60) {
					// 时
					for (var i = currentHours + 1; i < 24; i++) {
						// hours.push(i);
						if(i < 10){
							hours.push("0"+i)
						}else{
							hours.push(i);
						}
					}
				} else {
					// 时
					for (var i = currentHours; i < 24; i++) {
						// hours.push(i);
						if(i < 10){
							hours.push("0"+i)
						}else{
							hours.push(i);
						}
					}
				}
				// 分
				for (var i = 0; i < 60; i += 10) {
					// minute.push(i);
					if(i < 10){
						minute.push("0"+i)
					}else{
						minute.push(i);
					}
				}
			},

			/*-----时间选择器-----*/


			

		},
		onLoad(op) {
			this.id = op.id;//店铺ID
			this.lat = op.lat;
			this.lng = op.lng;
			// var self = this;
			this.$service.auth(this, this.$service.api.main.merch_list, 'POST', {
				// page:1,
				// limit:15,
				id: this.id
				// type:1,
				// lat:this.longitude,
				// lng:this.latitude,
				// rate:2,
				// distance:2
			}, function(self, res) {
				console.log(res);
				self.sercon = res.data.data[0];
			});

			this.$service.auth(this, this.$service.api.index.comment_list, 'POST', {
				page: 1,
				limit: 15,
				id: this.id
			}, function(self, res) {
				console.log(res);
				self.comment = res.data.data[0];
				self.commentss = res.data.data;
				var user = res.data.data[0].user;
				self.avatar = user.avatar;
				self.nickname = user.nickname;
				console.log(self.avatar, self.nickname)
				var nums = self.comment.star;
				for (let i = 0; i < nums; i++) { //改变opartion的属性店铺的评价星星数
					self.$set(self.starlist[i], "opartion", true);
				}
			});
		},
		onShow() {
			// this.Month();
			// this.Month()
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

	.swiper-it {
		width: 100%;
		height: 100%;
	}

	.coninfo_icon {
		width: 24upx;
		/* height: 24upx; */
		margin-right: 30upx;
	}

	.detail_info {
		background-color: #FFFFFF;
		padding: 0 30upx;
	}

	.conway {
		display: flex;
		align-items: center;
		padding: 30upx 20upx;
		border-bottom: 2upx solid #F4F4F4;
	}

	.coninfo_text {
		display: flex;
		flex-direction: column;
	}

	.coninfo_text text {
		color: #666666;
		font-size: 22upx;
	}

	.item1 .coninfo_text text {
		color: #000000;
		font-size: 32upx !important;
		font-weight: bold;
	}

	.store_eval {
		/* display: flex; */
		margin-top: 20upx;
		padding: 0upx 40upx;
		background-color: #FFFFFF;
	}

	.store_eval_header {
		padding: 20upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2upx solid #F4F4F4;
	}

	.eval_star {
		display: flex;
		align-items: center;
	}

	.eval_star .stars {
		width: 24upx;
		margin-right: 10upx;
	}

	.eval_star_text {
		color: #666666;
		font-size: 26upx;
	}

	.store_eval_butom {
		display: flex;
		padding: 30upx 0 160upx;
	}

	.eval_butom_img {
		width: 83upx;
	}

	.eval_butom_text {
		padding: 0 20upx;
		width: 80%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.butom_name_time {
		width: 50%;
		display: flex;
		flex-direction: column;

	}

	.eval_butom_lookmore {
		width: 50%;
		text-align: end;

	}

	.eval_butom_conts {
		margin-top: 20upx;
		overflow: hidden;
		/* 文字超出显示点点 */
		text-overflow: ellipsis;
		white-space: 2;
	}

	.floor_btn {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		text-align: center;
		width: 100%;
		box-sizing: border-box;
		/* padding: 50upx 0; */

	}

	.nav1 {
		background-color: #DBEBFF;
		color: #0089E2;
		font-size: 36upx;
		width: 50%;
		padding: 26upx 102upx;
		box-sizing: border-box;
		/* box-sizing: border-box; */

	}

	.sub2 {
		background-color: #0089E2;
		color: #FFFFFF;
		font-size: 36upx;
		width: 50%;
		/* padding: 30upx 152upx; */
		padding: 26upx 102upx;
		box-sizing: border-box;
	}

	.writeeval {
		width: 149upx;
		height: 149upx;
		position: fixed;
		bottom: 100upx;
		right: 24upx;
	}

	.mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
	}

	.selcitybox {
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		border-radius: 35upx 35upx 0 0;
		transform: translateY(100%);
		transition: 0.6s;
		z-index: 3;
	}

	.active {
		transform: translateY(0);
	}

	.selcityit {
		background-color: #FFFFFF;
		width: 100%;
		height: 550upx;
		border-radius: 35upx 35upx 0 0;

	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pick_header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30upx;
	}

	.pick_left,
	.pick_right {
		color: #2189FF;
		font-size: 36upx;
	}

	.pick_left {
		color: #999999;
	}

	/* 选择城市样式 */

	.notice_box {
		width: 90%;
		height: 95%;
		background-color: #FFFFFF;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		/* left: 0; */
		overflow: auto;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 30upx;
		/* border-top:10upx solid #FFFFFF ; */
		z-index: 3;
	}
</style>
