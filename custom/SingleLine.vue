<template>
	<view class="">
		<view class="userphone">
			<view class="userphone_num">
				
			<text>请输入手机号码：</text>
			</view>
			<input type="text"  v-model="msg"/>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			inds:{
				// type:String
			}
		},
		data(){
			return{
				msg:""
			}
		},
		
		watch:{
			msg(news , old){
				if(news != old){
					this.xx()
				}
			}
		},
		methods:{
			xx(){
				this.$emit('ss',this.msg , this.inds);
			}
		}
		
	}
</script>

<style>
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
</style>
