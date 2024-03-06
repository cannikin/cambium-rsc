import Blank from 'src/components/Blank'
import { photos } from 'src/services/photos'

import Slide from './Slide'

export const data = () => {
  return { photos: photos() }
}

export const Loading = () => <Blank title="Loading photos..." />

export const Empty = () => (
  <Blank
    title="No photos found"
    subtitle="Add photos to <code>web/public/photos</code> to get started."
  />
)

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ photos }) => {
  return (
    <div className="">
      <ul className="flex flex-wrap justify-center">
        {photos.map((photo) => (
          <Slide photo={photo} key={photo.id} />
        ))}
      </ul>
    </div>
  )
}
