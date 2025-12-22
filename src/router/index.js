import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DemosView from '../views/DemosView.vue'
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'
import PaletteGenerator from '../views/PaletteGenerator.vue'

// Импортируем компоненты профиля
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
                                /*
                                 *       ВАЖНО: Добавили (\\d+)?
                                 *       Это значит: "ID может быть только числом".
                                 *       Теперь слова "info" или "posts" не будут считаться ID пользователя.
                                 */
                                path: '/profile/:id(\\d+)?',
                            component: UserProfile,
                            props: true,
                            children: [
                              {
                                path: '',
                                // Улучшенная логика перенаправления: если ID нет, ведем на /profile/info без лишних слешей
                                redirect: to => {
                                  return to.params.id
                                  ? `/profile/${to.params.id}/info`
                                  : '/profile/info'
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
