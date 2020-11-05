<template>
	<view class="">
		<!-- <view class="header">
			<view class="left_" @click="jump('/pages/index/selInsCom')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
		
			</view>
			<view class="center_title">
				<text>上传资料</text>
			</view>
		</view> -->
		<view class="uploadimg">
		   <view class="uploadimg_it" >    <!-- v-for="(it , i) in uploadimg" :key = "it.id" -->
			<view class="" v-if=" SrcImag1 == '' || SrcImag1 == undefined" @click="upload()">     <!--v-if="" it.operate != true v-else-->
		   	<view class="uploadimg_image" >
		   		<image src="../static/icon/addimg.png"  mode=""></image>
		   	</view>
			<view class="uploadimg_name">
				<text style="color: red;" v-show="must == 1">*</text>
				<text>{{boxname}}</text>
			</view>
		   </view>
		   <view class="uploadimging" v-else >
		   	<image :src="SrcImag1" mode=""></image><!-- it.certi -->
			<view class="close" @click="closeimg()">
				<image src="../static/icon/shut.png" mode=""></image>
			</view>
		   </view>
			</view>
		</view>
		<!-- <view class="userphone">
			<view class="userphone_num">
				
			<text>请输入手机号码：</text>
			</view>
			<input type="text" value=""  />
		</view>
		<view class="btn">
			<view class="btn_submit">
				<text>提交</text>
			</view>
			<view class="btn_stepback">
				<text>返回上一步</text>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default{
		props:{
				SrcImag:{
					type:String
				},
				havetobloon:{
					type:Boolean
				},
				must:{
					// type:Number
				},
				boxname:{
					type:String
				},
				index:{
					type:Number
				}
			},
		data(){
			
			return{
				// uploadimg:[
				// 	{
				// 		id:1,
				// 		name:"上传行驶证正面",
				// 		inport:"*",
				// 		certi:''
				// 	},
				// 	{
				// 		id:2,
				// 		name:"上传行驶证反面",
				// 		inport:"*",
				// 		certi:''
				// 	},
				// 	{
				// 		id:3,
				// 		name:"私家车请上传身份证",
				// 		inport:'',
				// 		certi:''
				// 	},
				// 	{
				// 		id:4,
				// 		name:"公司车请上传营业执照",
				// 		inport:'',
				// 		certi:''
				// 	}
				// ]
				// certificate:[]
				SrcImag1:this.SrcImag
			}
		},
		watch:{
			SrcImag(ne){
				this.SrcImag1 = ne
			}
		},
		methods:{
			// jump(e){
			// 	uni.navigateTo({
			// 		url:e
			// 	});
			// },
			upload(){
				
				this.$emit('upload');
				//  var self = this
				// console.log("13");
				// uni.chooseImage({
				//     count: 6, //默认9
				//     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				//     sourceType: ['album'], //从相册选择
				//     success: function (res) {
				//         console.log(JSON.stringify(res.tempFilePaths));
				// 		console.log(res);
				// 		let  paths = res.tempFilePaths[0];
				// 		self.SrcImag = paths;
				// 		// self.$set(self.uploadimg[i] , 'operate' , true);
				// 		console.log(self.SrcImag)
				//     }
				// });
			},
			closeimg(){
				// var self = this;
				// self.$set(self.uploadimg[i] , 'operate' , false);
				// self.uploadimg[i].certi = '';
				this.$emit('closeimg' , this.SrcImag);
				this.SrcImag1 = '';
				console.log( this.SrcImag , "chilc")
				
			}
		},
		onShow() {
			this.$service.auth(this , this.$service.api.index.diyFields , 'GET' , {type:1} , function(self , res){
				console.log(res);
			})
		}
	}
</script>

<style>
	.header{
		background-color: #2575FE;
	}
	.left_{
		width: 36upx;
		height: 36upx;
	}
	.center_title{
		font-size: 36upx;
		color: #FFFFFF;
		margin-right: 72upx;
		width: 80%;
	}
	
	page{
		background-color: #EFF3F6;
	}
	.content{
		padding-right:24upx;
		padding-left: 24upx;
	}
	.uploadimg{
		
	}
	.uploadimg_it{
		background-color: #FFFFFF;
		text-align: center; 
		vertical-align: middle;
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
	      justify-content: center;
		  align-items: center;
		  width: 100%;
		    height: 421upx;
			margin-top: 20upx;
			color: #999999;
			font-size: 30upx;
		
	}
	.uploadimg_image{
		width: 100%;
		height: 54upx;
		/* text-align: center;
		vertical-align: middle; */
	}
	.uploadimg_image image{
		width: 54upx;
	}
	.uploadimg_name{
		
	}
	.uploadimging{
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: relative;
	}
	.userphone{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: #FFFFFF;
		padding:30upx 30upx;
		border-radius: 10upx;
		margin-top: 20upx;
		color: #999999;
		font-size: 28upx;
	}
	.btn{
		color: #FFFFFF;
		font-size: 36upx;
		text-align: center;
		padding: 0 60upx;
		box-sizing: border-box;
		margin-top:80upx ;
	}
	.btn_submit{
		background-color: #0089E2;
		padding: 20upx 0;
		border-radius: 44upx;
	}
	.btn_stepback{
		background-color: #FA9C22;
		padding: 20upx 0;
		margin-top: 40upx;
		border-radius: 44upx;
	}
	.close{
		position: absolute;
		top: 0;
		left: 0;
		width: 56upx;
		height: 56upx;
	}
</style>
