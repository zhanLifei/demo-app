<template>
	<view class="content">
		<view :class="[status != 2?'header1':'header']">
			<view class="left_" @click="jump('/pages/main/my')">
				<image src="../../static/icon/left_whitch.png" mode=""></image>

			</view>
			<view class="center_title">
				<text>车主认证</text>
			</view>
		</view>
		<view class="backBox" v-if="status == 0">
			<view class="xxxxx">
				<image src="../../static/background/review.png" mode=""></image>
				<view class="ssssss">
					审核中，请耐心等待
				</view>
			</view>
		</view>
		<view class="backBox" v-if="status == 1">
			<view class="xxxxx">
				<image src="../../static/background/passed.png" mode=""></image>
				<view class="ssssss">
					已通过
				</view>
			</view>
		</view>
		<view class="" v-if="status == 2">
			<view class="top_back"></view>
			<view class="top_back2"></view>
			<view class="top_notice">
				<text>您好，请您和您的推荐人一起认证注册，请认真对待上传的资料，如有虚假证件，一旦抽查到,会冻结您和您的推荐人帐号,谢谢理解！</text>
			</view>
			<view class="input_box">
				<view class="input_block">
					<view class="inps_title">
						<text>车主姓名</text>
					</view>
					<input class="inps" type="text" v-model="realname" placeholder="请输入车主姓名" placeholder-class="placehss" />
				</view>
				<view class="input_block">
					<view class="inps_title">
						<text>联系电话</text>
					</view>
					<input class="inps" maxlength="11" type="text" v-model="mobile" placeholder="请输入联系电话" placeholder-class="placehss" />
				</view>
				<view class="input_block">
					<view class="inps_title">
						<text>购买车险金额</text>
					</view>
					<input class="inps" type="number" v-model="insurance" placeholder="请输入购买车险金额" placeholder-class="placehss" />
				</view>
				<view class="input_block">
					<view class="inps_title">
						<text>购买车险时间</text>
					</view>
					<!-- <input class="inps" type="text" v-model="insuranceTime" placeholder="请输入购买车险时间"  placeholder-class="placehss" /> -->
					<picker class="picker_style" @tap='pickerTap' mode="multiSelector" @change="bindStartMultiPickerChange"
					 @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">{{insuranceTime}}</picker>
				</view>

			</view>

			<view class="upload_box">
				<view class="upload1">
					<view class="up_title">
						<text>上传行驶证照片</text>
					</view>
					<view class="idcard_img">
						<view class="idcard_frrev">
							<view class="idcard" v-if="frontimg == ''" @click="uploadfron(frontimg , 1)">
								<image src="../../static/icon/IDcardfront.png" mode=""></image>
								<text>行驶证正面</text>
							</view>
							<block class="uplodimg" v-else>
								<view class="idcards">
									<image :src="frontimg" mode=""></image>
								</view>
								<view class="close" @click="close(frontimg , 1)">
									<image src="../../static/icon/closeimg.png" mode=""></image>
								</view>
							</block>
						</view>
						<view class="idcard_frrev">
							<view class="idcard" v-if="reverimg == ''" @click="uploadrever(reverimg , 2)">
								<image src="../../static/icon/IDcardfront.png" mode=""></image>
								<text>行驶证反面</text>
							</view>
							<block class="uplodimg" v-else>
								<view class="idcards">
									<image :src="reverimg" mode=""></image>
								</view>
								<view class="close" @click="close(reverimg , 2)">
									<image src="../../static/icon/closeimg.png" mode=""></image>
								</view>
							</block>
						</view>

					</view>
				</view>

			</view>
			<btncoms :title="btntitle" :bitstyle="bitstyle" @btns="btns"></btncoms>
		</view>
		<!-- <view class="" v-else></view> -->
	</view>
</template>

