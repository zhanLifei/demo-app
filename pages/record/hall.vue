<template>
	<view class="content">
		<!-- <view class="bg">
			<image src="../../static/image/bg_top.png" mode="widthFix">:subtitle="subtitle":Hlicon="Hlicon"</image>
		</view> :hstyle="hstyle"-->
		<headers :Hlicon="Hlicon"   :Htitle="Htitle" ></headers>
		<hallCity :CityData="CityData" v-if="status == 3"></hallCity>
		<view v-if="status == 1">
		<view class="selph_blocks">
			<view class="typeBox" >
				<view class="selph_text">
				<text>申请类型</text>
			</view>
			<view :class="['selph_inputs',{'selp_back':showType}]" @click="selType">
				<!-- <input v-model="allcity" type="text" value="" placeholder="选择城市" placeholder-class="paclas" /> -->
				<text>{{typeName}}</text>
				<image :src="showType?'../../static/icon/big_sort_up.png':'../../static/icon/big_sort_buttom.png'" mode=""></image>
			</view>
			</view>
			<view class="typeBlock" v-if="showType">
				<view class="typeList" v-for="(it , i) in typeList" :key="i"  @click="typess(it.name , it.id)">
					<text>{{it.name}}</text>
				</view>
			</view>
		</view>
			<view class="selph_block">
				<view class="selph_text">
					<text>申请省份</text>
				</view>
				<view class="selph_input" @click="secity">
					<input v-model="city" type="text" value="" placeholder="选择省份" placeholder-class="paclas" />
				</view>
			</view>
			<view class="selph_block" v-if="showCity">
		 	<view class="selph_text">
		 		<text>申请城市</text>
		 	</view>
		 	<view class="selph_input" @click="secity">
		 		<input v-model="city1" type="text" value="" placeholder="选择城市" placeholder-class="paclas" />
		 	</view>
		 </view>
		 <view class="selph_block">
		 	<view class="selph_text">
		 		<text>联系方式</text>
		 	</view>
		 	<view class="selph_input">
		 		<input type="text" v-model="mobile" maxlength="11" placeholder="输入联系方式" placeholder-class="paclas" />
		 	</view>
		 </view>
		 
		 <view class="mask" v-if="showwind" @click="showwind = false">
		 	<!-- 遮罩层 -->
		 </view>
		 <view :class="['selcitybox' , {'active':showwind}]">
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
		 	<picker-view class="selcityit" v-if="visible" :indicator-style="indicatorstyle" :value="value" @change="bindChange">
		 		<picker-view-column>
		 			<view class="item" v-for="(item,index) in citys" :key="index">{{item.label}}</view>
		 		</picker-view-column>
		 		<picker-view-column>
		 			<view class="item" v-for="(item,index) in citys1" :key="index">{{item.label}}</view>
		 		</picker-view-column>
		 	</picker-view>
		 </view>
		 <btncoms :title="btntitle" @btns="submit" :bitstyle="bitstyle"></btncoms>
		</view>
		
		<view class="BigMask" v-if="status == 2">
			<view class="withBox">
				<view class="BoxBack">
					<image src="../../static/icon/cityMan.png" mode=""></image>
				</view>
				<view class="BoxTitle">
					<text>提交申请发起成功，请等待审核</text>
				</view>
				<view class="BoxSubmit" @click="applySub">
					<text>确定</text>
				</view>
			</view>
		</view>
		 
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import hallCity from "../../components/hallCity.vue";
	import btncoms from "../../components/btncom.vue"
	import cityData from '../../components/citydata.js'
	export default {
		components:{
			headers,hallCity,btncoms
		},
		data() {
			return {
				Htitle: "城市大厅",
				Hlicon: "../../static/icon/left_whitch.png",
				// hstyle:"background:transparent;",
				// Hricon:"../../static/icon/setting_white.png",
				btntitle: "提交申请",
				bitstyle: "margin-top:150upx;",
				// value: cityData,
				visible: true,
				submitBloon:true,//防止用户反复提交
				city: '',
				city1: '',
				allcity: '',//省份
				allcity1:'',//城市
				mobile:'',
				citys: [],
				citys1: [],
				index: '',
				value: [],
				indicatorstyle: "border-top:4upx solid #DADADA;border-bottom:4upx solid #DADADA;height:100upx;text-align:center;",
				showwind: false,
				showType:false,
				showCity:false,
				typeName:'选择申请类型',
				typeId:'',
				CityData:'',//传给组件的数据
				status:uni.getStorageSync('partnerStatus'),
				typeList:[
					{
						id:1,
						name:"省联盟"
					},
					{
						id:2,
						name:"市联盟"
					}
				]
			}
		},
		methods: {
			secity() { //选择城市
			this.allcity = '';
				this.citys = cityData;
				console.log(this.citys);
				this.showwind = !this.showwind;
			
			},
			bindChange: function(e) { //prck-view自带点击事件 e会获得选中数组的下标
				this.index = e.detail.value[0];
				this.index1 = e.detail.value[1];
				this.citys1 = this.citys[this.index].childrens;
				console.log(e, this.index , this.citys1);
				this.city = this.citys[this.index].label;
				this.city1 = this.citys1[this.index1].label;
				console.log(this.city1);
			},
			cancel() { //取消选择城市
				this.showwind = !this.showwind;
			},
			comsel() { //完成选择城市
				console.log(this.allcity , this.allcity1 , 'comsel');
			if(this.city == ''){
				this.city = this.citys[0].label;
				this.citys1 = this.citys[0].childrens;
				this.city1 = this.citys1[0].label
			}else if(this.city1 == ''){
				this.city1 = this.citys1[0].label
			}
				
				console.log(this.allcity,'111');
				this.showwind = !this.showwind;
			},
			
			selType(){
				this.showType=!this.showType;
			},
			
			typess(n , id){
				this.typeName = n;
				this.typeId = id;
				this.showType=!this.showType;
				if(id == 1){
					this.showCity = false;
				}else{
					this.showCity = true;
				}
			},
			
			submit(){
				
				if(this.mobile == ''){
					uni.showToast({
						title:"请输入电话号码!",
						icon:'none'
					});
					return
				}
				if(this.submitBloon){
					if(this.typeId == 1){//申请省联盟合伙人
					if(this.city == ''){
						uni.showToast({
							title:"请选择省份!",
							icon:'none'
						});
						return
					}
					this.$service.auth(this , this.$service.api.record.apply_province_partner , 'POST' , {
						province:this.city,
						// city:this.city,
						mobile:this.mobile
					} , function(self ,res){
						console.log(res,"省份合伙人");
						self.submitBloon = false;
						uni.showToast({
							title:res.info,
							icon:'none'
						});
					});
				}else{//申请城市联盟合伙人
				if(this.city1 == ''){
					uni.showToast({
						title:"请选择城市!",
						icon:'none'
					});
					return
				}
					this.$service.auth(this , this.$service.api.record.apply_city_partner , 'POST' , {
						city:this.city1,
						mobile:this.mobile
					} , function(self ,res){
						console.log(res,"城市合伙人");
						self.submitBloon = false;
						uni.showToast({
							title:res.info,
							icon:'none'
						});
					});
				}
				}else{
					uni.showToast({
						title:"请勿反复提交!",
						icon:'none'
					})
				}
				
			},
			
			applySub(){
				uni.switchTab({
					url:"/pages/main/index"
				})
			}
			
		},
		onShow() {
			/*---获取申请合伙人状态---*/
				uni.request({//获取申请合伙人状态
					url: this.$service.api.record.partner_status,
					method: 'POST',
					header: {
						Authorization: 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						
						var res = res.data;
						this.status = res.status;
						uni.setStorageSync('partnerStatus' , this.status);
						console.log(res.status,"partnerStatus")
						
					}
				});
			/*---获取申请合伙人状态---*/
			
			this.$service.auth(this , this.$service.api.record.my_city , 'POST' , '' , function(self ,res){
				console.log(res,"城市合伙人");
				self.CityData = res.data;
				/* uni.showToast({
					title:res.info,
					icon:'none'
				}); */
			});
		}
		
	}
