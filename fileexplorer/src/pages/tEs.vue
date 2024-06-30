<template>
  <div>
    <div style="display: flex;flex-direction: column;height: 100vh;">
      <div class="headBar" ref="headBarRef">
        <div class="logo-avatar">
          <span class="logo2">笔记管理</span>
          <div class="logout" @click="handleLogout">退出登录</div>
        </div>
        <el-input clearable placeholder="搜索" @input="handleSearch" v-model="searchValue"></el-input>
      </div>
      <Box :items="items" :itemHeight="250" :visibleCount="4" @box-click="handleBoxClick" :searchValue="searchValue"></Box>
      <!--
    <div class="container" style="flex:1">
      items="items" :itemHeight="50" :visibleCount="40"-->
      <!--v-for="(box, index) in boxes" :key="index" :content="box.content"
    </div>
  -->


      <div class="navBar">
        <el-button @click="addBox">添加</el-button>
      </div>
    </div>
    <info v-if="showInfoComponent" :items="selectedItem" @return-info="handleReturnInfo" @alreadyDelete="updateItem"
      @add-item="handleAddItem" @modify-item="handleModifyItem" :add="ifAdd"  />
    <div v-if="showInfoComponent" class="overlay"></div>
  </div>
</template>

<script>
import Box from '../components/inFo.vue';
import info from './aDd.vue';
import connect from '../util/connect.js';
import storageUtils from '../util/store';

export default {
  components: {
    Box,
    info
  },
  data() {
    return {
      //boxes: [],
      items: [],
      originItems: [],
      headBarHeight: 0,
      showInfoComponent: false,
      selectedItem: null,
      ifAdd: false,
      searchValue: ''
    };
  },
  async mounted() {
    //localStorage.clear()
    // this.headBarHeight = this.$refs.headBarRef.getBoundingClientRect().height;
    await this.loadItems();
    this.$nextTick(() => {
      // 在 $nextTick 中处理页面渲染完成后的操作
      console.log('页面渲染完成');
    });
  },


  methods: {
    addBox() {
      //this.boxes.push({ content: `内容 ${this.boxes.length + 1}` });
      this.showInfoComponent = !this.showInfoComponent;
      this.ifAdd = true;
    },
    handleBoxClick(item) {
      console.log('Clicked Box ID:', item.title);
      console.log(item)
      this.selectedItem = item;
      this.showInfoComponent = !this.showInfoComponent;
    },
    handleReturnInfo(data) {
      console.log('Returned Data:', data);
      this.showInfoComponent = false; // 隐藏子组件
      this.ifAdd = false;
    },
    async updateItem() {
      await this.loadItems();
      this.showInfoComponent = false; // 隐藏子组件
      this.ifAdd = false;

    },
    async loadItems() {
      const storedNotesArray = await storageUtils.getStore('noteData');
      console.log(storedNotesArray)
      if (!storedNotesArray) {
        console.log("本地缓存初始化")
        const notesArray = [
          { id: 0, title: '说明', content: '第一次或者清除缓存后进入显示，点击退出登录清除缓存', date: '2024-06-30' },
          { id: 1, title: '主要功能', content: '增删改查 虚拟滚动(我只加载了视窗内的div块) 响应式布局 防抖节流', date: '2024-06-30' },
        ];
        await storageUtils.store('noteData', notesArray);
        let storedNotesArray2 = await storageUtils.getStore('noteData');
        // this.items =  [...storedNotesArray];
        this.items = storedNotesArray2
      } else {
        console.log("本地有缓存")
        this.items = storedNotesArray
      }
      this.originItems = [...this.items]


    },
    async handleAddItem(newItem) {
      // 处理从子组件传递过来的 newItem
      newItem.id = this.items.length; // 设置新项目的 id
      this.items.push(newItem); // 将 newItem 添加到父组件中的数组中
      console.log('Added item:', newItem);
      await storageUtils.store('noteData', this.items)
      this.showInfoComponent = false;
      this.ifAdd = false;
    },
    async handleModifyItem(newItem) {
      // 查找现有数组中与 newItem 相同 ID 的项目
      const existingItemIndex = this.items.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        // 如果找到相同 ID 的项目，则替换它
        this.items.splice(existingItemIndex, 1, newItem);
        console.log('Replaced item:', newItem);
      } else {
        // 否则将 newItem 添加到数组中
        this.items.push(newItem);
        console.log('Added item:', newItem);
      }

      // 存储更新后的数组到本地存储
      await storageUtils.store('noteData', this.items);

      // 可选：重置相关状态
      this.showInfoComponent = false;
      this.ifAdd = false;
    },
    handleLogout() {
      // 跳转到登录页面
      this.$router.push('/login');
      localStorage.clear()
    },
    /*
    handleSearch() {
      const searchPromise = new Promise((resolve, reject) => {
        // Simulate asynchronous matching process
        setTimeout(() => {
          const boxes = document.querySelectorAll('.box');
          const results = Array.from(boxes).filter(box => {
            const text = box.textContent.toLowerCase();
            return text.includes(this.searchValue.toLowerCase());
          });
          resolve(results);
        }, 500); // Simulate delay for asynchronous operation
      });
      searchPromise.then(results => {
        console.log('Matched boxes:', results);
        if (results.length === 0) {
          this.items = ''

        } else {
          results.forEach(result => {
            const id = result.getAttribute('id'); // 获取元素的 id 属性
            const num = id.replace(/\D/g, ''); // 提取 id 中的数字部分
            this.items = this.originItems.filter(item => {
              return item.id === parseInt(num); // 过滤出 id 匹配的元素
            });
            console.log('Filtered items:', this.items);
          });

        }

      });
    }
    */
    handleSearch() {
      const searchValue = this.searchValue.toLowerCase(); // 获取搜索值并转换为小写

      const searchPromise = new Promise((resolve, reject) => {
        // Simulate asynchronous matching process
        setTimeout(() => {
          const matchedItems = this.originItems.filter(item => {
            const text = item.content.toLowerCase() + ' ' + item.title.toLowerCase();
            return text.includes(searchValue);
          });
          resolve(matchedItems);
        }, 500); // Simulate delay for asynchronous operation
      });

      searchPromise.then(matchedItems => {
        /*
        if (matchedItems.length != 0) {
          matchedItems.forEach(item => {
            const boxElement = document.getElementById('iten' + item.id);
            const textContent = boxElement.textContent;
            console.log(boxElement)
            const highlightedText = textContent.replace(new RegExp(searchValue, 'gi'), match => {
              return `<span style="color: red;">${match}</span>`;
            });
  
          });

        }
          */
        console.log('Matched items:', matchedItems);
        this.items = matchedItems; // 将匹配到的项赋值给 this.items
      });
    }


  }
};
</script>

<style scoped>
@import url('../css/tEs.css');



</style>
