<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" ></headers>
		<view class="back_blue"></view>
		<view class="back_blue22"></view>
		<view class="top_box">
			 <!-- <view class="box_img">
				<image src="../../static/icon/honordefail.png" mode=""></image>
			</view> -->
			<view class="box_text">
				<text>{{stockss}}</text>
				<!-- <text style="font-size: 26upx;">个</text> -->
			</view>
			<view class="box_bottext">
				<text>累积股权数量</text>
			</view>
		</view>
		
		<!-- <view class="defail_box"> -->
			<view class="defail_title">
				<text>明细</text>
			</view>
		<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll_list">
			<view class="scr_box">
				<view class="defail_it" v-for="(it , i) in scrlist" :key="it.id">
					<view class="it_left">
						<view class="left_name">
							<text style="color: #333333;font-size: 26upx;font-weight: bold;">兑换股权</text>
						</view>
						<view class="left_time">
							<text style="color:#999999;font-size: 22upx;">{{it.create_time}}</text>
						</view>
					</view>
					<view class="defail_right">
						<!-- <text>+</text> -->
						<text>{{it.stock}}</text>
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
		<!-- </view> -->
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import service from "../../service.js";
	export default{
		components:{
			headers
		},
		data(){
			return{
				Htitle: "兑换明细",
				Hlicon: "../../static/icon/left_whitch.png",
				page: 0,
				pages: 1,
				loadshow:true,
				stockss:'',
				scrlist:[
					// {
					// 	id:1,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// },
					// {
					// 	id:2,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// },
					// {
					// 	id:3,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// },
					// {
					// 	id:4,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// },
					// {
					// 	id:5,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// },
					// {
					// 	id:6,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// },
					// {
					// 	id:7,
					// 	name:"二级地主车贝产出",
					// 	time:"2020-3-31 19:19",
					// 	nums:"0.26"
					// }
				]
			}
		},
		methods:{
			Loadthepage() {
				var self = this;
				if(!self.loadshow){
					return
				}
				if (self.page < self.pages) {
					var page = self.page + 1;
					service.auth(self, service.api.record.stock_log, "POST", {
						page: page,
						limit: 15
					}, function(self, res) {
						console.log(res)
						self.pages = res.data.page_total;
						self.page = page;
						// self.glory = res.data.glory;
						var list = res.data.data;
						list.forEach((v, i) => {
							self.scrlist.push(v);
						});
						if (self.pages == self.page || self.scrlist.length == 0) {
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
			service.auth(this, service.api.record.stock_total, "POST", '' , function(self, res) {
				self.stockss = res.stock_total;
				console.log(self.stockss )
			});
		}
	}
</script>

<style>
	.content{
		background-color: transparent;
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.back_blue{
		width:100%;
		height: 250upx;
		background-color: #2189ff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.back_blue22{
		width:100%;
		height: 100%;
		background-color: #F4F4F4;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -3;
	}
	.top_box{
		margin-top: 30upx;
		background-color: #FFFFFF;
		width:100%;
		text-align: center;
		box-sizing: border-box;
		padding: 30upx 0;
		border-radius: 20upx;
	}
	.box_img{
		padding: 10upx;
	}
	.box_img image{
		width: 87upx;
		height: 123upx;
	}
	.box_text{
		padding: 20upx;
		color: #FA9C22;
		font-size: 54upx;
		font-weight: bold;
	}
	.box_bottext{
		color:#999999;
		font-size: 28upx;
	}
	.defail_box{
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin-top: 30upx;
	}
	.defail_title{
		margin-top: 30upx;
		border-radius:20upx 20upx 0 0;
		padding: 30upx;
		color: #080808;
		font-size: 34upx;
		font-weight:bold ;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.scr_box{
		padding: 0 50upx;
	}
	.scroll_list{
		background-color: #FFFFFF;
		border-radius:0 0 20upx 20upx;
		
		
		box-sizing: border-box;
		height: 57%;
	}
	.defail_it{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx 0;
		border-bottom: 2upx solid #F4F4F4;
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
	}
</style>
