<template>
	<view class="content">
		<headers :url_ri="url_ri" :subtitle="subtitle" :Htitle="Htitle" :Hlicon="Hlicon" :url_le="url_left"></headers>
		<view class="top_nav">
			<view :class="['nav_it' , {'nav_action':it.id == navid}] " v-for="(it , i) in  navlist" :key="it.id"  @click="navevent(it.id)">
				<text>{{it.name}}</text>
			</view>
		</view>
		<view class="details">
			<view class="details_it , item1 ">
				<view class="detail_num1">
					<text style=" font-size: 46upx; ">{{datass.total_nums}}</text>
					<text style="font-size: 20upx; ">（笔）</text>
				</view>
				<view class="detail_name">
					<text v-if="navid == 1" style="color: #828282; font-size: 22upx;">交强险总成交数量</text>
					<text v-if="navid == 2" style="color: #828282; font-size: 22upx;">交强险总成交数量</text>
				</view>
			</view>
			
			<view class="details_it , item2 ">
				<view class="detail_num1">
					<text v-if="navid == 1" style=" font-size: 46upx; ">{{datass.help_study}}</text>
					<text v-if="navid == 2" style=" font-size: 46upx; ">{{datass.subvention}}</text>
					<text style="font-size: 20upx; ">（元）</text>
				</view>
				<view class="detail_name">
					<text v-if="navid == 1" style="color: #828282; font-size: 22upx;">捐资助学累计捐赠</text>
					<text v-if="navid == 2" style="color: #828282; font-size: 22upx;">交强险累计补助金</text>
				</view>
			</view>
			
			<view class="details_it , item3 ">
				<view class="detail_num1">
					<text v-if="navid == 1" style=" font-size: 46upx; ">{{datass.insurance_help}}</text>
					<text v-if="navid == 2" style=" font-size: 46upx; ">{{datass.insurance_subvention}}</text>
					<text style="font-size: 20upx; ">（元）</text>
				</view>
				<view class="detail_name">
					<text v-if="navid == 1" style="color: #828282; font-size: 22upx;">交强险累计捐赠</text>
					<text v-if="navid == 2" style="color: #828282; font-size: 22upx;">交通救济金捐赠</text>
				</view>
			</view>
			
			<view class="details_it , item4 ">
				<view class="detail_num1">
					<text style=" font-size: 46upx; ">{{datass.yesterday_nums}}</text>
					<text style="font-size: 20upx; ">（笔）</text>
				</view>
				<view class="detail_name">
					<text v-if="navid == 1" style="color: #828282; font-size: 22upx;">交强险昨日成交数量</text>
					<text v-if="navid == 2" style="color: #828282; font-size: 22upx;">交强险昨日成交数量</text>
				</view>
			</view>
			
			<view class="details_it , item5 ">
				<view class="detail_num1">
					<text style=" font-size: 46upx; ">{{datass.yesterday_subvention}}</text>
					<text style="font-size: 20upx; ">（元）</text>
				</view>
				<view class="detail_name">
					<text v-if="navid == 1" style="color: #828282; font-size: 22upx;">交强险昨日补助金</text>
					<text v-if="navid == 2" style="color: #828282; font-size: 22upx;">交强险昨日补助金</text>
				</view>
			</view>
		</view>
		
		<!-- <scroll-view scroll-y="true" class="scroll_list" @scrolltolower="lower"> -->
			<view>
				<view class="textlist" v-for="(it , i) in textlist" :key = "it.id" @click="jum(it.id,it.type)">
					<view class="textlist_img">
						<image :src="it.thumb" mode=""></image>
					</view>
					<view class="textlist_detail">
						<view class="detail_title">
							<text >{{it.title}}</text>
						</view>
						<view class="detail_cont">
							<div v-html="it.content"></div><!-- <text>{{it.content}}</text> -->
						</view>
						<view class="detail_time">
							<text>{{it.createtime}}</text>
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
		<!-- </scroll-view> -->
		
		

	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import service from "../../service.js";
	export default {
		components: {
			headers
		},
		data() {
			return {
				Htitle: "人人公益",
				Hlicon: "../../static/icon/left_whitch.png",
				subtitle: "申请救济",
				// Hricon:"../../static/icon/left_whitch.png"
				trading: '',//"交强险总成交数量"
				trading_price: '',//"交通救济金捐资"
				yesterday_subsidize: '',//"交强险昨日补助金"
				yesterday_trading: '',//"交强险昨日成交数量"
				subsidize: '',//捐资助学累计捐赠
				url_ri:'/pages/index/pir',
				page:0,
				pages:1,
				showload:true,
				loadshow: false,
				datass:'',
				// page: 0,
				// pages: 1,
				// listsss:[],
				textid: '',//文章id
				url_left:"/pages/main/index",
				navlist: [{
						id: 1,
						name: "捐资助学"
					},
					{
						id: 2,
						name: "交通救济金"
					},
				],
				navid:1,
				detaillist:[
					// {
					// 	id:1,
					// 	nem:256,
					// 	unit:"(笔)",
					// 	name:"交强险总成交数量"
						
					// },
					// {
					// 	id:2,
					// 	nem:2500,
					// 	unit:"(元)",
					// 	name:"交强险总成交数量"
					// },
					// {
					// 	id:3,
					// 	nem:256,
					// 	unit:"(元)",
					// 	name:"交强险总成交数量"
					// },
					// {
					// 	id:4,
					// 	nem:256,
					// 	unit:"(元)",
					// 	name:"交强险总成交数量"
					// },
					// {
					// 	id:5,
					// 	nem:256,
					// 	unit:"(元)",
					// 	name:"交强险总成交数量"
					// }
				],
				textlist:[
					// {
					// 	id:1,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// },
					// {
					// 	id:2,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// },
					// {
					// 	id:3,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// },
					// {
					// 	id:4,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// },
					// {
					// 	id:5,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// },
					// {
					// 	id:6,
					// 	title:"捐资助学文章标题",
					// 	text:"捐资助学文章标题，捐资助学文章标题，捐资助学文章标题",
					// 	time:"2020-03-23"
					// }
				]
			}
		},
		methods:{
			jum(id,type){
				uni.navigateTo({
					url:'/pages/index/article?id='+id+'&&type='+type 
				})
			},
			navevent(e){
				this.navid = e;
				service.auth(this , service.api.index.insurance_details , 'GET' , '' , function(self ,res){
					// console.log(res);
					// self.trading = res.data.list.trading;
					// self.trading_price = res.data.list.trading_price;
					// self.yesterday_subsidize = res.data.list.yesterday_subsidize;
					// self.yesterday_trading = res.data.list.yesterday_trading;
					// self.subsidize = res.data.list.subsidize;
					
				});
				
				service.auth(this , service.api.index.getArticle , 'GET' , {type:e} , function(self , res){
					console.log(res);
					self.textlist = [];
					self.textlist = res.data.list;
					console.log( res.data.list,11)
				});
			},
			lower(){
				// console.log("121")
			},
			
			// loadData() {
			// 	service.loadthepage({
			// 		url: service.api.index.getArticle,
			// 		data: {
			// 			limit: 15,
			// 			page: this.page + 1,
			// 			type:1
			// 		},
			// 		method: 'GET',
			// 		direct: true,
			// 		that: this
			// 	});
			
			// },
			// loadpage(){
			// 	var self = this;
			// 	if(self.showload){
			// 		return
			// 	}
			// 	if(self.page < self.pages){
			// 		var page = self.page + 1;
			// 		service.auth(this , service.api.index.getArticle , 'GET' , {
			// 			type:1
			// 			} , function(self ,res){
			// 			self.page = page;
			// 			var list = res.data.list;
			// 			list.forEach((v , i) =>{
			// 				self.textlist.push(v);
			// 			});
			// 			self.pages = res.data.last_pages;
			// 			if(self.page == self.pages){
			// 				self.showload = false;
			// 				uni.showToast({
			// 					title:'数据正在加载',
			// 					icon:'none'
			// 				});
			// 			}else{
			// 				self.showload = true;
			// 			}
			// 		});
			// 	}else{
			// 		self.showload = false;
			// 		uni.showToast({
			// 			title:'数据已加载完毕',
			// 			icon:'none'
			// 		})
			// 	}
			// }
			
			
		},
		onLoad() {
			service.auth(this , service.api.index.insurance_details , 'GET' , '' , function(self ,res){
				// self.trading = res.data.list.trading;
				// self.trading_price = res.data.list.trading_price;
				// self.yesterday_subsidize = res.data.list.yesterday_subsidize;
				// self.yesterday_trading = res.data.list.yesterday_trading;
				// self.subsidize = res.data.list.subsidize;
				self.datass = res.data;
				// console.log(res,self.datass);
			});
			
			service.auth(this , service.api.index.getArticle , 'GET' , {type:1} , function(self , res){
				// console.log(res);
				self.textlist = res.data.list;
			});
			// this.loadData();
		}
		
	}
