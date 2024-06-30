<template>
  <div>
    <router-view>
    </router-view>

  </div>
</template>

<script>
import storageUtils from './util/store';

export default {

  name: 'App',
  components: {
  },
  mounted() {
/*
    (async () => {
  const notesArray = [
    { id:0,title: 'My Note Title 1', content: 'This is the content of the note 1.', date: '2024-06-30' },
    { id:1,title: 'My Note Title 2', content: 'This is the content of the note 2.', date: '2024-06-30' },
    // 更多笔记
  ];

  // Encrypt and store data
  await storageUtils.store('noteData', notesArray);

  // Retrieve and decrypt data
  const storedNotesArray = await storageUtils.getStore('noteData');
  console.log(storedNotesArray)

  if (Array.isArray(storedNotesArray)) {
    storedNotesArray.forEach(note => {
      console.log(note.title); // 输出: 笔记标题
      console.log(note.content); // 输出: 笔记内容
      console.log(note.date); // 输出: 笔记日期
    });
  } else {
    console.error('Retrieved data is not an array');
  }
})();
*/

    /*
    const QUOTA_EXCEEDED_ERR_CODE = 22
function write (key, data) {
    try {
        localStorage.setItem(key, data);
    } catch (e) {
        if (e.code === QUOTA_EXCEEDED_ERR_CODE) {
            localStorage.clear();
            localStorage.setItem(key, data);
        }
    }
}
*/

  },
  methods: {

  },
  data() {
    return {
    }
  }
}
</script>

<style></style>