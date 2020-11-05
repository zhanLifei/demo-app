<template>
	<view class="content">
		<headers :Htitle="Htitle" :Hlicon="Hlicon" :subtitle="subtitle" :hstyle="hstyle" :url_ri="url_ri"></headers>
		<view class="top_back"></view>
		<view class="top_back2"></view>
		<view class="record_box">
			<view class="re_num">
				<text>{{freeze}}</text>
			</view>
			<view class="re_btn">
				<text>冻结积分</text>
			</view>
		</view>
		<view class="integral_title">
			<view class="title_img">
				<image src="../../static/icon/integral.png" mode=""></image>
			</view>
			<text>选择解冻的积分</text>
		</view>
		<view class="inter_box">
			<view class="inter_it" v-for="(it , i) in listsss" :key="it.id">
				<view class="sel_img" @click="sels(it.id , i)">
					<image :src="it.option?'../../static/icon/radio_select.png':'../../static/icon/radio.png'" mode=""></image>
				</view>
				<view class="inter_text">
					<view class="">
						<text style="color: #565454;font-size: 28upx;">{{it.remarks}}</text>
					</view>
					<view class="">
						<text style="color: #B1B1B1;font-size: 24upx;">{{it.createtime}}</text>
					</view>
				</view>
				<view class="inter_num">
					<text style="color: #333333;font-size: 34upx;">{{it.integral}}</text>
				</view>
			</view>
			<view class="loadclass" v-if="loadshow">
				<text>正在加载</text>
			</view>
			<view class="loadclass" v-else>
				<text>数据已加载完毕</text>
			</view>
		</view>

		<view class="notice_box">
			<view class="not_icon">
				<view class="not_img">
					<image src="../../static/icon/notice_icon.png" mode=""></image>
				</view>
				<view class="not_title">
					<text>申请说明</text>
				</view>
			</view>
			<textarea v-model="textnotice" class="noticwirte" value="" placeholder="请填写你的申请说明..." placeholder-class="wirte_notice" />
			</view>
		
		 <btncoms :title="btntitle"  :bitstyle = "btncolor" @btns = "btns"></btncoms>
	</view>
</template>

<script>
	import headers from "@/components/header_nav.vue";
	import btncoms from "../../components/btncom.vue";
	import service from "../../service.js";
	export default {
		components: {
			headers , btncoms
		},
		data() {
			return {
				// bitstyle:"margin-top:50upx;background:#B5D8FF",
				btntitle:"申请",
				Htitle: "申请解冻",
				Hlicon: "../../static/icon/left_whitch.png",
				url_ri:"/pages/index/applyrecord",
				subtitle: "申请记录",
				hstyle: "background: transparent;",
				selearch:'',//选择解冻类型
				textnotice:'',//说明
				loadshow:true,
				page:0,
				pages:1,
				indearry:[],//用于实时更新解冻的列表
				listsss: [],
				idarry:[],
				freeze:'',
				intelist:[
					{
						id:1,
						title:"直推商业保险奖励",
						time:"2020-03-31 19:59",
						num:"+3.00"
					},
					{
						id:2,
						title:"直推商业保险奖励",
						time:"2020-03-31 19:59",
						num:"+3.00"
					},
					{
						id:3,
						title:"直推商业保险奖励",
						time:"2020-03-31 19:59",
						num:"+3.00"
					}
					
				]
			}
		},
		computed:{
			btncolor(){
				if(this.textnotice != '' && this.idarry != ''){
				return  "margin-top:50upx;background:#2189FF";
			}else{
				return  "margin-top:50upx;background:#B5D8FF"
			}
			 
		}
		},
		methods: {
               sels(e,i){
	               this.selearch = e;
					console.log(e);
					var index = this.idarry.indexOf(e)//
					if(index == -1 || index == undefined){ //如果是-1 或 undefined 说明是第一次点击
						this.idarry.push(e);//要传给后台的
						this.indearry.push(i);//用于实时更新解冻的列表
						this.$set(this.listsss[i] , 'option' , true);
					}else{//再次点击
						this.idarry.splice(index , 1);
						this.indearry.splice(index , 1);//用于实时更新解冻的列表
						this.$set(this.listsss[i] , 'option' , false);
					}
					console.log(this.idarry);
					
					
                      },
					  loadData(){
						  console.log("loadData")
					    service.loadthepage({
					  		url:service.api.index.unfreezeList,
					  		data:{
					  			limit:15,
					  			page:this.page + 1,
					  		},
					  		method:'GET',
					  		direct:true,
					  		that:this
					  	});
					  	
					  },
					  btns(){
						  var self = this;
						  console.log(self.idarry);
						  console.log(self.textnotice);
						
						  service.auth(self , service.api.index.unfreezeSubmit , 'POST' , {
							  id: self.idarry,
							  content: self.textnotice
						  } , function(self , res){
							  // self.loadData();
							  self.indearry.forEach((v,i)=>{
							  							  self.listsss.splice(v,1);
							  });
							  self.textnotice = '';
							  service.auth(self, service.api.record.index, 'GET', '', function(_self, res) {
							  	console.log(res);
							  	// self.unfreeze = res.data.unfreeze;
							  	_self.freeze = res.data.freeze;
							  	// self.paid = res.data.paid;
							  });
							  console.log(res);
							  uni.showToast({
							  	title:res.info,
								icon:'none'
							  });
							  setTimeout(()=>{
								  uni.navigateTo({
								  	url:'/pages/record/integral'
								  })
							  },1000);
						  })
					  }
					  
		},
		onShow() {
			// service.auth(this , service.api.index.unfreezeList , 'GET' , '' , function(self , res){
			// 	console.log(res)
			// })
			this.loadData();
			service.auth(this, service.api.record.index, 'GET', '', function(self, res) {
				console.log(res);
				// self.unfreeze = res.data.unfreeze;
				self.freeze = res.data.freeze;
				// self.paid = res.data.paid;
			});
		}
	}
