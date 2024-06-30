<template>
    <div>
      <div
        v-loading.fullscreen.lock="loading"
        class="page"
        id="tablist"
        @scroll="listScroll"
      >
        <div
          class="item"
          v-for="(item, i) in testData"
          :key="i"
          :class="i % 2 == 0 ? 'gray' : 'white'"
          :id="item.id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ScrollLoadingSample",
    props: {},
    data() {
      return {
        flag: true, // 开关
        loading: false, // loading加载
        testData: [], // 列表数据
        targetIndex: 0,
        nextId: "",
      };
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        this.testData = [
          {
            id: "test-1",
            name: "区块1",
            // 要加载的方法名
            function: "loadTest1",
            // 方法是否加载了
            isLoaded: false,
          },
          {
            id: "test-2",
            name: "区块2",
            function: "loadTest2",
            isLoaded: false,
          },
          {
            id: "test-3",
            name: "区块3",
            function: "loadTest3",
            isLoaded: false,
          },
          {
            id: "test-4",
            name: "区块4",
            function: "loadTest4",
            isLoaded: false,
          },
          {
            id: "test-5",
            name: "区块5",
            function: "loadTest5",
            isLoaded: false,
          },
          {
            id: "test-6",
            name: "区块6",
            function: "loadTest6",
            isLoaded: false,
          },
        ];
        this.$nextTick(() => {
          this.loadPage();
        });
      },
      //判断元素是否在可视区域
      isElementInViewport(id) {
        let el = document.getElementById(id);
        //获取元素是否在可视区域
        let rect = el.getBoundingClientRect();
        return (
          rect.top + rect.height / 2 <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom > 0
        );
      },
  
      // 初次加载页面时
      loadPage() {
        for (let i = 0; i < this.testData.length; i++) {
          if (this.isElementInViewport(this.testData[i]["id"])) {
            this.loadFunctionByName(this.testData[i]["function"]);
            this.testData[i]["isLoaded"] = true;
          } else {
            this.targetIndex = i;
            // 最开始没出现在页面上的id
            this.nextId = this.testData[this.targetIndex]["id"];
            break;
          } 
        }
      },
      // 页面滑动
      listScroll() {
        for (let i = this.targetIndex; i < this.testData.length; i++) {
          // 如果出现在页面上
          if (this.isElementInViewport(this.testData[i]["id"])) {
            // 如果方法没有加载
            if (!this.testData[i]["isLoaded"]) {
              this.loadFunctionByName(this.testData[i]["function"]);
              this.testData[i]["isLoaded"] = true;
            }
          } else {
            // 如果没有出现在页面上
            this.targetIndex = i;
            this.nextId = this.testData[this.targetIndex]["id"];
            break;
          }
        }
      },
      // 根据方法名加载
      loadFunctionByName(functionName) {
        switch (functionName) {
          case "loadTest1":
            this.loading = true;
            // 模拟延迟请求
            setTimeout(() => {
              console.log("加载区块1");
              this.loading = false;
            }, 1000);
            break;
          case "loadTest2":
            this.loading = true;
            // 模拟延迟请求
            setTimeout(() => {
              console.log("加载区块2");
              this.loading = false;
            }, 1000);
            break;
          case "loadTest3":
            this.loading = true;
            // 模拟延迟请求
            setTimeout(() => {
              console.log("加载区块3");
              this.loading = false;
            }, 1000);
            break;
          case "loadTest4":
            this.loading = true;
            // 模拟延迟请求
            setTimeout(() => {
              console.log("加载区块4");
              this.loading = false;
            }, 1000);
            break;
          case "loadTest5":
            this.loading = true;
            // 模拟延迟请求
            setTimeout(() => {
              console.log("加载区块5");
              this.loading = false;
            }, 1000);
            break;
          case "loadTest6":
            this.loading = true;
            // 模拟延迟请求
            setTimeout(() => {
              console.log("加载区块6");
              this.loading = false;
            }, 1000);
            break;
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  .page {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center;
    align-items: center; */
  }
  .item {
    width: 100vw;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gray {
    background-color: #d5d1d1;
  }
  .white {
    background-color: white;
  }
  .loading {
    width: 80px;
    height: 100px;
    background: rgba(0, 0, 255, 0.664);
    display: inline-block;
  }
  </style>
  
  
  
  