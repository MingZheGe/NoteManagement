<template>
  <div class="container" ref="container">
    <div v-for="item in visibleItems" :key="item.id" class="box" :style="getItemStyle(item)" :id="'iten' + item.id">
      <div style="width: 100%; height: 100%; background-color: #333;">
        <div class="item-content" @click="clickBox(item)" >
          <div class="item-title" v-html="highlightText(item.title)"></div>
          <div class="item-description" :style="{ '-webkit-line-clamp': clampValue }" v-html="highlightText(item.content)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    searchValue:{
      type:String,
    },
  },
  data() {
    return {
      scrollTop: 0,
      itemsPerRow: 4, // Default value for itemsPerRow
      itemHeight: 250, // Default value for itemHeight
      visibleCount: 0, // Initialize visibleCount
      boxWidth:0,
      boxHeight:0,
      clampValue:2
    };
  },
  computed: {
    startIndex() {
      return Math.floor(this.scrollTop / this.itemHeight) * this.itemsPerRow;
    },
    endIndex() {
      return Math.min(this.startIndex + this.visibleCount * this.itemsPerRow, this.items.length);
    },
    visibleItems() {
      console.log(this.startIndex, this.endIndex)
      return this.items.slice(this.startIndex, this.endIndex);
    },
    placeholderHeight() {
      return this.items.length * this.itemHeight;
    },
  },
  methods: {
    onScroll() {
      this.scrollTop = this.$refs.container.scrollTop;
    },
    highlightText(text) {
      if (!this.searchValue) {
        return text;
      }
      const regex = new RegExp(this.searchValue, 'gi');
      return text.replace(regex, match => `<span style="background-color: red;color: white;border-radius: 5px;padding: 2px 4px;">${match}</span>`);
    },

    getItemStyle(item) {
      const index = this.items.findIndex(i => i.id === item.id);
      const rowIndex = Math.floor(index / this.itemsPerRow);
      const colIndex = index % this.itemsPerRow;
      return {
        position: 'absolute',
        top: `${rowIndex * this.itemHeight}px`,
        left: `${colIndex * (100 / this.itemsPerRow)}%`,
        height: `${this.itemHeight}px`,
        width: `${100 / this.itemsPerRow}%`,
        backgroundColor: item.color,

      };
    },


    //dom渲染完成再拿取box的宽度
    updateBoxWidth() {
      this.$nextTick(() => {
    if (document.getElementById("iten") !== null) {
      const box = this.$refs.container.children[0]; // Assuming the first child is representative
      this.boxWidth = box.clientWidth;
      console.log(box)
      console.log(this.boxWidth);
      this.boxHeight = box.clientHeight;
      console.log("Box height:", this.boxHeight);
      this.calculateClampValue();
      //console.log(window.innerHeight)
    } else {
      console.log("没有box");
    }
  });

  
    },
    //节流函数

    throttle(func, wait, mustRun) {
      var timeout,
        startTime = new Date();

      return function () {
        var context = this,
          args = arguments,
          curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
          func.apply(context, args);
          startTime = curTime;
          // 没达到触发间隔，重新设定定时器
        } else {
          timeout = setTimeout(func, wait);
        }
      };
    },

    //每行放几个
    updateItemsPerRow() {
      if (window.innerWidth > 768) {
        this.itemsPerRow = 3;
      } else if (window.innerWidth < 300) {
        this.itemsPerRow = 1;
      } else {
        this.itemsPerRow = 2;
      }
    },
    //高度调整
    updateItemHeight() {
      
      if (window.innerHeight < 400) {
        this.itemHeight = 150;
        this.boxHeight = 150;
      } else {
        this.itemHeight = 250;
        this.boxHeight = 250;
      }
    },
    updateVisibleCount() {
      // Calculate visibleCount based on viewport height
      const containerHeight = this.$refs.container.clientHeight;
      this.visibleCount = Math.ceil(containerHeight / this.itemHeight) + 1;
    },
    calculateClampValue() {

      if (window.innerWidth >= 768 && this.boxHeight > 150) {
        this.clampValue = 6;
      } else if (window.innerWidth >= 480 && this.boxHeight > 150) {
        this.clampValue = 8;
      } else if(this.boxHeight > 150) {
        this.clampValue = 10;
      } else if (this.boxHeight <=150){
        this.clampValue = 3;
      }
    },
    clickBox(item) {
      this.$emit('box-click', item); // emit event to parent with itemId
    },
  },
  mounted() {
    this.updateItemsPerRow(); 
    this.updateItemHeight(); 
    this.updateVisibleCount(); 
    this.updateBoxWidth();
    this.calculateClampValue();

    const resizeHandler = this.throttle(() => {
      this.updateItemsPerRow();
      this.updateItemHeight();
      this.calculateClampValue();
   
    }, 100, 200);
    window.addEventListener('resize', resizeHandler);//添加节流函数

    this.$refs.container.addEventListener('scroll', this.throttle(this.onScroll, 100, 200));//第二个参数等待时长，第三个参数最小间隔
  },

  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.updateItemsPerRow();
      this.updateItemHeight();
    });
    this.$refs.container.removeEventListener('scroll', this.onScroll);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: #333;
  padding: 10px;
  overflow-y: auto;
  position: relative;
  height: 80vh;
  /* Adjust as needed */
}

.box {
  flex: 0 0 auto;
  /* Let flex properties control sizing */
  height: 250px;
  max-width: 500px;
  /* Adjust maximum width */
  position: relative;
  background-color: #333;
  font-family: "Microsoft Yahei";
  white-space: normal;
 

}

/* 正常电脑屏幕字体24 18*/

/* 中等屏幕下的字体调整 */
@media (max-width: 768px) {
  .box {
    max-width: 45%;
    max-height: 250px;
  }

  .item-title {
    font-size: 22px !important;
    /* 中等屏幕的字体 */
  }

  .item-description {
    font-size: 15px !important;
    /* 中等屏幕的字体 */
  }
}

/* 小屏幕下的字体调整 */
@media (max-width: 480px) {
  .box {
    max-width: 45%;
    max-height: 250px;
  }

  .item-title {
    font-size: 20px !important;
    /* 小屏幕的字体 */
  }

  .item-description {
    font-size: 12px !important;
    /* 小屏幕的字体 */
  }
}

/* 非常小的屏幕下的字体调整 */
@media (max-width: 300px) {
  .box {
    max-width: unset;
    flex-basis: 90vw;
    height: 30vh;
  }

  .item-title {
    font-size: 16px;
    /* 非常小的屏幕的字体 */
  }

  .item-description {
    font-size: 8px;
    /* 非常小的屏幕的字体 */
  }
}



.container::-webkit-scrollbar {
  display: none;
}

.item-content {
  width: calc(100% - 40px);
  /* 减去左右20px */
  height: calc(100% - 40px);
  /* 减去上下20px */
  background-color: #ffffff;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.item-title {
  font-size: 24px;
  /* 较大的字体 */
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-description {
  font-size: 18px;
  
  /* 较小的字体 */
  color: grey;
/*
  display: -webkit-box;
  -webkit-box-orient: vertical;
 /* overflow: hidden;
  text-overflow: ellipsis; 
  word-wrap: break-word;
  */
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* 可根据需要调整行数 */
  -webkit-box-orient: vertical;
}</style>
