<template>
    <div v-if="mate" class="profile-page">
        <div class="content-card">
        
        <div class="left-visual" :style="{ background: mate.color + '20' }">
            <div class="video-container" :style="{ borderColor: mate.color }">
            <img :src="mate.video" :alt="mate.name" class="character-img">
            </div>
        </div>

        <div class="right-info">
            <h1 class="char-name" :style="{ color: mate.color }">{{ mate.name }}</h1>
            
            <div class="info-grid">
            <div v-for="(item, index) in mate.profile" :key="index" class="info-item">
                <span class="label">{{ item.label }}</span>
                <span class="value">{{ item.value }}</span>
            </div>
            </div>

            <hr class="divider">

            <div class="story-section">
            <h3 :style="{ borderLeftColor: mate.color }">角色故事</h3>
            <p>{{ mate.description }}</p>
            </div>
        </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { mates } from '../assets/matesData.js';

const route = useRoute();

const mate = computed(() => {
    return mates.find(m => m.id === route.params.id);
});
</script>

<style scoped>
/* 預設: 桌機 (左圖右文) */
.profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 20px;
}
.content-card {
    height: 70vh;
    display: flex;
    background: white;
    width: 100%;
    max-width: 1200px;
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    overflow: hidden;
    transition: all 0.5s ease;
}

/* 左側視覺區 */
.left-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    min-width: 350px;
}
.image-container {
    width: 100%;
    max-width: 300px;
    border-radius: 20px;
    border: 8px solid;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.character-img { width: 100%; height: auto; display: block; }

/* 右側資訊區 */
.right-info { 
    flex: 2; 
    padding: 30px 50px; 
    display: flex; 
    flex-direction: column; 
    height: 100%;
    }
.char-name { 
    font-size: 3rem; 
    font-weight: 800; 
    margin-bottom: 30px; 
    letter-spacing: 2px; 
    }

/* 資料網格 */
.info-grid { display: grid; gap: 15px; margin-bottom: 30px; }
.info-item { display: flex; align-items: baseline; border-bottom: 1px dashed #eee; padding-bottom: 8px; }
.label { font-weight: bold; color: #888; min-width: 70px; font-size: 1.1rem; }
.value { font-size: 1.2rem; color: #444; font-weight: 500; line-height: 1.5; }

/* 故事區 */
.story-section h3 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
    border-left: 4px solid; /* 邊框顏色由 mate.color 決定 */
    padding-left: 10px;
}
.story-section p { font-size: 1.1rem; line-height: 1.8; color: #555; text-align: justify; }


/* --- RWD: 平板/手機佈局 (最大寬度 768px) --- */
@media (max-width: 768px) {
.content-card {
    flex-direction: column; /* 變為上下堆疊 */
    max-width: 90%;
    height: auto; /* 取消固定高度 */
    padding: 0;
  }
  
.left-visual {
    min-width: auto;
    padding: 30px 20px;
    order: 1; 
  }

  .image-container {
    max-width: 250px;
  }

  .right-info {
    padding: 30px 25px;
    order: 2;
    width: 100%;
    height: auto; 
    text-align: left; 
  }

  .char-name {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* 故事區標題置中 */
  .story-section h3 {
    text-align: center;
    border-left: none;
    padding-left: 0;
    border-bottom: 2px solid;
    padding-bottom: 5px;
  }
}
</style>