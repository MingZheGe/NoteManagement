<template>
    <div class="backgroun">

        <div class="layout">
            <div class="test">
                <div class="test2"></div>
                <div class="test3">
                    <div class="containerforAdd">
                        <div class="form-group">
                            <div class="label">标题</div>
                            <el-input class="input" clearable placeholder="请输入标题" :disabled="!editable"
                                v-model="titleData"></el-input>
                        </div>

                        <div class="form-group2">
                            <div class="label">内容</div>
                            <el-input type="textarea" placeholder="请输入内容" resize="none" :disabled="!editable"
                                :rows=this.rows v-model="contentData">
                            </el-input>
                        </div>

                        <div class="button-group">
                            <el-button v-if="add || modify" @click="handIn">确定</el-button>
                            <template v-else>
                                <el-button @click="enableEdit">修改</el-button>
                                <el-button @click="handleDelete" type="danger">删除</el-button>
                            </template>
                            <el-button @click="handleReturn">返回</el-button>
                        </div>

                    </div>


                </div>
            </div>


        </div>

    </div>
</template>
  
<script>
import storageUtils from '../util/store'

export default {
    props: {
        items: {
            type: Object,
            default: null
        },
        add:
        {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            boxes: [],
            rows: 13,
            titleData: '', // 本地的标题数据
            contentData: '', // 本地的内容数据
            editable: false, // 是否可编辑的状态
            modify: false,
        };
    },
    methods: {

        updateRows() {
            const windowHeight = window.innerHeight;
            // 计算行数，例如，每 50 像素对应一行
            console.log("更新了")
            this.rows = Math.max(3, Math.floor(windowHeight / 45));
            console.log(this.rows);
        },
        enableEdit() {
            this.editable = true; // 设置为可编辑状态
            this.modify = true;
        },
        async handleDelete() {
            const storedNotesArray = await storageUtils.getStore('noteData');
            const updatedNotesArray = storedNotesArray.filter(item => item.id !== this.items.id);
            await storageUtils.store('noteData', updatedNotesArray);
            this.$emit('alreadyDelete', { title: this.titleData, content: this.contentData });
            this.titleData = '';
            this.contentData = '';
        },
        handleReturn() {
            this.$emit('return-info', { title: this.titleData, content: this.contentData });
            this.editable = false; // 返回时设置为不可编辑状态
            this.titleData = '';
            this.contentData = '';
        },
        handIn() {
            if (!this.add) {//修改确定
                console.log("修改")
                this.modify = false;
                const newItem = { // Assign unique ID as needed
                    title: this.titleData,
                    content: this.contentData,
                    id: this.items.id
                };
                this.$emit('modify-item', newItem);
                console.log(newItem);
                //storageUtils.store('noteData', newItem))
            }
            else {//添加确定
                console.log("添加")
                this.modify = false;
                const newItem = { // Assign unique ID as needed
                    title: this.titleData ? this.titleData : '无标题',
                    content: this.contentData ? this.contentData : '无内容',
                    id: Math.floor(Math.random() * 1000)
                };
                this.$emit('add-item', newItem);
                console.log(newItem);
                //storageUtils.store('noteData', newItem))
            }

        }
    },
    mounted() {
        this.updateRows();
        window.addEventListener('resize', this.updateRows);
        /*
      if (this.add == false) {
          this.titleData = '';
          this.contentData = '';
      }
    
      else {
          this.titleData = this.items.title;
          this.contentData = this.items.content;
          this.editable = true;
      }*/
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.updateRows);
    },
    watch: {
        // 监听父组件传来的标题和内容变化，更新本地数据
        items: {
            handler(newValue) {
                if (newValue) {
                    this.titleData = newValue.title || '';
                    this.contentData = newValue.content || '';
                    console.log("监听到了");
                    console.log(newValue);
                    console.log(this.titleData);
                }
            },
            immediate: true
        },
        add: {
            handler(newValue) {
                if (newValue) {
                    this.editable = true;
                    this.modify = false;
                    this.titleData = '';
                    this.contentData = '';
                }
            },
            immediate: true
        }
    }
};
</script>
  
<style scoped>
@import url('../css/cardStyle.css');
.backgroun{
       height:100vh;
       width:100vw;
       background-color: rgb(0, 0, 0);
    }

    .el-textarea__inner {
        height: 800px;
        /* 你可以根据需要调整这个高度 */
        overflow-y: auto;
        /* 添加滚动条 */
    }
    
    .containerforAdd {
        padding: 20px;
        height: calc(100% - 40px);
        /*padding20 */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /*overflow: hidden;*/
        /* 均匀分布 */
    
    }
    
    .form-group {
        display: flex;
        width: 100%;
        align-items: center;
        margin-bottom: 3%;
    }
    
    .form-group2 {
        display: flex;
        width: 100%;
        margin-bottom: 3%;
    }
    
    .form-group .label,
    .form-group2 .label {
        white-space: nowrap;
        min-width: 100px;
    }
    
    @media (max-width: 600px) {
    
        .form-group .label,
        .form-group2 .label {
            min-width: 50px;
        }
    
        .form-group {
            flex-grow: 1;
        }
    
    }
    
    .form-group .input,
    .form-group2 .input {
        flex-grow: 1;
    }
    
    
    .button-group {
        display: flex;
        justify-content: space-around;
        margin-top: auto;
        /* 将按钮组推到容器底部 */
    }
    
    .button-group .el-button {
        margin-left: 10px;
    }


</style>
  