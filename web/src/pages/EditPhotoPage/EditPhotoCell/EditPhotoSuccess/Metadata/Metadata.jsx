import { format } from 'date-fns'

const Metadata = ({ photo }) => {
  if (!photo?.metadata) {
    return null
  }

  return (
    <table className="metadata w-full">
      <tbody>
        <tr>
          <td>Date</td>
          <td>
            {format(
              new Date(
                photo.metadata.exif.DateTimeOriginal.replace(
                  /^(\d+):(\d+):(\d+) /,
                  '$1-$2-$3T'
                )
              ),
              'PP pp'
            )}
          </td>
        </tr>
        {(photo.metadata.image.Copyright || photo.metadata.image.Author) && (
          <tr>
            <td>{photo.metadata.image.Copyright ? 'Copyright' : 'Author'}</td>
            <td>
              {photo.metadata.image.Copyright || photo.metadata.image.Author}
            </td>
          </tr>
        )}
        <tr>
          <td>Size</td>
          <td>
            {photo.metadata.exif.ExifImageWidth} x{' '}
            {photo.metadata.exif.ExifImageHeight}
          </td>
        </tr>
        <tr>
          <td>Resolution</td>
          <td>{photo.metadata.image.XResolution} ppi</td>
        </tr>

        <tr>
          <td>Camera</td>
          <td>
            {photo.metadata.image.Make} {photo.metadata.image.Model}
          </td>
        </tr>
        <tr>
          <td>Focal Length</td>
          <td>{photo.metadata.exif.FocalLength}mm</td>
        </tr>
        <tr>
          <td>ISO</td>
          <td>{photo.metadata.exif.ISO}</td>
        </tr>
        <tr>
          <td>Shutter Speed</td>
          <td>{photo.metadata.exif.ShutterSpeedNumber}</td>
        </tr>
        <tr>
          <td>Aperture</td>
          <td>f/{photo.metadata.exif.FNumber}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Metadata
