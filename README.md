# Cambium RSC

A sample app built with v0.1 of Redwood Big Horn featuring support for React Server Components. For the classic, GraphQL version of this app see <https://github.com/cannikin/cambium-classic>

<img width="1279" alt="image" src="https://github.com/cannikin/cambium-rsc/assets/300/de9fce2e-43ee-4e27-9bc1-f642970eb7d7">

<img width="1279" alt="image" src="https://github.com/cannikin/cambium-rsc/assets/300/7ad5bc95-439a-46e2-91bd-4822ac7e4655">

## Setup

Populate `web/public/photos` with the images of your choice, or use the ones included. Note these are &copy; Rob Cameron and are available under the [CC BY-ND 4.0 license](https://creativecommons.org/licenses/by-nc/4.0/).

## Development

The dev server is not currently functioning with RSC, so you need to do a full `build` and `serve` as if you were running in production:

```
yarn rw build
yarn rw serve
```

Your site will be available at <http://localhost:8910> as usual. After any code change you'll need to stop the server, `build` and `serve` again.
