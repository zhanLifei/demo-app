<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" ></headers>
		<view class="funtion_box" v-for="(it , i) in funlist" :key = "it.id">
				<view class="fun_top">
					<view class="top_text1">
						<text>{{it.coupon.couponname}}</text>
					</view>
					<view class="top_text2">
						<text>
							{{it.coupon.money}}
							<block v-if="it.coupon.type == 1">车贝</block>
							<block v-else>积分</block>
						</text>
					</view>
				</view>
				<view class="radi_box">
					<view class="rad1">
						
					</view>
					<view class="bord">
						
					</view>
					<view class="rad2">
						
					</view>
				</view>
					<view class="fun_bott">
						<text>核销日期：</text>
						<text>{{it.time}}</text>
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
				Htitle: "核销记录",
				Hlicon: "../../static/icon/left_whitch.png",
				merchid:uni.getStorageSync("merchid"),
				funlist:[],//核销记录列表
					/* {
						id:1,
						coupon:{
							couponname:'好吃券',
							money:'32.6',
							type:1,
						},
						time:"2020-05-04 15：30：02"
					} */
				isLoading:false,
				scroll:false,
				status:0,
				pages:1,
				limit:15,
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
					service.auth(this, service.api.service.exchangelist, 'GET', {
						'page':page,
						'merchid':this.merchid,
					}, function(self, res) {
						if (res.code == 1) {
							var list = res.data.data;
							for(let i=0;i<list.length;i++){
								//将数据逐条写入数组
								self.funlist.push(list[i]);
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
							console.log(list)
					});
				}else{
					this.status = 2;
				}
			},
		}
	}
</script>

<style>
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.funtion_box{
		background-color: #FFFFFF;
		margin: 30upx 0;
		border-radius: 6upx;
	}
	.fun_top{
		display: flex;
		padding: 20upx;
	}
	.top_text1{
		color: #0F82F8;
		font-size: 100upx;
		width: 50%;
		text-align: center;
		font-weight: bold;
	}
	.top_text2{
		width: 50%;
		color: #F99727;
		font-size: 32upx;
		text-align: end;
		vertical-align:bottom
	}
	.top_text2 text{
		display: block;
		margin-top: 100upx;
	}
	.fun_bott{
		color: #999999;
		font-size: 24upx;
	}
	.radi_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 0;
	}
	.rad1{
		width: 10upx;
		height: 20upx;
		background-color: #f4f4f4;
		border-radius: 0 10upx 10upx 0;
	}
	.bord{
		border: 2upx solid #f4f4f4;
		width: 92%;
	}
	.rad2{
		background-color: #f4f4f4;
		width: 10upx;
		height: 20upx;
		border-radius: 10upx 0 0 10upx;
	}
	.fun_bott{
		padding: 20upx 20upx;
	}
</style>