</script>

<style>
	.content {
		padding-left: 24upx;
		padding-right: 24upx;
		background: transparent;
	}

	.top_back {
		position: fixed;
		top: 0;
		left: 0;
		background: linear-gradient(to bottom, #2189FF, #f5f5f5);
		height: 772upx;
		width: 100%;
		z-index: -1;
	}

	.top_back2 {
		position: fixed;
		top: 772upx;
		left: 0;
		background: #EFF3F6;
		height: 100%;
		width: 100%;
		z-index: -1;
	}

	.record_box {
		margin: 30upx auto 0;
		padding: 0 30upx 30upx;
		border-radius: 20upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.re_num {
		color: #FFFFFF;
		font-size: 54upx;
		margin-bottom: 20upx;
	}

	.re_btn {
		color: #FFFFFF;
		font-size: 26upx;
		background-color: #69AFFF;
		width: 180upx;
		padding: 10upx 20upx;
		border-radius: 26upx;
	}
	.integral_title{
		border-radius: 20upx 20upx 0 0;
		background-color: #FFFFFF;
		display: flex;
		color: #3F3F3F;
		font-size: 26upx;
		padding: 30upx ;
		border-bottom: 2upx solid #F5F5F5;
	}
	.title_img{
		width: 30upx;
		/* height: 30upx; */
		margin-right: 10upx;
	}
	.inter_box{
		background-color: #FFFFFF;
		padding: 0upx 30upx 30upx;
		border-radius: 0 0 20upx 20upx;
	}
	.inter_it{
		display: flex;
		/* justify-content: center; */
		align-items: center;
		padding: 30upx  0;
		border-bottom: 2upx solid #F5F5F5;
	}
	.inter_it:nth-last-of-type{
		border: none;
	}
	.sel_img{
		width: 10%;
		text-align: center;
	}
	.sel_img image{
		width: 32upx;
		height: 32upx;
	}
	.inter_text{
		width: 50%;
	}
	.inter_num{
		width: 40%;
		text-align: end;
	}
	.notice_box{
		margin-top: 30upx;
		padding:0 30upx 30upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}
	.not_icon{
		display: flex;
		padding: 30upx ; 
	}
	.not_img{
		width: 36upx;
		height: 40upx;
		margin-right: 10upx;
	}
	.not_title{
		color: #3F3F3F;
		font-size: 26upx;
	}
	.noticwirte{
		height: 134upx;
		padding: 30upx;
		border: 2upx solid #E4E4E4;
		box-sizing: border-box;
		margin: 0 auto ;
		border-radius: 20upx;
		font-size: 24upx;
	}
	.wirte_notice{
		color: #C7C6C6;
		font-size: 24upx;
		
	}
	.loadclass{
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 10upx;
	}
</style>
