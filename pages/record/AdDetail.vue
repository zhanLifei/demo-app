<template>
	<view class="content">
		<headers :Htitle="Htitle"  :Hlicon="Hlicon" ></headers>
		<view class="box" v-for="(it , i ) in lists" :key="i" @click="butBuy(it.click_url)">
			<view class="item_top" >
				<view class="left">
					<text>{{it.goods_name}}</text>
				</view>
				<view class="right">
					<text>¥</text>
					<text style="color: red;">{{it.price}}</text>
				</view>
			</view>
			<view class="item_bot" > <!-- @click="butBuy(it.click_url)" -->
				购买
			</view>
		</view>
		<view class="loadclass" v-if="loadshow">
			<text>正在加载</text>
		</view>
		<view class="loadclass" v-else="loadshow">
			<text>数据已加载完毕</text>
		</view>
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue"
	export default{
		components:{
			headers
		},
		data(){
			return{
				Htitle: "京东商城",
				Hlicon: "../../static/icon/left_whitch.png",
				page:0,
				pages:1,
				loadshow:true,
				lists:[]
			}
		},
		methods:{
			 butBuy(e){
				uni.setStorageSync('webUrl', e);
				// setTimeout(() => {
					uni.navigateTo({
						url: "/pages/index/webview"
					});
					// window.location.href = dailyCheckinweb;
				// }, 1500)
			},
			Loadthepage() {
				var self = this;
				if(!self.loadshow){
					return
				}
				if (self.page <= self.pages) {
					var page = self.page + 1;
					self.$service.auth(self , self.$service.api.record.jdList, "GET" , {
						page: page,
						limit: 15
					}, function(self, res) {
						console.log(res , "res")
						self.pages = res.data.last_page;
						self.page = page;
						// self.activity = res.data.activity
						var list = res.data.data;
						list.forEach((v, i) => {
							self.lists.push(v);
						});
						// self.$forceUpdate()
						if (self.pages == self.page || self.lists.length == 0) {
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
			}
		},
		onReachBottom(){
			this.Loadthepage();
			console.log("onReachBottom");
		},
		onShow() {
			this.Loadthepage();
		}
		
	}
</script>

<style>
	page{
		height: auto;
	}
	.content{
		/* background-color: transparent; */
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.box{
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 10upx 0 20upx;
		box-sizing: border-box;
		padding: 30upx 30upx;
	}
	.item_top{
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
	}
	.left{
		width: 71%;
		/* visibility: collapse; */
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		-webkit-line-clamp: 2; */
		
		
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden; 
		text-overflow: ellipsis; 
		display: -webkit-box;
		-webkit-line-clamp: 2; 
		line-clamp: 2; 
		-webkit-box-orient: vertical;
	}
	.right{
		width: 29%;
		text-align: center;
		
	}
	.item_bot{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10upx;
		margin-top: 20upx;
		margin-left: 480upx;
		/* text-align: center; */
		background-color: #2189ff;
		width: 120upx;
		height: 60upx;
		border-radius: 20upx;
		color: #FFFFFF;
		font-size: 39upx;
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
		/* margin-top: 101upx; */
		box-sizing: border-box;
	}
</style>