<script>
	import btncoms from "../../components/btncom.vue";
	import service from "../../service.js";
	export default {
		components: {
			btncoms
		},
		data() {
			return {
				// Htitle:"申请救济",
				// Hlicon:"../../static/icon/left_whitch.png",
				bitstyle: "margin-top:50upx",
				btntitle: "提交车主认证",
				bitcolor: "",
				clause: true,
				realname: '',
				mobile: '',
				insurance: '',
				insuranceTime: '请选择购买车险时间',
				frontimg: '',
				reverimg: '',
				status: uni.getStorageSync('carAuth'),
				multiArray: [],
				multiIndex: [],
				SelYear:'',
				SelMouth:'',
				SelDate:'',
				timeout:null
			}
		},
		methods: {
			jump(url) {
				uni.switchTab({
					url: url
				})
			},
			btns() {
				if(this.realname == ''){
					uni.showToast({
						title:"输入车主姓名",
						icon:'none'
					});
					return
				}
				if(this.mobile == ''){
					uni.showToast({
						title:"输入联系电话",
						icon:'none'
					});
					return
				}
				if(this.insurance == ''){
					uni.showToast({
						title:"输入车险金额",
						icon:'none'
					});
					return
				}
				if(this.frontimg == '' || this.reverimg == ''){
					uni.showToast({
						title:"请上传证件",
						icon:'none'
					});
					return
				}
				if(this.insuranceTime == '请选择购买车险时间' ){
					uni.showToast({
						title:"请选择时间",
						icon:'none'
					});
					return
				}
				
				
				
				if(this.timeout !== null) clearTimeout(this.timeout);
					this.timeout = setTimeout(()=>{
						console.log("123")
						uni.request({
								url:service.api.index.carRealname,
								method:"POST",
								header: {
									Authorization: 'Bearer ' + uni.getStorageSync('token')
								},
								data:{
								realname: this.realname,
								mobile: this.mobile,
								insurance: this.insurance,
								insuranceTime: this.insuranceTime,
								drivingImg: this.frontimg,
								driving_back_img: this.reverimg
							},
							success: (res) => {
								if(res.data.code == 1){
									uni.showToast({
									title:res.data.info,
									icon:'none'
								});
								// setTimeout(()=>{
									this.status = 0;
								// },1000);
								}else{
									uni.showToast({
										title:res.data.info,
										icon:'none'
									});
								}
								
							},
							fail: (res) => {
								uni.showToast({
									title:res.data.data.info,
									icon:'none'
								})
							}
							});
					} , 1000);
				
				/* service.auth(this, service.api.index.carRealname, 'POST', { 
					realname: this.realname,
					mobile: this.mobile,
					insurance: this.insurance,
					insuranceTime: this.insuranceTime,
					drivingImg: this.frontimg,
					driving_back_img: this.reverimg
				}, function(self, res) {
					uni.showToast({
						title: res.info,
						icon: 'none'
					});
					setTimeout(() => {
						self.status = 0;
					}, 1000);
				}); */
				
				
			},
			uploadfron() { //驾驶证正面
				var self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								console.log(JSON.parse(res.data), "asfasdf");
								const path = JSON.parse(res.data); //打印出来就知道为什么要用JSON.parse
								self.frontimg = path.data.url;
								console.log(self.frontimg, "asdfasdfa");
								uni.showToast({
									title: path.info,
									icon: 'none'
								});
							}
						});
					}
				});
			},
			uploadrever() { //驾驶证反面
				var self = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: service.api.user.updateIdImage, //仅为示例，非真实的接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								console.log(JSON.parse(res.data), "asfasdf");
								const path = JSON.parse(res.data); //打印出来就知道为什么要用JSON.parse
								self.reverimg = path.data.url;
								console.log(self.reverimg, "asdfasdfa");
								uni.showToast({
									title: path.info,
									icon: 'none'
								});
							}
						});
					}
				});
			},
			close(e, s) {
				console.log(e)
				var self = this;
				service.auth(self, service.api.user.deleteImg, "POST", {
					path: e
				}, function(_self, res) {
					if (s === 1) {
						_self.frontimg = '';
					} else if (s === 2) {
						_self.reverimg = '';
					}
					console.log(res);
					uni.showToast({
						title: res.info,
						icon: 'none'
					})
				});
			},

			/*--------时间选择器--------*/
			pickerTap() {

				var date = new Date();
				var currentYear = date.getFullYear();
				var currentMouth = date.getMonth() + 1;
				var currentDate = date.getDate();
				var arrYear = [];
				var arrMouth = [];
				var arrDate = [];
				console.log(currentMouth, currentDate)
				for (let i = 30; 0 < i && i < 31; i--) {
					arrYear.push(currentYear);
					currentYear--;
				}

				for (let i = currentMouth; 0 < i && i <= currentMouth; i--) {
					if (currentMouth < 10) {
						arrMouth.push("0" + currentMouth);

					} else {
						arrMouth.push(currentMouth);
					}
					currentMouth--
				}

				for (let i = currentDate; 0 < i && i <= currentDate; i--) {
					if (currentDate < 10) {
						arrDate.push("0" + currentDate);

					} else {
						arrDate.push(currentDate);
					}
					currentDate--
				}
				// arrYear.unshift(currYear);
				this.multiArray[0] = arrYear;
				this.multiArray[1] = arrMouth;
				this.multiArray[2] = arrDate;
				console.log(arrYear, arrMouth);
				this.$forceUpdate();
			},
			bindMultiPickerColumnChange(e) { //列滚动触发,可以知道是哪列滚动了
				var date = new Date();
				var currentYear = date.getFullYear();
				var currentMouth = date.getMonth() + 1;
				var currentDate = date.getDate();
				var arrYear = [];
				var arrMouth = [];
				var arrDate = [];
				console.log(e, "bindMulit");
				this.multiIndex[e.detail.column] = e.detail.value;
				if (e.detail.column == 0) {//滚动第一列
						this.SelYear = this.multiArray[0][e.detail.value];
						this.SelMouth = this.multiArray[1][0];
					if (e.detail.value == 0) {//当前年份
							this.loadCurrDate(arrMouth , arrDate);
					} else {
							this.loadDate(arrMouth , arrDate);
					}
					this.multiIndex[1] = 0;
					this.multiIndex[2] = 0;
				}else if(e.detail.column == 1){//滚动第二列
					this.SelMouth = this.multiArray[1][e.detail.value];
					if(this.multiIndex[0] === 0 || this.multiIndex[0] == undefined){//第一列是当前年份
					this.SelYear = this.multiArray[0][0];
					console.log(this.multiIndex[0],"afasdfasdfdasfasfa");
						if(e.detail.value == 0){
							this.loadCurrArr(arrMouth,arrDate);
						}else{
							// this.loadDate(arrMouth , arrDate);
							this.loadGetDate(arrMouth,arrDate);
						}
							this.multiIndex[2] = 0;
					}else{
						this.loadDate(arrMouth , arrDate);
					}
					this.multiIndex[2] = 0;
				}else{
					if(this.multiIndex[0] === 0 || this.multiIndex[0] == undefined){
						if(this.multiIndex[1] === 0 || this.multiIndex[1] == undefined){
						this.loadCurrDate(arrMouth , arrDate);
						}else{
							this.loadGetDate(arrMouth,arrDate);
						}
					}else{
						this.loadDate(arrMouth , arrDate);
					}
				}
				this.multiArray[1] = arrMouth;
				this.multiArray[2] = arrDate;
				this.$forceUpdate();
			},
			bindStartMultiPickerChange(e) { //点击确定时触发,可以获得选择的项
				console.log(e, "bindStar")
				var valueArray = e.detail.value;
				var valueNum0 = valueArray[0];
				var valueNum1 = valueArray[1];
				var valueNum2 = valueArray[2];
				if (valueArray.length == 0) { //用户三列都没有选
					this.insuranceTime = this.multiArray[0][0] + "-" + this.multiArray[1][0] + "-" + this.multiArray[2][0];
					console.log(this.insuranceTime,"this.insuranceTime");
				} else if (valueArray.length == 1) { //用户只选择了第一列
					
					this.insuranceTime = this.multiArray[0][valueNum0] + "-" + this.multiArray[1][0] + "-" + this.multiArray[2][0];
					console.log(this.insuranceTime, "11111111111111111");
					
				} else if (valueArray.length == 2) { //用户选择了前两列
				
					if (valueNum0 == 0 || valueNum0 == undefined) {
						this.insuranceTime = this.multiArray[0][0] + "-" + this.multiArray[1][valueNum1] + "-" + this.multiArray[2][0];
						console.log(this.insuranceTime, "11111111111111111");
					}  else {
						this.insuranceTime = this.multiArray[0][valueNum0] + "-" + this.multiArray[1][valueNum1] + "-" + this.multiArray[2][0];
						console.log(this.insuranceTime, "11111111111111111");
					}
				}else if(valueArray.length == 3){
					if (valueNum0 == 0 || valueNum0 == undefined) {
						if(valueNum1 == undefined){
						this.insuranceTime = this.multiArray[0][0] + "-" + this.multiArray[1][0] + "-" + this.multiArray[2][valueNum2];
						console.log(this.insuranceTime, "11111111111111111");
						}else{
							this.insuranceTime = this.multiArray[0][0] + "-" + this.multiArray[1][valueNum1] + "-" + this.multiArray[2][valueNum2];
							console.log(this.insuranceTime, "11111111111111111");
						}
						
					}  else if(valueNum1 == undefined){
						this.insuranceTime = this.multiArray[0][valueNum0] + "-" + this.multiArray[1][0] + "-" + this.multiArray[2][valueNum2];
						console.log(this.insuranceTime, "11111111111111111");
					}else{
					this.insuranceTime = this.multiArray[0][valueNum0] + "-" + this.multiArray[1][valueNum1] + "-" + this.multiArray[2][valueNum2];
					console.log(this.insuranceTime, "11111111111111111");
					}
				}
				this.$forceUpdate();
			},
			loadCurrDate(arrMouth, arrDate) {
				var date = new Date();
				var currentYear = date.getFullYear();
				var currentMouth = date.getMonth() + 1;
				var currentDate = date.getDate();
				for(let i = currentMouth ; i > 0 && i <= currentMouth ; i--){
					if (currentMouth < 10) {
						arrMouth.push("0" + currentMouth);
					
					} else {
						arrMouth.push(currentMouth);
					}
					currentMouth--
				}
				
				for (let i = currentDate; 0 < i && i <= currentDate; i--) {
					if (currentDate < 10) {
						arrDate.push("0" + currentDate);
				
					} else {
						arrDate.push(currentDate);
					}
					currentDate--
				}
			},
			loadDate(arrMouth, arrDate) {
				var that = this;
				var date = new Date();
				var currentYear = date.getFullYear();
				var currentMouth = date.getMonth() + 1;
				var currentDate = date.getDate();
				for(let i = 12 ; i > 0 && i <= 12 ; i--){
					if (i < 10) {
						arrMouth.push("0" + i);
					
					} else {
						arrMouth.push(i);
					}
					
				}
				
				var datess = that.mathMouthDates(that.SelYear , that.SelMouth);
				
				for (let i = datess; 0 < i && i <= datess; i--) {
					if (i < 10) {
						arrDate.push("0" + i);
				
					} else {
						arrDate.push(i);
					}
				}
			},
			loadCurrArr(arrMouth,arrDate){
				var date = new Date();
				var currentYear = date.getFullYear();
				var currentMouth = date.getMonth() + 1;
				var currentDate = date.getDate();
				for(let i = currentMouth ; i > 0 && i <= currentMouth ; i--){
					if (currentMouth < 10) {
						arrMouth.push("0" + currentMouth);
					
					} else {
						arrMouth.push(currentMouth);
					}
					currentMouth--
				}
				
				for (let i = currentDate; 0 < i && i <= currentDate; i--) {
					if (currentDate < 10) {
						arrDate.push("0" + currentDate);
				
					} else {
						arrDate.push(currentDate);
					}
					currentDate--
				}
			},
			loadGetDate(arrMouth,arrDate){
				
				var that = this;
				var datess = that.mathMouthDates(that.SelYear , that.SelMouth);
				var date = new Date();
				var currentYear = date.getFullYear();
				var currentMouth = date.getMonth() + 1;
				var currentDate = date.getDate();
				for(let i = currentMouth ; i > 0 && i <= currentMouth ; i--){
					if (currentMouth < 10) {
						arrMouth.push("0" + currentMouth);
					
					} else {
						arrMouth.push(currentMouth);
					}
					currentMouth--
				}
				
				for (let i = datess; 0 < i && i <= datess; i--) {
					if (i < 10) {
						arrDate.push("0" + i);
				
					} else {
						arrDate.push(i);
					}
				}
			},
			mathMouthDates(year,mouth){//计算各个月份的天数
				var d = new Date(year , mouth , 0);
				return d.getDate();
			},
			/*--------时间选择器--------*/

		},
		onLoad() {

		},
		onShow() {
			uni.request({ //获取车主认证状态
				url: this.$service.api.index.car_check,
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + uni.getStorageSync('token')
				},
				success: (res) => {
					var res = res.data;
					console.log(res);
					this.status = res.data.status;
					uni.setStorageSync('carAuth', this.status);
					console.log(this.status, 'carAuth');
				}
			});
		}
	}
