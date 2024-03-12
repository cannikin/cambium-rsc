'use client'

import { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Link, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const DEFAULT_ADJUSTMENTS = {
  brightness: 1,
  contrast: 1,
  'hue-rotate': 0,
  saturate: 1,
  sepia: 0,
  grain: 0,
}

const PhotoSuccess = ({ photo }) => {
  const params = new URLSearchParams(location.hash.slice(1))
  const adjustments = { ...DEFAULT_ADJUSTMENTS, ...Object.fromEntries(params) }
  const [showImage, setShowImage] = useState(false)
  const [showMetadata, setShowMetadata] = useState(false)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  // watch for resize so we can adjust the size of some things
  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onImageLoad = () => {
    setShowImage(true)
    setTimeout(() => {
      setShowMetadata(true)
    }, 1000)
  }

  const onResize = () => {
    setWindowHeight(window.innerHeight - 40)
  }

  return (
    <>
      <Metadata
        title={`${photo.filename}`}
        description={`View ${photo.filename}`}
      />

      <img
        src={`/photos/${photo.filename}`}
        alt={`id ${photo.id}`}
        className="hidden"
        onLoad={onImageLoad}
      />

      <div className="flex flex-col items-center justify-center">
        <div className="mx-8 mt-8 flex justify-center text-center">
          <Transition
            className="transform ease-in-out"
            enter="transition duration-1000"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            show={showImage}
          >
            <div className="relative">
              <img
                src={`/photos/${photo.filename}`}
                alt={`id ${photo.id}`}
                className={clsx(
                  `brightness-[${adjustments.brightness}]`,
                  `contrast-[${adjustments.contrast}]`,
                  `hue-rotate-[${adjustments['hue-rotate']}deg]`,
                  `saturate-[${adjustments.saturate}]`,
                  `sepia-[${adjustments.sepia}]`,
                  'shadow-lg shadow-black/30 filter md:rounded'
                )}
                style={{ maxHeight: windowHeight - 50 }}
              />
              <div className={`opacity-[${adjustments.grain}]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx('absolute inset-0 h-full w-full rounded')}
                >
                  <filter id="noiseFilter">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency={1}
                      seed={adjustments.grain * 100}
                      numOctaves={4}
                      stitchTiles="stitch"
                    />
                    <feColorMatrix
                      type="saturate"
                      values="0"
                      x="0%"
                      y="0%"
                      width="100%"
                      height="100%"
                      in="specularLighting"
                      result="colormatrix"
                    ></feColorMatrix>
                  </filter>

                  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
              </div>
            </div>
          </Transition>
        </div>
        <Transition
          as="div"
          className="flex transform items-center justify-center ease-in-out"
          enter="transition duration-500"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          show={showMetadata}
        >
          <table className="detail">
            <tbody>
              <tr>
                <td>
                  <h2 className="">Camera</h2>
                  <h3 className="">
                    {photo.metadata.image.Make} {photo.metadata.image.Model}
                  </h3>
                </td>
                <td>
                  <h2 className="">Focal Length</h2>
                  <h3 className="">{photo.metadata.exif.FocalLength}mm</h3>
                </td>
                <td>
                  <h2 className="">ISO</h2>
                  <h3 className="">{photo.metadata.exif.ISO}</h3>
                </td>
                <td>
                  <h2 className="">Shutter Speed</h2>
                  <h3 className="">{photo.metadata.exif.ShutterSpeedNumber}</h3>
                </td>
                <td>
                  <h2 className="">Aperture</h2>
                  <h3 className="">f/{photo.metadata.exif.FNumber}</h3>
                </td>
                <td>
                  <Link
                    to={`${routes.edit({ id: photo.id })}#${params.toString()}`}
                    className="button"
                  >
                    Remix
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Transition>
      </div>
    </>
  )
}

export default PhotoSuccess
