<template>
  <div class="intl-tel-input-container">
    <div class="selected-flag" @click.stop="handleShowAndFlyTo"
         :title="`${currentData.name}: + ${currentData.dialCode}`">
      <div :class="['flag', `flag-${currentData.code}`, 'cur-flag']"></div>
      <span class="area-codeNum" :title="`${currentData.name}: + ${currentData.dialCode}`">+{{currentData.dialCode}}</span>
      <i class="tran"></i>
    </div>
    <transition name="fade">
      <div v-if="hideSubMenu" class="flag-list-box scroll-bar" @click.stop="hideSubMenu = true">
        <input v-model="countryName" type="text" class="search-input" placeholder="国家名字(The Country Name)">
        <ul class="country-list">
          <li v-for="(item, index) in filterCountries"
              :key="index"
              :class="['list-item', {'highlight': item.dialCode === currentCode}]"
              @click.stop="handleItemClick(item)"
          >
            <div :class="['flag', `flag-${item.code}`]"></div>
            <span class="country-name">{{item.CNName}}-{{ item.name }}</span>
            <span class="dial-code"> +{{ item.dialCode }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
  import countryListData from '../assets/countryData.json'
  export default {
    name: 'countryCodeSelector',
    props: {
      /*
      * @description 国际区号
      * */
      countryCode: {
        type: Number,
        default: 86
      }
    },
    data () {
      return {
        countryName: '',
        hideSubMenu: false,
        currentCode: this.countryCode,
        countryList: []
      }
    },
    computed: {
      // 根据props传过来的国际区号检索出所在的整个对象
      currentData () {
        return this.countryList.filter((item) => {
          return Object.keys(item).some((key) => {
            return item[key] === this.currentCode
          })
        })[0]
      },
      // 根据输入框的内容进行模糊检索
      filterCountries () {
        if (this.countryName) {
          return this.countryList.filter((item) => {
            return Object.keys(item).some((key) => {
              return String(item[key]).toLowerCase().indexOf(this.countryName.toLowerCase()) > -1
            })
          })
        } else {
          return this.countryList
        }
      }
    },
    created() {
      // 拿到JSON里面的国家区号数据并赋值到本地data中
      this.countryList = countryListData
    },
    methods: {
      handleShowAndFlyTo () {
        this.hideSubMenu = !this.hideSubMenu
        if (this.hideSubMenu) {
          document.addEventListener('click', () => {
            this.hideSubMenu = false
          })
          setTimeout(() => {
            document.querySelector('.highlight').scrollIntoView({
              block: 'center',
              behavior: 'smooth'
            })
          }, 100)
        }
      },
      handleItemClick (obj) {
        this.hideSubMenu = !this.hideSubMenu;
        this.currentCode = obj.dialCode
        // 更改父组件的值
        this.$emit('update:countryCode', obj.dialCode)
        setTimeout(() => {
          document.querySelector('.highlight').scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          })
        }, 100)
      }
    }
  }
</script>
<style scoped>
  @import "../assets/css/flags.css";

  ul, li {
    padding: 0;
    margin: 0;
  }
  .intl-tel-input-container {
    position: relative;
    padding: 0 10px;
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }

  .selected-flag {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .flag-list-box {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 40px;
    padding: 10px;
    width: 200px;
    height: 300px;
    overflow: auto;
    border: 1px solid #E5E5E5;
  }

  .search-input {
    width: 100%;
    padding-left: 5px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #E5E5E5;
    background-color: transparent;
  }

  input::-webkit-input-placeholder{
    color: #CCCCCC;
    font-size: 12px;
  }

  .country-list {
    margin-top: -20px;
    list-style: none;
  }

  .list-item {
    margin: 10px 0;
    font-size: 12px;
    line-height: 1.5;
    color: #606266;
    cursor: pointer;
    user-select: none;
  }

  .list-item:hover {
    color: #303133;
  }

  .list-item:first-child {
    margin-top: 30px;
  }

  .list-item:last-child {
    margin-bottom: 0;
  }

  .country-name {
    margin-left: 5px;
  }

  .dial-code {
    /*font-weight: bold;*/
  }

  .area-codeNum {
    padding: 10px;
    display: inline-block;
    font-size: 14px;
    position: relative;
  }

  .tran {
    margin-top: 5px;
    margin-left: -3px;
    border-width: 5px;
    border-style: solid;
    border-color: #434343 transparent transparent;
  }

  .highlight {
    font-weight: bold;
    color: #303133;
  }

  /*滚动条样式*/
  /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
  .scroll-bar::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    border-radius: 15px;
    background-color: transparent;
  }

  /*定义滚动条的轨道，内阴影及圆角*/
  .scroll-bar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #E5E5E5;
    background-color: transparent;
    border-radius: 15px;
  }

  /*定义滑块，内阴影及圆角*/
  .scroll-bar::-webkit-scrollbar-thumb {
    height: 20px;
    border-radius: 15px;
    -webkit-box-shadow: inset 0 0 6px #CCCCCC;
    background-color: #888;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
