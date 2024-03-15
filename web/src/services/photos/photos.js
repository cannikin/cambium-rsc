/* eslint-disable no-new */
import fs from 'node:fs'
import path from 'node:path'

import ExifImage from 'exif'

const photosPath = path.resolve('./public/photos')

const getMetadata = (filename) => {
  return new Promise((resolve, reject) => {
    new ExifImage(
      {
        image: path.join(photosPath, filename),
      },
      (error, data) => (error ? reject(error) : resolve(data))
    )
  })
}

const getFiles = ({ thumb }) => {
  return fs
    .readdirSync(photosPath)
    .filter((file) => !file.startsWith('.'))
    .filter((file) => fs.statSync(path.join(photosPath, file)).isFile())
    .filter((file) =>
      thumb ? file.includes('thumb') : !file.includes('thumb')
    )
}

// returns the collection of all available photos
export const photos = () => {
  return getFiles({ thumb: true }).map((filename, index) => {
    return {
      id: index + 1,
      filename,
    }
  })
}

// returns the metadata for a specific photo
export const photo = async (id) => {
  const filename = getFiles({ thumb: false })[id - 1]

  const { image: imageMetadata, exif: exifMetadata } =
    await getMetadata(filename)

  const fStop = Math.round(1.4142 ** exifMetadata.ApertureValue * 10) / 10
  const shutterSpeed = `1/${parseInt(1 / exifMetadata.ExposureTime)}`

  const output = {
    id,
    filename,
    metadata: {
      image: {
        Make: imageMetadata.Make,
        Model: imageMetadata.Model,
        XResolution: imageMetadata.XResolution,
        YResolution: imageMetadata.YResolution,
        Copyright: imageMetadata.Copyright || '',
        Author: imageMetadata.Author || '',
      },
      exif: {
        DateTimeOriginal: exifMetadata.DateTimeOriginal,
        ExifImageHeight: exifMetadata.ExifImageHeight,
        ExifImageWidth: exifMetadata.ExifImageWidth,
        FNumber: fStop,
        FocalLength: exifMetadata.FocalLength,
        ISO: exifMetadata.ISO,
        ShutterSpeedNumber: shutterSpeed,
      },
    },
  }

  return output
}
