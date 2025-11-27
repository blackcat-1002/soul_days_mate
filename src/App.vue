<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo-area">
        <h1>Hi! Soul Days Mate</h1>
      </div>
      <nav class="nav-menu">
        <router-link 
          v-for="mate in mateList" 
          :key="mate.id"
          :to="`/mate/${mate.id}`"
          class="nav-item"
        >
          <div class="avatar">
            <img :src="mate.image" :alt="mate.name">
          </div>
          <span class="mate-name">{{ mate.name }}</span>
        </router-link>
      </nav>
    </aside>

    <main class="main-content">
      <div class="content-wrapper"> 
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <footer class="site-footer">
        <p>© Happy Project</p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { mates } from './assets/matesData.js';
const mateList = mates;
</script>

<style scoped lang="scss">
/* 預設: 桌機 / 寬螢幕 (左側導航) */
.app-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: flex; /* 使用 flex 來佈局 main-content 的位置 */
}

/* 側邊欄設計：固定在畫面上，佔 30% 寬度 */
.sidebar {
  width: 18vw; /* 側邊欄寬度 */
  height: 100vh;
  background: white;
  box-shadow: 4px 0 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  z-index: 100;
  
  position: fixed;
  left: 0;
  top: 0;
}

.logo-area{
  margin: 0 auto;
    h1 {
      color:#0089A7; 
        font-weight: bolder;
        font-size: 2rem; 
        margin-bottom: 0.5rem; 
      }
} 

.nav-menu { 
    flex: 1; 
    display: flex; 
    flex-direction: column; 
    gap: 1rem; 
  }

.nav-item {
    display: flex; 
    align-items: center; 
    padding: 12px; 
    border-radius: 12px; 
    transition: all 0.3s ease; 
    &:hover{
      background: #e9ecef; 
      transform: translateX(5px);
    }
  }

.router-link-active { 
  background: linear-gradient(135deg, #4ead9d 0%, #0d85a3 100%); 
  color: #fff; 
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4); 
  .mate-name,
    & * { // 針對所有子元素強制繼承白色
        color: white !important; 
    }
  }

.avatar { 
  width: 60px; 
  height: 60px; 
  border-radius: 50%; 
  overflow: hidden; 
  margin-right: 15px; 
  background-color: #fff;
  img { 
      width: 100%; 
      height: 100%; 
      object-fit: cover; 
    }
  }

.mate-name {
  color: #424242;
  font-weight: 600; 
  font-size: 1.1rem; 
}

/* 主內容區：佔滿右側 70% 空間，內容置中 */
.main-content { 
    width: 81vw;
    box-sizing: border-box; 
    padding: 40px; 
    overflow-y: auto; 
    background: #fdfdfd; 
    
    /* Sticky Footer 相關屬性 */
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
}

/* 內容 Wrapper：負責水平/垂直置中 */
.content-wrapper {
    flex-grow: 1; 
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%;
}

.site-footer {
    padding: 20px 0;
    margin-top: 40px; 
    border-top: 1px solid #eee;
    text-align: center;
    color: #999;
    font-size: 0.9rem;
    width: 100%;
}

/* --- RWD: 平板/手機佈局 (最大寬度 1024px) --- */
@media (max-width: 1024px) {
  // 1. 確保整個 app-layout 堆疊
  .app-layout { flex-direction: column; min-height: auto; }

  // 2. 修正 .sidebar
  .sidebar {
    position: static; 
    width: 100%; 
    height: auto;
    padding: 20px;
    
    // 關鍵修正：將側邊欄內的元素（logo 和 nav）改為垂直堆疊
    display: flex; 
    flex-direction: column; 
    align-items: center; /* 讓 Logo 置中 */
  }

  // 3. 修正 .logo-area (可選：增加間距)
  .logo-area {
      margin-bottom: 20px;
  }

  // 4. 修正 .nav-menu
  .nav-menu {
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap; /* <<<< 關鍵修正：強制不換行 */
    overflow-x: auto; /* <<<< 關鍵修正：允許水平滾動 */
    gap: 15px; /* 增加項目間距 */
    padding-bottom: 20px; /* 避免滾動條擋住內容，視覺上更好看 */
    
    // 確保整個選單從左側開始
    justify-content: flex-start; 
  }
  .avatar{
    margin: auto 0; 
  }
  // 5. 修正 .nav-item 樣式
  .nav-item {
    width: 100px; /* 讓每個卡片在水平空間內佔用固定寬度 */
    display: flex;
    flex-direction: column;
    align-items: center;
    // 移除不必要的 RWD 樣式，只保留核心佈局
  }
  
  // 6. 修正 .main-content 
  .main-content {
    box-sizing: border-box; 
    margin-left: 0; 
    width: 100%; 
  }
}

/* 轉場動畫 (不變) */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>