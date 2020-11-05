<template>
	<view class="content">
		<headers :url_ri="url_ri" :Htitle="Htitle" :subtitle="subtitle" :hstyle="hstyle"></headers>
		<view class="top_back"><image src="../../static/background/trandi_back.png" mode=""></image></view>
		<view class="top_back2"></view>
		<!-- - -->
		<view class="box1">
			<view class="box1_it">
				<view class="it_num">
					<text>{{ total_sum }}</text>
				</view>
				<view class="it_name"><text>求购总量</text></view>
			</view>
			<view class="box1_it">
				<view class="it_num">
					<text>{{ order_sum1 }}/{{ order_sum2 }}</text>
				</view>
				<view class="it_name"><text>昨日成交/今日成交</text></view>
			</view>
			<view class="box1_it">
				<view class="it_num">
					<text>{{ last_price }}</text>
				</view>
				<view class="it_name"><text>今日均价</text></view>
			</view>
			<view class="box1_it">
				<view class="it_num">
					<text>{{ now_price }}</text>
				</view>
				<view class="it_name"><text>昨日均价</text></view>
			</view>
		</view>
		<!-- - -->
		<view class="box2">
			<view class="box2_top">
				<view class="top_block">
					<text>可置换车贝</text>
					<text>{{ mywti }}</text>
				</view>
				<view class="top_block">
					<text>手续费</text>
					<text>{{ service_charge }}%</text>
				</view>
				<view class="top_block">
					<text>等级</text>
					<text>{{ levelname }}</text>
				</view>
			</view>
			<view class="box2_btn" @click="jum('/pages/center/buy?now_price=' + now_price)"><text>我要置换</text></view>

			<view class="search-box">
				<view class="search">
					
					<view class="switch">
						<view class="typeBox">
							<view :class="['selph_inputs', { selp_back: showType }]" @click="selType">
								<text class="text-left">{{typeName}}</text>
								<image :src="showType ? '../../static/icon/big_sort_up.png' : '../../static/icon/big_sort_buttom.png'" mode=""></image>
							</view>
						</view>
						
						<view class="typeBlock" v-if="showType">
							<view class="typeList" v-for="(it , i) in typeList" :key="i"  @click="typess(it.name , it.id)">
								<text>{{it.name}}</text>
							</view>
						</view>
					</view>
					
					<input type="text" value="" v-model="account" class="input" placeholder="请输入手机号" v-if="inputType == 1"/>
					<input type="text" value="" v-model="email" class="input" placeholder="请输入邮箱号" v-else/>
				</view>
				<view class="search-img"><image src="../../static/reg/search.png" mode="" @click="search"></image></view>
			</view>
		</view>
		
		
		
		
		<!-- - -->
		<!-- <view class="box3"> -->
		
		
		
		
		<view class="box3_title"><text>求购列表</text></view>
		
		<!-- 降序排序 -->
		<view class="navshop" >
			
			<!-- 时间 -->
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClickbox(1,synthesis)">
				<text>时间</text>
				<view class="p-box" v-if="filterIndex === 1">
					<text class="active">
				   <uni-icons size="16" type="arrowdown" class="icon" color="#fa436a" v-if="synthesis == 1"></uni-icons>
				   <uni-icons size="16" type="arrowup" class="icon" color="#fa436a" v-else></uni-icons>
				</text>   
					
					<text :class="{active: timeOrder === false && filterIndex === 1}"></text>  
					
				</view>
			</view>
			
			<!-- 价格 -->
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClickbox(2,synthesis)">
				<text>价格</text>
				<view class="p-box" v-if="filterIndex === 2">
					<text class="active">
						<uni-icons size="16" type="arrowdown" class="icon" color="#fa436a" v-if="synthesis == 1"></uni-icons>
						<uni-icons size="16" type="arrowup" class="icon" color="#fa436a" v-else></uni-icons>
					</text> 
					<text :class="{active: priceOrder === false && filterIndex === 2}"></text>   
				</view>   
			</view>
			
			<!-- 数量 -->
			<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClickbox(3,synthesis)">
				<text>数量</text>
				<view class="p-box" v-if="filterIndex === 3">
					<text class="active">
						<uni-icons size="16" type="arrowdown" class="icon" color="#fa436a" v-if="synthesis == 1"></uni-icons>
						<uni-icons size="16" type="arrowup" class="icon" color="#fa436a" v-else></uni-icons>
					</text>   
					<text :class="{active: salesOrder === false && filterIndex ===3}"></text> 
				</view>   
			</view>
		
		</view>
		
		
		
		
		<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
			<view class="scr_padd">
				<view class="scr_it" v-for="(it, i) in scrlist" :key="i">
					<view class="scrit_left">
						<view class="scrit_left_top">
							<view class="left_top_img"><image :src="it.avatar" mode=""></image></view>
							<view class="left_top_text">
								<text>昵称:</text>
								<text>{{ it.nickname }}</text>
							</view>
						</view>
						<view class="left_mid">
							<text class="colf">数量</text>
							<text class="colf2">{{ it.purchase_quantity }}</text>
						</view>
						<view class="left_mid">
							<text class="colf">单价</text>
							<text class="colf2">$ {{ it.order_price }}</text>
						</view>
						<view class="tatel">
							<!-- 	<view class="left_mids">
									<image class="iconsss" src="../../static/icon/usdt.png" mode=""></image>
								</view>
								<view class="left_mids">
									<image class="iconsss" src="../../static/icon/zfb.png" mode="" ></image>
								</view> -->
							<!-- {{usdt}} -->
							<view class="left_mids" v-if="it.usdt == 1 || it.alipay == 1">
								<image class="iconsss" src="../../static/icon/usdt.png" mode="" v-if="it.usdt == 1"></image>
								<image class="iconsss" src="../../static/icon/zfb.png" mode="" v-if="it.alipay == 1"></image>
							</view>
						</view>
					</view>
					<view class="scrit_right">
						<view class="scrit_right_title">
							<text class="colf">30日成交量:</text>
							<text class="colf">{{ it.history }}</text>
						</view>
						<!-- <view :class="['scrit_btn' , it.mid == usermid ? 'selfcolor' : '' ]"  @click="jump('/pages/center/onsale?A='+it.purchase_quantity+'&&b='+it.order_price+'&&c='+now_price+'&&id='+it.id ,it.mid)">
								<text>卖给他</text>
							</view> -->

						<view
							class="scrit_btn , selfcolor"
							v-if="it.mid == usermid"
							@click="jump('/pages/center/onsale?A=' + it.purchase_quantity + '&&b=' + it.order_price + '&&c=' + now_price + '&&id=' + it.id, it.mid)"
						>
							<text>卖给他</text>
						</view>

						<view
							class="scrit_btn"
							v-else
							@click="jump('/pages/center/onsale?A=' + it.purchase_quantity + '&&b=' + it.order_price + '&&c=' + now_price + '&&id=' + it.id, it.mid)"
						>
							<text>卖给他</text>
						</view>
					</view>
				</view>
				<!-- <view class="loadclass" >
						<text>正在加载</text>
					</view> -->
				<view class="loadclass" v-if="loadshow"><text>数据已加载完毕</text></view>
			</view>
		</scroll-view>

		<!-- </view> -->
	</view>
