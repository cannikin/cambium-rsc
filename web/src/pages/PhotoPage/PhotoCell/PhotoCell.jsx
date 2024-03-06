import Blank from 'src/components/Blank/Blank'
import { photo } from 'src/services/photos/photos'

import PhotoSuccess from './PhotoSuccess'

export const data = async ({ id }) => {
  return { photo: await photo(id) }
}

export const Loading = () => <Blank title="Loading photo..." />

export const Empty = () => (
  <Blank
    title="No photos found"
    subtitle="Add photos to <code>web/public/photos</code> to get started."
  />
)

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ photo }) => {
  return <PhotoSuccess photo={photo} />
}
