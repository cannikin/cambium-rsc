import { defineEntries } from '@redwoodjs/vite/entries'

export default defineEntries(
  // getEntry
  async (id) => {
    switch (id) {
      case 'EditPhotoPage':
        return import('./pages/EditPhotoPage/EditPhotoPage')
      case 'HomePage':
        return import('./pages/HomePage/HomePage')
      case 'PhotoPage':
        return import('./pages/PhotoPage/PhotoPage')
      default:
        return null
    }
  }
)
