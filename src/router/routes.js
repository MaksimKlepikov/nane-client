
import Chat from 'components/Chat'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: '',
            name: 'index',
            components: {
              'room-list-panel': () => import('components/RoomList.vue'),
              'chat-panel': () => import('components/BlankChat.vue')
            }
          },
          {
            path: 'room/:roomId',
            name: 'room',
            components: {
              'room-list-panel': () => import('components/RoomList.vue'),
              'chat-panel': Chat
            }
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
