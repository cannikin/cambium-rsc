import React from 'react'

import { Css, Meta } from '@redwoodjs/web'
import type { TagDescriptor } from '@redwoodjs/web'

interface DocumentProps {
  children: React.ReactNode
  css: string[] // array of css import strings
  meta?: TagDescriptor[]
}

export const Document: React.FC<DocumentProps> = ({ children, css, meta }) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <Css css={css} />
        <Meta tags={meta} />
      </head>

      <body className="h-full bg-neutral-800">
        <div id="redwood-app">{children}</div>
      </body>
    </html>
  )
}
