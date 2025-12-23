// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Основные страницы
import HomeView from '../views/HomeView.vue'
import DemosView from '../views/DemosView.vue'
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'
import PaletteGenerator from '../views/PaletteGenerator.vue'

// Вложенные компоненты профиля
import ProfileInfo from '../views/profile/ProfileInfo.vue'
import ProfilePosts from '../views/profile/ProfilePosts.vue'
import ProfileFriends from '../views/profile/ProfileFriends.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
                            routes: [
                              {
                                path: '/',
                                name: 'home',
                                component: HomeView
                              },
                              {
                                path: '/demos',
                                name: 'demos',
                                component: DemosView
                              },
                              {
                                path: '/profile/:id?',
                                component: UserProfile,
                                props: (route) => ({ id: route.params.id || null }),
                            children: [
                              {
                                path: '',
                                component: {
                                  template: `
                                  <div class="default-content card-box">
                                  <h3>Обо мне</h3>
                                  <p>Привет! Я увлекаюсь веб-разработкой, люблю Vue.js и решать сложные задачи. В свободное время занимаюсь восстановлением старых автомобилей.</p>
                                  <div class="tech-stack">
                                  <span>Vue 3</span><span>Go</span><span>Docker</span><span>Linux</span>
                                  </div>
                                  </div>
                                  `,
                                  name: 'ProfileDefault'
                                }
                              },
                              { path: 'info', component: ProfileInfo },
                              { path: 'posts', component: ProfilePosts },
                              { path: 'friends', component: ProfileFriends }
                            ]
                              },
                              {
                                path: '/settings/:tab?',
                                name: 'settings',
                                component: UserSettings,
                                props: true
                              },
                              {
                                path: '/palette',
                                name: 'palette',
                                component: PaletteGenerator
                              }
                            ]
})

export default router
