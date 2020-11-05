<template>
	<view class="content">
		<view class="header">
			<view class="left_" @click="jump('/pages/main/financial')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
		
			</view>
			<view class="center_title">
				<text>申请贷款</text>
			</view>
		</view>
		
		<view class="inslist">
			<view class="inslist_it" v-for="(it , i ) in inslist" :key = "i" @click="selins(i)">
				<view class="inslist_selarch" >
					<image :src="it.operate == true?'../../static/icon/pitchon.png':'../../static/icon/nopitchon.png'" mode=""></image>
				</view>
				<!-- <view class="inslist_selarch" v-else >
					<image :src="it.src2" mode=""></image>
				</view> -->
				<view class="inslist_name">
					<text>{{it.item}}</text>
				</view>
			</view>
		</view>
		<view class="text_box">
			<view class="text_name">
				<text>贷款金额</text>
			</view>
			<input type="number" v-model="money" placeholder="请输入贷款金额" placeholder-class="inplss" />
		</view>
		<view class="text_box">
			<view class="text_name">
				<text>联系电话</text>
			</view>
			<input type="number" maxlength="11" v-model="phone" placeholder="请输入联系电话" placeholder-class="inplss" />
		</view>
		<view class="text_box">
			<view class="text_name">
				<text>住址</text>
			</view>
			<input type="text" v-model="adress" placeholder="现居住地址" placeholder-class="inplss" />
		</view>
		
		
		<view class="bottom_btn" @click="submit">
			<text>确认申请贷款</text>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				money:'',
				phone:'',
				adress:'',
				inslist:[
					/* {
						id:1,
						name:"交强险",
						opartion:false,
						src1:"../../static/icon/nopitchon.png",
						src2:"../../static/icon/pitchon.png"
					},
					{
						id:2,
						name:"交强险",
						opartion:false,
						src1:"../../static/icon/nopitchon.png",
						src2:"../../static/icon/pitchon.png"
					},
					{
						id:3,
						name:"交强险",
						opartion:false,
						src1:"../../static/icon/nopitchon.png",
						src2:"../../static/icon/pitchon.png"
					},
					{
						id:4,
						name:"交强险",
						opartion:false,
						src1:"../../static/icon/nopitchon.png",
						src2:"../../static/icon/pitchon.png"
					},
					{
						id:5,
						name:"交强险",
						opartion:false,
						src1:"../../static/icon/nopitchon.png",
						src2:"../../static/icon/pitchon.png"
					} */
				],
				is_check:[],
				clause:true
			}
		},
		methods:{
			jump(e){
				uni.switchTab({
					url:e
				})
			},
			selclause(){
				this.clause = !this.clause
			},
			selins(i){
				var unit = this.is_check.indexOf(i);
				if(unit == -1){
					this.is_check.push(i)
				this.$set(this.inslist[i] , 'operate' , true);
				}else{
					this.is_check.splice(unit , 1);
					this.$set(this.inslist[i] , 'operate' , false);
				}
				console.log(this.is_check)
			},
			
			submit(){
				this.$service.auth(this , this.$service.api.center.loans , "POST" , {
					fields:[this.money , this.phone , this.adress , this.is_check]
				} , function(self , res){
					console.log(res);
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/main/financial'
						});
					},1500);
				});
			}
		},
		onShow() {
			this.$service.auth(this , this.$service.api.center.diyFields , "GET" , {type:5} , function(self , res){
				console.log(res);
				self.inslist = res.data[3].desc;
				self.inslist.forEach((v , i)=>{
					if(v.is_check == 1){
					self.is_check.push(i)
					self.$set(self.inslist[i], 'operate' , true);
					}
				});
					console.log(self.is_check,"is_check");
				console.log(self.inslist,"inslist");
			});
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
	/* .content{
		padding-right:24upx;
		padding-left: 24upx;
	} */
	.inslist{
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		/* justify-content: center; */
		align-items: center;
		color: #333333;
		font-size: 30upx;
		font-weight: bold;
		padding: 30upx 0;
		margin: 20upx 0;
	}
	.inslist_it{
		/* width:25%; */
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
		margin: auto 56upx;
	}
	.inslist_selarch{
		width: 36upx;
		height: 36upx;
	}
	
	.text_box {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 30upx;
		border-bottom: 2upx solid #F2F2F2;
	}
	
	.text_name {
		color: #333333;
		font-size: 30upx;
		width: 30%;
	}
	
	.inplss {
		color: #C3C3C3;
		font-size: 30upx;
	}
	
	.text_box input {
		width: 70%;
	}
	
	.bottom_btn {
		color: #FFFFFF;
		background-color: #0089E2;
		font-size: 36upx;
		width: 60%;
		text-align: center;
		padding: 20upx 70upx;
		border-radius: 44upx;
		margin: 30upx auto 0;
	}
</style>