</script>

<style>
	.top_nav {
		color: #666666;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 40upx;
		background-color: #FFFFFF
	}

	.nav_it {
		padding: 30upx 0;
	}
	.nav_action{
		color: #2189FF;
		/* font:  #2189FF; */
		border-bottom: 4upx  solid #2189FF;
		box-sizing: content-box;
	}
	.details{
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		margin: 30upx auto;
	}
	.details_it{
		text-align: center;
		width: 33.3%;
		padding: 40upx 12upx;
		box-sizing: border-box;
		
	}
	.detail_num1{
		color:  #FBB35A;
	}
	.item1{
		border-right: 2upx solid #EAEAEA;
		border-bottom: 2upx solid #EAEAEA;
	}
	.item2{
		border-right: 2upx solid #EAEAEA;
		border-bottom: 2upx solid #EAEAEA;
	}
	.item3{
		/* border-right: 2upx solid #EAEAEA; */
		border-bottom: 2upx solid #EAEAEA;
	}
	.item4{
		/* border-right: 2upx solid #EAEAEA; */
		/* border-bottom: 2upx solid #EAEAEA; */
		border-right: 2upx solid #EAEAEA;
	}
	.item5{
		/* border-right: 2upx solid #EAEAEA; */
		/* border-bottom: 2upx solid #EAEAEA; */
		border-right: 2upx solid #EAEAEA;
	}
	.scroll_list{
		margin-top:30upx ;
		background-color: #FFFFFF;
		width: 100%;
		height: 55%;
	}
	.textlist{
		/* margin-top:30upx ; */
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 30upx;
		border-bottom: 2upx solid #F4F4F4;
	}
	.textlist_img{
		width: 202upx;
		height: 152upx;
	}
	.textlist_detail{
		margin-left: 30upx;
		width: 60%;
		height: 152upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.detail_title{
		color: #333333;
		font-size: 28upx;
	}
	.detail_cont{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: 2;
		color: #666666;
		font-size:24upx;
		height: 70upx;
	}
	.detail_time{
		color: #999999;
		font-size: 20upx;
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>
