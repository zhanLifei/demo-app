<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		<view class="nav_box">
			<view :class="['nav_it', {'active':it.id === index }]" v-for="(it , i) in navlist" :key="it.id" @click="selnav(it.id)">
				<text>{{it.title}}</text>
			</view>
		</view>
		<!-- - -->
		<view class="com_box" v-for="(it ,i ) in comlist" :key="it.id">
			<view class="com_left">
				<view class="left_top">
					<view class="top_title">
						<text>{{it.title}}</text>
					</view>
					<view class="top_num">
						<text>{{it.total_commision}} 张</text>
					</view>
				</view>
				<view class="left_bot">
					<text>{{it.create_time}}</text>
				</view>
			</view>
			<view class="com_right">
				<view class="right_btn" v-if="it.status == 1">
					<text>待审核</text>
				</view>
				
				<view class="right_btn2" v-else-if="it.status == 2">
					<text>已通过</text>
				</view>
				
				<view class="right_btn2" v-else>
					<text>被驳回</text>
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
				Htitle: "佣金审核",
				Hlicon: "../../static/icon/left_whitch.png",
				merchid:uni.getStorageSync("merchid"),
				index:1,
				navlist:[
					{
						id:1,
						title:"审核中"
					},
					{
						id:2,
						title:"已通过"
					}
				],
				comlist:[],//佣金数据列表
					/* {
					title:'申达股份出错',
					total_commision:'43',
					create_time:'2020-10-10 00:00:00',
					status:1,
				} */
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
					service.auth(this, service.api.service.auditcom, 'GET', {
						'page':page,
						'merch_id':this.merchid,
						'status': this.index
					}, function(self, res) {
						if (res.code == 1) {
							var list = res.data.data;
							for(let i=0;i<list.length;i++){
								//将数据逐条写入数组
								self.comlist.push(list[i]);
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
				this.comlist = [];
				this.isLoading = false;
				this.scroll = false;
				this.status = 0;
				this.pages = 1;
				this.page = 0;
				this.index = e;
				this.loadHistory();
			},
			
		}
		
	}
</script>

<style>
	.content{
		padding:calc(224rpx + var(--status-bar-height)) 24upx 0;
	}
	.nav_box{
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
		display: flex;
		align-items: center;
		padding: 40upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.left_top{
		display: flex;
		font-size: 28upx;
		padding-bottom: 10upx;
	}
	.top_title{
		color: #333333;
		margin-right: 20upx;
	}
	.top_num{
		color: #007AFF;
	}
	.com_left{
		width: 60%;
		
	}
	.left_bot{
		color: #999999;
		font-size: 22upx;
	}
	.com_right{
		width:40%;
		font-size: 28upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right_btn{
		background-color: #fbb35a;
		color: #FFFFFF;
		text-align: center;
		padding:10upx 30upx;
		border-radius: 29upx;
	}
	.right_btn2{
		background-color: #007AFF;
		color: #FFFFFF;
		text-align: center;
		padding:10upx 30upx;
		border-radius: 29upx;
	}
</style>