</template>

<script>
import headers from '../../components/header_nav.vue';
import uniIcons from '@/components/uni-icons.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		headers,
		uniLoadMore,
		uniIcons
	},
	data() {
		return {
			synthesis:1,
			cateMaskState: 0, //分类面板展开状态
			cateId: 0, //已选三级分类id
			cateList: [],
			headerPosition:"fixed",
			headerTop:"0px",
			timeOrder: false, //false 时间从低到高 true时间从高到低
			priceOrder: false, //false 价格从低到高 true价格从高到低
			salesOrder: false, //false 销量从低到高 true销量从高到低
			filterIndex: 1,
			comp:false,
			color: false,
			image: true,
			num: 0,
			number: 1,
			keywords: '',
			category: '',
			indicatorDots: true,
			cart_status: false,
			isLoading: false,
			scroll: false,
			status: 0,
			pages: 1,
			limit: 15,
			page: 0,
			out: 0,
			
			goodsList: [],
			tabIndex: 0,
			navList: [],
			
			obj: [],
			AllList: [],
			
			account:'',
			email:'',
			inputType:1,
			typeList:[
				{
					id:1,
					name:"手机号"
				},
				{
					id:2,
					name:"邮箱号"
				}
			],
			typeName: '手机号',
			showType: false,
			Htitle: '置换中心',
			subtitle: '我的置换',
			url_ri: '/pages/center/my_deal',
			// Hlicon: "../../static/icon/left_whitch.png",
			hstyle: 'background:transparent',
			now_price: '', //本月价格
			order_sum1: '', //昨日成交
			order_sum2: '', //今日成交
			total_sum: '', //  求购总量
			last_price: '', //下月价格
			mywti: '', //可以置换车贝
			// page: 1,
			// pages: 2,
			usermid: uni.getStorageSync('member').mid,
			levelname: uni.getStorageSync('member').levelname,
			service_charge: uni.getStorageSync('member').service_charge,
			// selfaccount:uni.getStorageSync('member').account,
			loadshow: true,
			colorshow: false,
			scrlist: [],
			usdt: '',
			alipay: '',
			// num: '',
			mining_dols: ''
		};
	},
	onLoad(options){
		// #ifdef H5
		this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
		// #endif
	},
	onPageScroll(e){
		//兼容iOS端下拉时顶部漂移
		if(e.scrollTop>=0){
			this.headerPosition = "fixed";
		}else{
			this.headerPosition = "absolute";
		}
	},
	methods: {
		// 时间排序
		timeStart(a,b){  
			return new Date(a.createtime).getTime() - new Date(b.createtime).getTime()
		},
		// 时间倒序
		timeEnd(a,b){  
			return new Date(b.createtime).getTime() - new Date(a.createtime).getTime()
		},
		// 数量排序
		salesStart(a,b){  
			return a.purchase_quantity - b.purchase_quantity
		},
		// 数量倒序
		salesEnd(a,b){  
			return b.purchase_quantity - a.purchase_quantity
		},
		// 价格排序
		priceStart(a,b){
			return a.order_price - b.order_price
		},
		// 价格倒序
		priceEnd(a,b){
			return b.order_price - a.order_price
		},
		
		//筛选点击
		tabClickbox(index,idx){
			
			if(this.filterIndex === index){
			        if(idx == 1){
			                this.synthesis = 0;
			        }else if(idx == 2){
			                this.synthesis = 1;
			        }else{
						 this.synthesis = 2;
					}
			        
			}else{
			        this.filterIndex = index;
			        this.synthesis = 1;
			}
			
			this.filterIndex = index;
			if(index === 2){
				this.priceOrder = !this.priceOrder;
				if(this.priceOrder){
					this.scrlist = [...this.scrlist.sort(this.priceStart)]
				} else {
					this.scrlist = [...this.scrlist.sort(this.priceEnd)]
				}
				
			}else if(index == 1){
				console.log(this.timeOrder)
				this.timeOrder = !this.timeOrder;
				if(this.timeOrder){
					this.scrlist = [...this.scrlist.sort(this.timeStart)]
				} else {
					this.scrlist = [...this.scrlist.sort(this.timeEnd)]
				}
				
			} else {
				this.salesOrder = !this.salesOrder;
				if(this.salesOrder){
					this.scrlist = [...this.scrlist.sort(this.salesStart)]
				} else {
					this.scrlist = [...this.scrlist.sort(this.salesEnd)]
				}
				
			}
			uni.pageScrollTo({
				duration: 300,
				scrollTop: 0
			})
			this.Loadthepage('refresh', 1);
			// uni.showLoading({
			// 	title: '正在加载'
			// })
			// let arrList = res.data.data;
			// arrList.sort(function(a,b){
			//    return  a.number_sales - b.number_sales
			// })
			console.log(this.scrlist)
		},
		
		// selType() {
		// 	this.image = !this.image;
		// 	this.color = !this.color;
		// },
		// 搜索号码
		search(){
			this.loadshow = true;
			this.colorshow = false;
			this.page = 1;
			this.pages = 2;
			this.scrlist = [];
			this.Loadthepage()
		},
	
	
		selType() {
			// 电话号码邮箱号码搜索
			this.showType = !this.showType;
			this.image = !this.image;
			this.color = !this.color;
		},
		// 电话号码邮箱号码搜索
		typess(n , id){
			this.inputType = id;
			this.typeName = n;
			this.typeId = id;
			this.showType=!this.showType;
			if(id == 1){
				this.email = '';
				this.showCity = false;
			}else{
				this.account = '';
				this.showCity = true;
			}
		},
		jum(e) {
			uni.navigateTo({
				url: e
			});
		},
		jump(e, mid) {
			if (mid == this.usermid) {
				//判断是不是本人自卖自买
				this.colorshow = true;
			} else {
				console.log('11111111111111111');
				uni.navigateTo({
					url: e
				});
				this.colorshow = false;
			}
		},
		// 加载数据
		Loadthepage() {
			var self = this;
			if (!self.loadshow) {
				return;
			}
			if (self.page <= self.pages) {
				var page = self.page + 1;
				this.$service.auth(
					this,
					this.$service.api.main.purchasingOrder,
					'GET',
					{
						page: page,
						limit: 15,
						order: 'desc',
						sort: 'time',
						keywords: '',
						account:this.account,
						email:this.email,
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
							self.scrlist.push(v);
						});
						self.$forceUpdate();
						console.log(self.scrlist);
						if (self.pages == self.page || self.scrlist.length == 0) {
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

		lower() {
			this.Loadthepage();
		},
		total(mining_dols) {
			this.$service.auth(
				this,
				this.$service.api.main.purchasingOrder,
				'GET',
				{
					page: 1,
					limit: 15,
					order: 'desc',
					sort: 'time',
					keywords: ''
				},
				function(self, res) {
					// console.log(res)
					var list = res.data.data;

					list.forEach(item => {
						var num = item.order_price;
						item.order_price = num.toFixed(2);
						console.log(item);
					});
					self.scrlist = list;

					self.$forceUpdate();
					// console.log(self.scrlist , "onshow");
				}
			);
		}
	},
	onLoad() {
		this.Loadthepage();
	},
	onShow() {
		this.$service.auth(this, this.$service.api.main.getQuotationData, 'GET', '', function(self, res) {
			// console.log(res);
			self.now_price = res.data.avg_price1;
			self.total_sum = res.data.total_sum;
			self.order_sum1 = res.data.order_sum1;
			self.order_sum2 = res.data.order_sum2;
			self.last_price = res.data.avg_price2;
			self.mywti = res.data.mywti;
			// self.mining_dols = res.data.mining_dols;
			var mining_dols = res.data.mining_dols;
			uni.setStorageSync('tr', mining_dols);

			uni.setStorageSync('data_fo', res.data);
			self.total(res.data.mining_dols);
		});
		// this.Loadthepage();
		// this.loadshow = true;
		// this.Loadthepage();
		// console.log(this.loadshow,'121211221' , this.page , this.pages);
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: transparent;
	padding-top: 0;
}
.header {
	background: #2189ff;
	height: calc(102rpx + var(--status-bar-height));
	position: relative !important;
	/* top: 0; */
	/* left: 0; */
	z-index: 105;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: transparent;
	background: transparent;
}

.top_back {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 496upx;
	z-index: -1;
}
.top_back2 {
	background-color: #f6f3f7;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: -3;
}
.box1 {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}
.box1_it {
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 40upx 0;
}
.it_num {
	font-size: 42upx;
	color: #ffffff;
}
.it_name {
	font-size: 24upx;
	color: #ffffff;
	margin-top: 10upx;
}
.box2 {
	background-color: #ffffff;
	text-align: center;
	width: 96%;
	margin: 0 auto;
	border-radius: 10upx;
	padding: 40upx 20upx;
	/* justify-content: center; */
	box-sizing: border-box;
}
.top_block {
	width: 33.3%;
	color: #666666;
	font-size: 26upx;
	text-align: center;
}
.top_block text:nth-child(1) {
	margin-right: 5upx;
}
.box2_top {
	display: flex;
	/* padding: 30upx; */
	padding-bottom: 30upx;
}
.box2_btn {
	color: #ffffff;
	font-size: 36upx;
	background-color: #1b8fff;
	border-radius: 10upx;
	width: 80%;
	margin: 0 auto;
	padding: 20upx;
}
.box3 {
	background-color: #ffffff;
	height: 100%;
}
.box3_title {
	padding: 20upx;
	font-size: 30upx;
	color: #333333;
	background-color: #ffffff;
	margin-top: 16upx;
}
.scroll_list {
	background-color: #ffffff;
	width: 100%;
	height: 40%;
	/* padding: 0 20upx; */
	box-sizing: border-box;
}
.scr_padd {
	margin-top: 20upx;
	padding: 0 20upx;
}
.scr_it {
	background-color: #f4f7ff;
	border-radius: 5upx;
	display: flex;
	align-items: center;
	margin-bottom: 20upx;
	padding: 20upx;
}
.left_top_text {
	color: #333333;
	font-size: 28upx;
	font-weight: bold;
}
.colf {
	color: #999999;
	font-size: 24upx;
	margin-right: 10upx;
}
.colf2 {
	color: #f38816;
	font-size: 24upx;
}
.iconsss {
	margin-right: 20upx;
	margin-top: 10upx;
	width: 60upx;
	height: 60upx;
}
.scrit_btn {
	color: #ffffff;
	font-size: 30upx;
	background-color: #1b8ffe;
	width: 40%;
	text-align: center;
	padding: 10upx 0;
	border-radius: 10upx;
	margin-top: 20upx;
}
.scrit_left {
	width: 50%;
}
.scrit_right {
	width: 50%;
	text-align: end;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.scrit_left_top {
	display: flex;
	align-items: center;
	text-align: center;
}
.left_top_img {
	display: flex;
	align-items: center;
	margin-right: 10upx;
}
.left_top_img image {
	width: 67upx;
	height: 67upx;
}
.loadclass {
	width: 100%;
	text-align: center;
	font-size: 24upx;
	padding: 10upx;
	/* margin-top: 101upx; */
	box-sizing: border-box;
}
.selfcolor {
	background-color: #999999 !important;
}
.tatel {
	display: flex;
}
.left_mids {
}
.search-box {
	display: flex;
	height: 80upx;
	line-height: 80upx;
	margin: 30upx auto;
	justify-content: center;
	position: relative;
}
.search {
	width: 435upx;
	height: 85upx;
	border: 1px solid #ccc;
	border-radius: 10upx 0 0 10upx;
	display: flex;
	align-items: center;
	line-height: 85upx;
	font-size: 20upx;
	border-right: none;
	box-sizing: border-box;
	
}
.switch {
	/* padding: 5upx; */
	width: 140upx;
	/* display: flex;
			align-items: center; */
}
.switch text {
	color: #333;
}
.search input {
	text-align: left;
	font-size: 20upx;
}
.search-img {
	border: none;
	width: 150upx;
	height: 85upx;
}
.search-img image {
	width: 100%;
	height: 100%;
}
.selph_inputs {
	color: #999999;
	font-size: 20upx;
	/* background-color: #FFFFFF; */
	/* padding: 40upx 30upx; */

	display: flex;
	align-items: center;
	/* justify-content: space-between; */
}
.selp_back {
	background-color: rgba(0, 0, 0, 0.1) !important;
	/* color: #999999!important; */
}
.selph_inputs image {
	width: 40upx;
	height: 40upx;
}
.typeBlock {
	width: 20.5%;
	/* padding: 10upx 20upx; */
	box-sizing: border-box;
	background-color: #ffffff;
	margin: 0 auto;
	box-shadow: 0 0 10upx #999999;
	position: absolute;
	bottom: -175upx;
	left: 50upx;
	z-index: 99;
}
.typeList:nth-of-type(1) {
	border-bottom: 2upx solid #f4f4f4;
}
.typeList {
	/* padding: 20upx 20upx; */
	box-sizing: border-box;
}
.selph_blocks {
	padding: 30upx 0upx 0;
	
}
.typeBox {
}
.BigMask {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 100;
	position: fixed;
	top: -20%;
	left: 0;
}
.withBox {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 9;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #ffffff;
	width: 620upx;
	padding: 70upx 30upx;
}
.BoxBack image {
	width: 142upx;
	height: 180upx;
}
.BoxTitle {
	padding: 40upx 0upx;
	color: #333333;
	font-size: 30upx;
}
.BoxSubmit {
	background-color: #007aff;
	padding: 20upx 200upx;
	color: #ffffff;
	font-size: 30upx;
}
.text-left{
	margin-left: 15upx;
	}
	
	
	
	
	.drop-down {
		position: fixed;
		height: 100upx;
		line-height: 100upx;
		display: flex;
		background-color: #fff;
		/* justify-content: space-around; */
		// position: relative;
		z-index: 200;
	}
	.num {
		width: 250upx;
		font-size: 28upx;
		position: relative;
		left: 80upx;
	}
	.num image {
		width: 25upx;
		height: 25upx;
		margin-left: 10upx;
	}
	.active {
		color: #d81e06;
	}
	.highly {
		height: 120upx;
	}
	
	.comprehensive{
		padding: 30upx 10upx;
		width: 100%;
		position:absolute;
		display: inline-block;
		z-index: 2300;
		top:93upx;
		 background-color: #fff;
		 min-width: 160px;
		 box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		 padding: 12px 16px;
		 transition: all .2s ease-in-out 3s;
	}
	
	.credit{
		height: 60upx;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30upx;
		display: flex;
		justify-content: space-between;
		font-size: 24upx;
	}
	.life {
		margin-left:50upx;
		}
	.tick{
	margin-right: 100upx;
	}
	.navshop{
			// position: fixed;
			// left: 0;
			// top: var(--window-top);
			// margin-top: 20upx;
			display: flex;
			width: 100%;
			height:80upx;
			background: #fff;
			box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
			z-index: 10;
			.nav-item{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color:#999;
				position: relative;
				&.current{
					color: #FF431D;
					&:after{
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 120upx;
						height: 0;
						border-bottom: 4upx solid #FF431D;
					}
				}
			}
			.p-box{
				display: flex;
				flex-direction: column;
				.yticon{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30upx;
					height: 14upx;
					line-height: 1;
					margin-left: 4upx;
					font-size: 26upx;
					color: #888;
					&.active{
						color: #333;
					}
				}
				.xia{
					transform: scaleY(-1);
				}
			}
			.cate-item{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 80upx;
				position: relative;
				font-size: 44upx;
				&:after{
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					border-left: 1px solid #ddd;
					width: 0;
					height: 36upx;
				}
			}
		}
	
	
	
</style>
