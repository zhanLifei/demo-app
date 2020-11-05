<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="nav_box">
			<view :class="['nav_it', {'active':it.id === index }]" v-for="(it , i) in navlist" :key="it.id" @click="selnav(it.id)">
				<text>{{it.title}}</text>
			</view>
		</view>
		<!-- - -->
		<view v-if="index === 1" class="com_box" v-for="(it ,i ) in appoinlist" :key="i">
			<view class="com_top">
				<view class="left_top">
					<image :src="it.user.avatar" mode=""></image>
				</view>
				<view class="left_mid">
					<text>{{it.user.account}}</text>
				</view>
				<view class="right_time">
					<text style="margin-right: 4upx;">预约时间:</text>
					<text>{{it.subscribe_time}}</text>
				</view>
			</view>
			<view class="com_bot">
				<view class="bot_btn1" @click="cancelConsent(it.id , 1)">
					<text>取消</text>
				</view>
				<view class="bot_btn" @click="cancelConsent(it.id , 2)">
					<text>同意</text>
				</view>
			</view>
		</view>
		<!-- - -->
		 <view v-if="index === 2" class="com_box2" v-for="(it ,i ) in appoinlist" :key="it.id">
			<view class="com_left">
				<view class="left_top2">
					<image :src="it.user.avatar" mode=""></image>
				</view>
				<view class="left_mid2">
					<text>{{it.user.account}}</text>
				</view>
				
			</view>
			<view class="com_right">
				<view class="right_text">
					<text v-if="it.status == 2">同意</text>
					<text v-else>取消</text>
				</view>
				<view class="right_time2">
					<text style="margin-right: 4upx;">预约时间:</text>
					<text>{{it.subscribe_time}}</text>
				</view>
			</view>
		</view> 
		
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import service from "../../service.js";
	import headers from "../../components/header_nav.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,
			headers
		},
		data() {
			return {
				Htitle: "预约列表",
				Hlicon: "../../static/icon/left_whitch.png",
				merchid:uni.getStorageSync("merchid"),
				user:uni.getStorageSync("member"),
				index: 1,
				navlist: [{
						id: 1,
						title: "处理中"
					},
					{
						id: 2,
						title: "已处理"
					}
				],
				appoinlist:[],//预约列表
				isLoading:false,
				scroll:false,
				status:0,
				pages:1,
				page:0,
				out:0,
			}
		},
		onShow:function(){
			this.loadHistory();
		},
		onReachBottom() {
			this.loadHistory();
		},
        methods: {
			cancelConsent(id , e){//取消or同意
			var self = this;
			uni.showModal({
			    title: '提示',
			    content: '确认执行此操作吗?',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
						uni.request({
							url:self.$service.api.service.sub_agree,
							method:"POST",
							data:{
								id:id,
								status:e
							},
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							success:(res)=>{
								if(res.data.code == 1){
									uni.showToast({
										title:res.data.info,
										icon:"none"
									});
									self.appoinlist = [];
									self.isLoading = false;
									self.scroll = false;
									self.status = 0;
									self.pages = 1;
									self.page = 0;
									self.loadHistory();
								}else{
									uni.showToast({
										title:res.data.info,
										icon:"none"
									});
								}
							},
							fail: (res) => {
								uni.showToast({
									title:res.data.info,
									icon:"none"
								});
							}
							
						});
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			},
			
			//加载历史数据
			loadHistory(e){
				if(this.isLoading){
					return ;
				}
				if(this.page < this.pages){
					this.out = 0;
					this.isLoading = true;
					this.scroll = false;
					this.status = 1;
					var page = this.page+1;
					service.auth(this, service.api.service.appoinlist, 'GET', {
						'page':page,
						// 'mid':this.user.mid,
						'merch_id':this.merchid,
						'status': this.index
					}, function(self, res) {
						if (res.code == 1) {
							var list = res.data.data;
							for(let i=0;i<list.length;i++){
								//将数据逐条写入数组
								self.appoinlist.push(list[i]);
							}
							self.pages = res.data.page_total;
							self.page = page;
							self.scroll = true;
							self.isLoading = false;
							/* setTimeout(function(){ */
								self.out = 1;
							/* },1000); */
							uni.setStorageSync('tasktime',1);
							if(self.page == self.pages || res.data.total == 0){
								self.status = 2;
							}else{
								self.status = 0;
							}
						}
					});
				}else{
					this.status = 2;
				}
			},
			selnav(e){
				this.appoinlist = [];
				this.isLoading = false;
				this.scroll = false;
				this.status = 0;
				this.pages = 1;
				this.page = 0;
				this.index = e;
				this.loadHistory();
			},
		},
		onShow() {
			this.loadHistory();
		}
	}
</script>

<style>
	.content{
		padding:calc(224rpx + var(--status-bar-height)) 24upx 0;
	}
	.nav_box{
		position: relative;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		left: 0;
		top: calc(102rpx + var(--status-bar-height));
		width: 100%;
		background-color: #FFFFFF;
		/* padding: 30upx 0; */
		color: #333333;
		font-size: 28upx;
	}
	.nav_it{
		border-bottom: 2upx solid #FFFFFF;
		padding: 30upx 0;
		width: 50%;
		box-sizing: border-box;
		text-align: center;
		
	}
	.active{
		border-bottom: 2upx solid #2189FF;
		color: #2189FF;
	}
	.com_box{
		background-color: #FFFFFF;
		margin:20upx auto ;
		padding: 40upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.com_top{
		display: flex;
		align-items: center;
	}
	.left_top{
		width: 15%;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.left_top image{
		width: 60upx;
		height: 60upx;
	}
	.left_mid{
		width: 35%;
		color: #333333;
		font-size: 28upx;
	}
	.right_time{
		width: 50%;
		color: #999999;
		font-size: 22upx;
	}
	.com_bot{
		display: flex;
		align-items: center;
		justify-content:space-around ;
		padding: 20upx 0;
		color: ;
	}
	.bot_btn1{
		color: #FFFFFF;
		font-size: 28upx;
		background-color: #999999;
		border-radius: 28upx;
		padding: 10upx 50upx;
	}
	.bot_btn{
		color: #FFFFFF;
		font-size: 28upx;
		border-radius: 28upx;
		background-color: #2189FF;
		padding: 10upx 50upx;
	}
	.com_box2{
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		margin:20upx auto ;
		padding: 40upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.right_time2{
		color: #999999;
		font-size: 22upx;
	}
	.com_left{
		display: flex;
		width: 50%;
		align-items: center;
	}
	.left_top2{
		margin-right: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.left_top2 image{
		width: 60upx;
		height: 60upx;
	}
	.left_mid2{
		color: #333333;
		font-size: 28upx;
	}
	.com_right{
		text-align: end;
		width: 50%;
	}
	.right_text{
		color: #333333;
		font-size: 28upx;
	}
	
</style>
