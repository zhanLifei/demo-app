<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon"></headers>
		
		<view class="record_box" v-for="(it , i ) in infolis" :key = "i" >
			<view class="record_it1">
				<text class="re_title">申请时间：</text>
				<text style = "color: #999999;font-size: 26upx;">{{it.createtime}}</text>
			</view>
			<view class="record_it" v-for="(it1 , i) in it.field" :key="i">
				<text class="re_title">{{it1.set_name}}</text>
				<text class="re_info" v-if="i < 3">{{it1.data}}</text>
				<text class="re_info" v-if="i == 3"  v-for="(it2 , index) in it1.data" :key="index">{{it2}}</text>
			</view>
			<!-- <view class="record_it">
				<text class="re_title">联系电话</text>
				<text class="re_info">{{it.phone}}</text>
			</view>
			<view class="record_it">
				<text class="re_title">住址</text>
				<text class="re_info">{{it.adr}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	import headers from "@/components/header_nav.vue"
	export default{
		components:{
			headers
		},
		data(){
			return{
				Htitle:"融资贷款申请记录",
				Hlicon:"../../static/icon/left_whitch.png",
				loadshow:true,
				page:0,
				pages:1,
				limit:'',
				infolis:[
					/* {
						id:1,
						time:"2020-3-31 19:19",
						num:"58000",
						phone:"15217543698",
						adr:"广州市天河区中山大道中"
					},
					{
						id:2,
						time:"2020-3-31 19:19",
						num:"58000",
						phone:"15217543698",
						adr:"广州市天河区中山大道中"
					} */
				]
			}
		},
		methods:{
			async LoadPages(){
				if(!this.loadshow){
					return
				}
				if(this.page < this.pages){
					var page = this.page + 1;
				const result =  await this.$service.loadthepage({
					url:this.$service.api.index.loansLog,
					method:"GET",
					data:{page:page , limit:15},
					that:this,
					direct:false
				});
				var res = result.data.data;
				this.pages = res.last_page;
				this.page = page;
				var list = res.data;
				this.infolis = [...this.infolis , ...list];
				console.log(result , res ,this.infolis,"result");
				if(this.page == this.pages || this.infolis.length == 0){
					this.loadshow = false;
				}else{
					this.loadshow =true;
				}
				}else{
					this.loadshow = false;
				}
			}
		},
		onReachBottom() {
			this.LoadPages();
			console.log("onReachBottom");
		},
		onShow() {
			this.LoadPages();
			/* this.$service.auth(this , this.$service.api.index.loansLog , "GET" , '' , function(self , res){
				console.log(res);
			}); */
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: auto;
		background-color: #F4F4F4;
	}
	.content{
		padding-left: 24upx;
		padding-right: 24upx;
	}
	.record_box{
		margin: 30upx auto 0;
		background-color: #FFFFFF;
		padding: 0 30upx 30upx;
		border-radius: 20upx;
	}
	.record_it1{
		width: 100%;
		padding: 30upx 0;
		border-bottom: 2upx solid #EBEBEB;
	}
	.record_it{
		width: 100%;
		padding: 30upx 0;
		display: flex;
		justify-content: space-between;
	}
	.re_title{
		color: #999999;
		font-size: 26upx;
	}
	.re_info{
		color: #333333;
		font-size: 26upx;
		font-weight: bold;
	}
</style>
