<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		width: 100%;
		height: 100%;
		/* background-color: #EFF3F6; */
	}
	  .status_bar {
	                height: var(--status-bar-height);
	                width: 100%;
	                top: 0;
	                left: 0;
	                background: #F2F2F2;
	                position: fixed;
	        }
	        .content {
	                width: 100%;
	                height: 100%;
	                box-sizing: border-box;
	                padding-top:calc(102rpx + var(--status-bar-height));
	                overflow: auto;
					background-color: #F4F4F4;
	        }
	        .header {
	                background: #2189FF;
					height:calc(102rpx + var(--status-bar-height));
	                position: fixed;
	                top: 0;
	                left: 0;
	                z-index: 105;
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					background-color:transparent;
					background: transparent;
	        }
			.allcolor{
				color: #2189FF;
			}
			image{
				width: 100%;
				height: 100%;
			}
			.left_{
				margin-left: 40upx;
				width: 20%;
			}
			.right_{
				
				width: 20%;
				text-align: center;
			}
			.center_title{
				text-align: center;
				width: 60%;
			}
</style>