</script>

<style>
	.content {
		padding-left: 24upx;
		padding-right: 24upx;
		background-color: transparent;
	}

	.header {
		background: transparent;
	}

	.header1 {
		background: #2189FF;
		height: calc(102rpx + var(--status-bar-height));
		position: fixed;
		top: 0;
		left: 0;
		z-index: 105;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		/* background-color:transparent;
		background: transparent; */
	}

	.left_ {
		width: 36upx;
		height: 36upx;
	}

	.center_title {
		font-size: 36upx;
		color: #FFFFFF;
		margin-right: 72upx;
		width: 80%;
	}

	page {
		/* background-color: #EFF3F6; */
	}

	.top_back {
		position: fixed;
		top: 0;
		left: 0;
		background: linear-gradient(to right, #38B7F9, #1A81F1);
		height: 364upx;
		width: 100%;
		z-index: -1;
	}

	.top_back2 {
		position: fixed;
		top: 364upx;
		left: 0;
		background: #EFF3F6;
		height: 100%;
		width: 100%;
		z-index: -1;
	}

	.top_notice {
		color: #FFFFFF;
		font-size: 26upx;
		line-height: 42upx;
		padding-top: 30upx;
	}

	.input_box {
		width: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 0 30upx;
		border-radius: 10upx;
		margin-top: 40upx;
	}

	.input_block {
		/* width: 100%; */
		display: flex;
		align-items: center;
		padding: 30upx 0;
		border-bottom: 2upx solid #F4F4F4;
	}

	.input_block:nth-last-of-type(1) {
		border-bottom: none;
	}

	.inps_title {
		color: #333333;
		font-size: 26upx;
		width: 30%;
	}

	.placehss {
		color: #939190;
		font-size: 26upx;
	}

	.inps {
		color: #333333;
		font-size: 26upx;
		width: 70%;

	}

	.upload_box {
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin-top: 30upx;
		padding: 0 20upx 40upx;
	}

	.upload1 {
		box-sizing: border-box;

	}

	.up_title {
		color: #333333;
		font-size: 28upx;
		padding: 20upx 0;
	}

	.idcard_img {
		display: flex;
		justify-content: space-between;
	}

	.idcard_frrev {
		background-color: #F0F7FE;
		width: 300upx;
		height: 176upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10upx;
		position: relative;
	}

	.idcard {
		color: #BAC1C8;
		font-size: 24upx;
		/* width: 100%; */
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.idcard image {
		width: 64upx;
		height: 56upx;
	}

	.idcard222 {
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.idcard222 image {
		width: 120upx;
		height: 122upx;
	}

	.idcards image {
		width: 300upx;
		height: 176upx;
	}

	.idcards {
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		justify-content: center;
		align-items: center;
	}

	.close {
		position: absolute;
		top: 0;
		left: 0;
		width: 50upx;
		height: 50upx;
	}

	.backBox {
		position: relative;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.xxxxx {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.ssssss {
		margin-top: 30upx;
	}

	.backBox image {
		width: 253upx;
		height: 253upx;

	}

	.picker_style {
		/* color: #333333; */
		color: #939190;

		font-size: 26upx;
		width: 70%;
	}
</style>