</script>

<style>
	page{
		background: #F4F4F4 !important;
	}
	.content{
		/* width: 100%;
		min-height: 440rpx;
		background: url(../../static/background/bg_top.png) no-repeat;
		background-size: 100% 440rpx;
		background-position: top;
		background-color: #FFFFFF;
		overflow: auto; */
		/* padding-top: 0; */
	}
	.selph_block {
		padding: 30upx 0upx 0;
	}
	
	.selph_text {
		color: #333333;
		font-size: 26upx;
		padding: 20upx 30upx;
	}
	
	.selph_input {
		color: #999999;
		font-size: 30upx;
		background-color: #FFFFFF;
		padding: 40upx 30upx;
	}
	
	input {
		color: #000000;
		font-size: 30upx;
	}
	
	.paclas {
		color: #999999;
		font-size: 30upx;
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
	.selph_inputs{
		color: #999999 ;
		font-size: 30upx;
		background-color: #FFFFFF;
		padding: 40upx 30upx;
		display: flex;
		justify-content: space-between;
	}
	.selp_back{
		background-color: rgba(0 , 0 , 0 ,0.1) !important;
		/* color: #999999!important; */
	}
	.selph_inputs image{
		width: 40upx;
		height: 40upx;
	}
	.typeBlock{
		width: 90%;
		padding: 10upx 30upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin: 0 auto;
		box-shadow: 0 0 10upx  #999999;
		position: absolute;
		bottom: -204upx;
		left: 40upx;
		z-index: 9;
	}
	.typeList:nth-of-type(1){
		border-bottom: 2upx solid #F4F4F4;
	}
	.typeList{
		padding: 20upx 20upx;
		box-sizing: border-box;
	}
	.selph_blocks{
		padding: 30upx 0upx 0;
		position: relative;
	}
	.typeBox{
		
	}
	.BigMask{
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
	}
	.withBox{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 9;
		top: 50%;
		left: 50%;
		transform: translate(-50% , -50%);
		background-color: #FFFFFF;
		width: 620upx;
		padding: 70upx 30upx;
	}
	.BoxBack image{
		width: 142upx;
		height: 180upx;
	}
	.BoxTitle{
		padding: 40upx 0upx;
		color: #333333;
		font-size: 30upx;
	}
	.BoxSubmit{
		background-color: #007AFF;
		padding: 20upx 200upx;
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
