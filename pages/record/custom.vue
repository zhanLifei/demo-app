<template>
	<view class="content">
		<headers :Hlicon="Hlicon" :Htitle="Htitle"></headers>
		<view class="" v-for="(it , i) in blocklist" :key="i">
			<checkboxs :inslist="inslist" @xxx='selinsss' v-if="it.type==1"></checkboxs>
			<radioButton :inscomlist="inscomlist" @lxj='selinscomy' @next='next' v-if="it.type==2"></radioButton>
			<uploadd v-if="it.type==5" @closeimg="closeimgs" @upload="upload(i)" :SrcImag="it.SrcImag" :must="it.must" :boxname="it.set_name"></uploadd>
			<SingleLine v-if="it.type==0" @ss="ss" :inds="i" :num.sync="phoneNum"></SingleLine>
		</view>
		<view class="btn">
			<view class="btn_submit" @click="btn_submit">
				<text>提交</text>
			</view>
			<view class="btn_stepback" @click="getBack">
				<text>返回上一步</text>
			</view>
		</view>

	</view>
</template>

<script>
	import headers from "../../components/header_nav.vue";
	import checkboxs from "../../custom/checkboxs.vue";
	import radioButton from "../../custom/radioButton.vue";
	import uploadd from "../../custom/uploadd.vue";
	import SingleLine from "../../custom/SingleLine.vue";
	export default {
		components: {
			headers,
			checkboxs,
			radioButton,
			uploadd,
			SingleLine
		},
		data: function() {
			return {
				Htitle: "上传资料",
				Hlicon: "../../static/icon/left_whitch.png",
				inslist: [{
						id: 1,
						name: "交强险",
						opartion: false,
						src1: "../../static/icon/nopitchon.png",
						src2: "../../static/icon/pitchon.png"
					},
					{
						id: 2,
						name: "交强险",
						opartion: false,
						src1: "../../static/icon/nopitchon.png",
						src2: "../../static/icon/pitchon.png"
					},
					{
						id: 3,
						name: "交强险",
						opartion: false,
						src1: "../../static/icon/nopitchon.png",
						src2: "../../static/icon/pitchon.png"
					},

				],
				clause: true,
				idarry: [],
				inscomlist: [],
				compsId: '',
				// SrcImag:'',
				havetobloon: true,
				type: 5,
				blocklist: [],
				index: '',
				uploadimg: [],
				phoneNum: '',
				subboolean: true,
				mustArry: [], //必填项下标的数组
				contiu: true,
				typeArry: [], //type为5的图片格式的下标数组
				dataBox: [], //放最后要存进缓存的数据



			}
		},
		methods: {
			// clearstorg() { //此函数可以避免数组被反复添加数据;
			// 	return new Promise((resolve, reject) => {

			// 		if (uni.getStorageSync("upcardata") != '' || uni.getStorageSync("upcardata") == undefined) {
			// 			uni.removeStorageSync('upcardata');
			// 			resolve(true);
			// 		} 
			// 	});
			// },



			btn_submit() {
				var self = this;
				//let n = await self.clearstorg() async
				// console.log(n);
				for (let i = 0; i <= self.mustArry.length; i++) { //判断是否填写了必填项
					let ide = self.mustArry[i];
					if (self.uploadimg[ide] == '') { //有必填项没有填写,则 提示然后return
						self.contiu = false;
						uni.showToast({
							title: self.blocklist[ide].set_name,
							icon: 'none'
						})
						return
					} else {
						self.contiu = true;
					}
				}
				// if (n ) {
				if (self.contiu) {
					uni.showModal({
						title: "提示",
						content: "带红点的为必须填写或上传凭证,如不填写或上传会导致审核不通过,是否已经填写上传完毕?",
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								// var arr = self.uploadimg.map((item) => {
								// 	return [item];
								// });
								//把非空的图片路径转换成数组包裹的形式
								for (let i = 0; i < self.typeArry.length; i++) {
									if (self.uploadimg[self.typeArry[i]] != '') {
										self.uploadimg[self.typeArry[i]] = [self.uploadimg[self.typeArry[i]]]
									}
								}
								// self.uploadimg = arr;
								console.log("arr", self.uploadimg);
								uni.setStorageSync('upcardata', self.uploadimg);
								setTimeout(() => {
									uni.navigateTo({
										url: "/pages/index/selarchins"
									}, 800);
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.showToast({
						title: self.blocklist[self.titleinfo].set_name,
						icon: 'none'
					})
				}

				// } else {

				// 	console.log("123")
				// }



			},
			getBack() {
				uni.removeStorageSync('upcardata');
				uni.removeStorageSync('proCityId');
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/main/index"
					});
				}, 800);
			},
			ss(xx, i) { //接收SingleLine页面传过来的input值
				// console.log(xx)
				this.phoneNum = xx;
				console.log(i, 'singleline');
				this.uploadimg[i] = xx; //i要从父组件传给子组件,再从子组件发送回来;
			},

			/*---------upload----------*/
			upload(i) {
				console.log(i)
				var self = this



				self.index = i;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res);
						let paths = res.tempFilePaths[0];
						// self.SrcImag = paths;
						uni.uploadFile({
							url: self.$service.api.home.uploadImgHLF, //接口地址
							header: {
								Authorization: 'Bearer ' + uni.getStorageSync('token')
							},
							filePath: paths,
							name: 'file',
							// formData: {
							//     'user': 'test'
							// },
							success: (res) => {
								var data = JSON.parse(res.data);
								var url = data.data.url;
								// var imgUrl = [];
								// imgUrl.push(url);
								// self.uploadimg.push({path:url , index:i});
								self.uploadimg[i] = url;
								self.$set(self.blocklist[i], 'SrcImag', url); //给选中的数组自定义一个属性将图片路径放进这个属性里
								console.log(self.uploadimg, "uploadimg");
							}
						});
						console.log(self.blocklist);
					}
				});
			},



			closeimgs(e) { //删除图片 e是子组件传过来的
				console.log('close', e)
				// this.$set(this.blocklist[i] , 'SrcImag' , '');
				var index = this.uploadimg.indexOf(e);
				this.uploadimg[index] = '';
				// this.uploadimg.splice(index, 1);
				console.log(this.uploadimg, index)
			},
			/*---------upload----------*/




			/*------radioButton-------*/
			selinscomy(i, id) {
				console.log(i, id);
			},

			next() {
				if (this.inscomlist.length == 1) { //如果数组只有一项 ,用户可能会直接点击一下步,所以默认取第一项的id
					this.compsId = this.inscomlist[0].id;
					console.log(this.compsId, this.inscomlist.length);
					// uni.navigateTo({
					// 	url:'/pages/index/uploaddata?id='+this.compsId
					// })
				} else if (this.compsId == '') { //用户默认第一项
					this.compsId = this.inscomlist[0].id;
					// uni.navigateTo({
					// 	url:'/pages/index/uploaddata?id='+this.compsId
					// })
					console.log(this.compsId, "用户默认第一项");
				} else { //用户有选择
					// uni.navigateTo({
					// 	url:'/pages/index/uploaddata?id='+this.compsId
					// })
					console.log(this.compsId, "用户有选择")
				}
			},
			/*------radioButton-------*/

			/*------checkboxs-------*/
			selclause() {
				this.clause = !this.clause
			},
			selinsss(i, id) {
				console.log(i, id);
				var index = this.idarry.indexOf(id);
				if (index != -1) {
					this.idarry.splice(index, 1);
					this.$set(this.inslist[i], 'operate', false);
					console.log(this.idarry);
				} else {
					this.idarry.push(id);
					this.$set(this.inslist[i], 'operate', true);
					console.log(this.idarry);
				}
			},
			/*------checkboxs-------*/

			fff() {

			}

		},

		onShow() {
			uni.removeStorageSync('upcardata');
			/*------radioButton-------*/
			this.res = uni.getStorageSync('inscompanys');
			this.inscomlist = uni.getStorageSync('inscompanys').data.company_list;
			console.log(this.inscomlist)
			/*------radioButton-------*/
			
			// this.$service.auth(this, this.$service.api.index.diyFields, 'GET', {
			// 	type: 1
			// }, function(self, res) {
			// 	console.log(res);
			// 	self.blocklist = res.data;
			// });
		},
		onLoad(op) {
			uni.setStorageSync('inscomId', op.id);
			this.$service.auth(this, this.$service.api.index.diyFields, 'GET', {
				type: 1
			}, function(self, res) {
				console.log(res);
				self.blocklist = res.data;
				self.blocklist.forEach((v, i) => {
					if (v.must == 1) {
						self.mustArry.push(i); //获取必填项的下标,用于判断用户是否填写了;
					}
					if (v.type == 5) { //获取图片格式的下标,用于用数组包裹路径;
						self.typeArry.push(i);
					}
				})
				console.log(self.mustArry, self.typeArry)
				for (let i = 0; i < self.blocklist.length; i++) { //先给数组的元素设置为空volid,这样可以知道用户上传了哪个下标的数据;
					// self.dataBox[i] = '';
					self.uploadimg[i] = '';
				}
				console.log(self.uploadimg, "databox", self.blocklist)
			});
			
		}
	}
</script>

<style>
	.btn {
		color: #FFFFFF;
		font-size: 36upx;
		text-align: center;
		padding: 0 60upx;
		box-sizing: border-box;
		margin-top: 80upx;
	}

	.btn_submit {
		background-color: #0089E2;
		padding: 20upx 0;
		border-radius: 44upx;
	}

	.btn_stepback {
		background-color: #FA9C22;
		padding: 20upx 0;
		margin-top: 40upx;
		border-radius: 44upx;
	}
</style>
