<template>
	<view class="content">
		<headers :Hlicon="Hlicon" :Htitle="Htitle" :url_le="url_le"></headers>
		<!-- <view class="selph_block">
			<view class="selph_text">
				<text>申请城市</text>
			</view>
			<view class="selph_input" @click="secity">
				<input v-model="allcity" type="text" value="" placeholder="选择城市" placeholder-class="paclas" />
			</view>
		</view> -->
		<!-- <view class="selph_block">
			<view class="selph_text">
				<text>联系方式</text>
			</view>
			<view class="selph_input">
				<input type="text" value="" placeholder="输入联系方式" placeholder-class="paclas" />
			</view>
		</view> -->

		<!-- <view class="mask" v-if="showwind" @click="showwind = false">
			 遮罩层
		</view> -->
		<view :class="['selcitybox' , {'active':showwind}]">
			<view class="pick_header">
				<view class="pick_left" @click="cancel">
					<text>取消</text>
				</view>
				<view class="pick_midd">
					<text>选择购买车险省市</text>
				</view>
				<view class="pick_right" @click="comsel">
					<text>完成</text>
				</view>
			</view>
			<picker-view class="selcityit" v-if="visible" :indicator-style="indicatorstyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in citys" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in citys1" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- <btncoms :title="btntitle" :bitstyle="bitstyle"></btncoms> -->
	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue"
	import btncoms from "../../components/btncom.vue"
	import cityData from '../../components/citydata.js'
	export default {
		components: {
			headers,
			btncoms
		},
		data: function() {
			return {
				Htitle: "选择城市",
				Hlicon: "../../static/icon/left_whitch.png",
				btntitle: "提交申请",
				bitstyle: "margin-top:150upx;",
				url_le:'/pages/main/index',
				// value: cityData,
				visible: true,
				city: '',
				city1: '',
				allcity: '',
				parent_id:'',
				city_id:'',
				citys: [],
				citys1: [],
				index: '',
				value: [],
				indicatorstyle: "border-top:4upx solid #DADADA;border-bottom:4upx solid #DADADA;height:100upx;text-align:center;",
				showwind: false
			}
		},
		// computed: {
		// 	ontime() {
		// 		var self = this;
		// 		self.allcity = self.city + ' ' + self.city1;
		// 		return self.allcity;
		// 	}
		// },
		methods: {
			// secity() { //选择城市
			// this.allcity = '';
			// 	this.citys = cityData;
			// 	console.log(this.citys);
			// 	this.showwind = !this.showwind;

			// },
			bindChange: function(e) { //prck-view自带点击事件 e会获得选中数组的下标
				this.index = e.detail.value[0]; //被选中省的下标
				this.index1 = e.detail.value[1];//被选中市的下标
				// if(this.index == ''){
				// 	this.index = 0;
				// }
				var  parent_id = this.citys[this.index].id;
				this.parent_id = parent_id;
				
				 if(this.index1 == '' || this.index1 == undefined){
					this.$service.auth(this , this.$service.api.index.provinceCity , 'GET' , {
					parent_id:parent_id
				} , function(self , res){
					console.log(res)
					self.citys1 = res.data
					console.log(self.citys1,"citys1");
				});
				 }else{
					this.city_id = this.citys1[this.index1].id
				 }
				
				// if(this.index1 == ''){
				// 	this.index1 = 0;
				// }
				
				console.log(e, this.index);
				// this.city = this.citys[this.index].label;
				// this.city1 = this.citys1[this.index1].label;
				console.log('123');
				
			},
			cancel() { //取消选择城市
				this.city_id = '';
				this.parent_id = '';
			},
			comsel() { //完成选择城市
				 if(this.parent_id == ''){
			 	this.parent_id = this.citys[0].id;
				 	this.$service.auth(this , this.$service.api.index.provinceCity , 'GET' , {
						parent_id:this.parent_id
				 	} , function(self , res){
				 		console.log(res)
				 		self.citys1 = res.data
				 	 self.city_id = self.citys1[0].id;
				 		console.log(self.citys1);
				 	});
				 }
				 if(this.city_id == ''){
				 	this.city_id = this.citys1[0].id;
				 }
				 this.$service.auth(this , this.$service.api.index.insuranceCompany , 'GET' ,  {
					 province_id:this.parent_id,
					 city_id:this.city_id
				 } , function(self , res){
					 console.log(res);
					 uni.setStorageSync('inscompanys' , res);//可以在下一个页面拿数据
					 uni.setStorageSync('proCityId' , [self.parent_id , self.city_id]);//可以在下一个页面拿数据
					 
					 uni.showToast({
					 	title:res.info,
						icon:'none'
					 });
					 setTimeout(()=>{
						  uni.navigateTo({
					 	url:'/pages/index/selInsCom'
					 })
					 },1500);
					
				 })
				console.log(this.parent_id, this.city_id );
				
			}
		},
		// onLoad() {
		// },
		onShow() {
			this.$service.auth(this , this.$service.api.index.provinceCity , 'GET' , {
				level:1
			} , function(self , res){
				console.log(res)
				self.citys = res.data
				// self.parent_id = self.citys[0].id;
				// self.$service.auth(self , self.$service.api.index.provinceCity , 'GET' , {
				// 	parent_id:parent_id
				// } , function(self , res){
				// 	console.log(res)
				// 	self.citys1 = res.data
				// });
				// 	self.city_id = self.citys1[0].id;
				
			});
			console.log(this.parent_id, this.city_id )
		},
		// onLaunch(){
		// 	if(this.parent_id == ''){
		// 	this.parent_id = this.citys[0].id;
		// 	 	this.$service.auth(this , this.$service.api.index.provinceCity , 'GET' , {
		// 			parent_id:this.parent_id
		// 	 	} , function(self , res){
		// 	 		console.log(res)
		// 	 		self.citys1 = res.data
		// 	 		console.log(self.citys1);
		// 	 	});
		// 	 	 this.city_id = this.citys1[0].id;
		// 	 }
		// 	 if(this.city_id == ''){
		// 	 	this.city_id = this.citys1[0].id;
		// 	 }
		// 	console.log(this.parent_id, this.city_id )
		// }
		
	}
</script>

<style>
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
		/* position: fixed;
		bottom: 0;
		left: 0; */
		border-radius: 35upx 35upx 0 0;
		/* transform: translateY(100%); */
		/* transition: 0.6s; */
		/* z-index: 3; */
	}

	.active {
		/* transform: translateY(0); */
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
</style>
