<template>
	<view class="content">
		<view class="header">
			<view class="left_">
				<image src="../../static/icon/left_whitch.png" mode=""></image>
		
			</view>
			<view class="center_title">
				<text>选择险种</text>
			</view>
		</view>
		
		<view class="inslist">
			<view class="inslist_it" v-for="(it , i ) in inslist" :key = "i" @click="selins(it.id , i)">
				<view class="inslist_selarch" v-if=" it.operate != true">
					<image src="../../static/icon/nopitchon.png" mode=""></image>
				</view>
				<view class="inslist_selarch" v-else >
					<image src="../../static/icon/pitchon.png" mode=""></image>
				</view> 
				<view class="inslist_name">
					<text>{{it.cate_name}}</text>
				</view>
			</view>
		</view>
		<view class="hint">
			<text style="color:#333333; font-size: 22upx;">温馨提示：</text>
			<text>1. 请谨慎核对以上数据并在需要的地方打勾</text>
			<text>2. 2年内的车可以加划痕险</text>
			<text>3. 6年以上的车建议加自燃险</text>
		</view>
		
		<view class="insbtn" @click="submit">
			<text>提交</text>
		</view>
		
		<view class="clause">
			<view class="clause_img" @click="selclause">
				<image :src="clause?'../../static/icon/littlepitchon.png':'../../static/icon/littlenopitchon.png'" mode=""></image>
			</view>
			<view class="clause_cont" @click="disclaimer">
				<text>免责条款</text>
			</view>
		</view>
		<view class="mask" v-if="showDis" @click="mask"></view> <!-- 遮罩层 -->
		<view class="liability" v-if="showDis">
			<rich-text :nodes="context"></rich-text>
		</view>
		
		<view class="BigMask" v-if="InfoStatus">
			<view class="withBox">
				<view class="BoxBack">
					<image :src="mining_public_qrcode" mode="widthFix"></image>
				</view>
				<view class="BoxTitle">
					<text>恭喜您提交成功，请关注公众号并回复购车险<!-- {{info}} --></text>
				</view>
				<view class="BoxSubmit" @click="applySub">
					<text>确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				InfoStatus:false,
				liability:'',
				showDis:false,
				context:'',
				inslist:[
					// {
					// 	id:1,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:2,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:3,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:4,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:5,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:6,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:7,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:8,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:9,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:10,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:11,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:12,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:13,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:14,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// },
					// {
					// 	id:15,
					// 	name:"交强险",
					// 	opartion:false,
					// 	src1:"../../static/icon/nopitchon.png",
					// 	src2:"../../static/icon/pitchon.png"
					// }
				],
				clause:true,
				idarry:[],
				company_id:'',
				fields:[],
				province_id:'',
				city_id:'',
				info:'',
				mining_public_qrcode:''
			}
		},
		methods:{
			disclaimer(){
				this.showDis = !this.showDis
			},
			mask(){
				this.showDis = !this.showDis
			},
			async submit(){
				var self = this
				// uni.showModal({
				// 	title:"提交成功",
				// 	content:"恭喜您提交成功，请注意提醒车主手机短信，及时付款。操作完成后请在个人中心--车险凭证上传凭证提交审核",
				// })
				if(this.idarry == ''){
					uni.showToast({
						title:"请选择保险种类",
						icon:'none'
					});
					return
				}
				
				if(this.clause){
					/* this.$service.auth(this , this.$service.api.index.diyformSubmit , "POST" , {
					fields:this.fields,
					insurance_ids:this.idarry,
					province_id:this.province_id,
					city_id:this.city_id,
					company_id:this.company_id
				} , function(self , res){
					console.log(res)
					uni.showToast({
						title:res.info,
						icon:'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/main/index"
						});
					},2000)
				}) */
				
				    var info = await this.asyncFun()
					 console.log(this.asyncFun(),22222)
					this.InfoStatus = true
					// console.log(this.InfoStatus,55555)
				
				}else{
					uni.showToast({
						title:"请勾选免责条款",
						icon:'none'
					})
				}
				
			},
			
			async asyncFun(){
				var self = this
				try{
					await new Promise((resolve , reject)=>{
					
					uni.request({
						url:self.$service.api.index.diyformSubmit,
						method:'POST',
						data:{
							fields:self.fields,
							insurance_ids:self.idarry,
							province_id:self.province_id,
							city_id:self.city_id,
							company_id:self.company_id
						},
						header: {
							Authorization: 'Bearer ' + uni.getStorageSync('token')
						},
						success: (res) => {
							// console.log(res.data,11111)
							self.info = res.data.info
							console.log(self.info)
							// return res.data.info
							resolve(res.data.info)
							
							
						}
					})
					
					
				})
				}catch(err){
					console.log(err);
				}
				
			},
			
			applySub(){
				uni.switchTab({
					url:"/pages/main/index"
				});
			},
			
			selclause(){
				this.clause = !this.clause
			},
			selins(id , i){
				var index = this.idarry.indexOf(id);
				if(index != -1){
					this.idarry.splice(index , 1);
					this.$set(this.inslist[i] , 'operate' , false);
					console.log(this.idarry , "1111");
				}else{
					this.idarry.push(id);
					this.$set(this.inslist[i] , 'operate' , true);
					console.log(this.idarry , "2222");
				}
				
				
			}
		},
		onLoad() {
			this.company_id = uni.getStorageSync('inscomId');
			var cityArry = uni.getStorageSync('proCityId');
			var updata = uni.getStorageSync('upcardata')  //.uploadimg;
			 // var phonnum = uni.getStorageSync('upcardata').phoneNum;
			this.fields = [...updata];
			this.province_id = cityArry[0];
			this.city_id = cityArry[1];
			console.log(this.fields , this.province_id , this.city_id)
		},
		onShow() {
			this.$service.auth(this , this.$service.api.index.publicqrcode , 'GET' , {} , function(self , res){
				console.log(res.data.mining_public_qrcode)
				self.mining_public_qrcode = res.data.mining_public_qrcode
			});
			this.$service.auth(this , this.$service.api.index.insuranceCate , 'GET' , {company_id:this.company_id} , function(self , res){
				console.log(res)
				self.inslist = res.data;
				self.inslist.forEach((v , i)=>{
					if(v.is_check == 1){
						self.idarry.push(v.id);//获取默认打钩的id
						self.$set(self.inslist[i] , 'operate' , true);//将默认的打钩
					}
				})
			});
			
			this.liability = uni.getStorageSync('liability')
			console.log(this.liability);
			
			var richtext = this.liability[0].content;
			const regex = new RegExp('<img', 'gi');
			const regexP = new RegExp('<p', 'gi');
			const regexspan = new RegExp('<span', 'gi');
			richtext = richtext.replace(regex, `<img style="max-width: 100%;"`);
			richtext = richtext.replace(regexP, `<p style="word-wrap:break-word;word-break:normal;"`);
			richtext = richtext.replace(regexspan,`<span style="word-wrap:break-word;word-break:normal;white-space: pre-wrap;"`);
			this.context = richtext;
			
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
	}
	.inslist_it{
		width:25%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 0;
	}
	.inslist_selarch{
		width: 36upx;
		height: 36upx;
	}
	.inslist_name{
		
	}
	.hint{
		color: #666666;
		font-size: 22upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		box-sizing: border-box;
		padding: 30upx;
	}
	.hint text{
		margin-bottom:20upx;
	}
	.insbtn{
		background-color: #0089E2;
		color: #FFFFFF;
		padding: 20upx;
		text-align: center;
		width: 70%;
		border-radius: 44upx;
		margin: 30upx auto 0 ;
	}
	.clause{
		display: flex;
		/* justify-content: center; */
		align-items: center;
		/* text-align: center; */
		/* vertical-align: middle; */
		box-sizing: border-box;
		padding: 30upx 90upx;
		justify-content: flex-end;
	}
	.clause_img{
		display: flex;
		text-align: center;
		vertical-align: middle;
		width: 30upx;
		height: 30upx;
	}
	.clause_cont{
		font-size: 24upx;
		padding: 10upx 0;
		color: #FA9C22;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.4);
		z-index: 2;
	}
	.liability{
		width: 70%;
		height: 70%;
		background-color: #FFFFFF;
		border-radius: 30upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50% , -50%);
		z-index: 3;
	}
	.BigMask{
		width: 100%;
		height: 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.withBox{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.BoxTitle{
		margin: 20rpx 0;
	}
	.BoxBack, .BoxBack image{
		width: 500rpx;
	}
	.BoxSubmit{
		background-color: #007AFF;
		padding: 20upx 200upx;
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
