# Awesomesauce
[Live Website](https://awesomesauce3000.neocities.org/)

This project is a homage to when personal webpages, animated GIFs, and a sense of online adventure defined digital exploration.

Awesomesauce taps into the [Wiby](https://wiby.me/) JSON API, employing jQuery for that classic JavaScript feel and Handlebars for templating, delivering search results that bring you the pure essence of neocities.org and nekoweb webpages.

Not just a search interface, but Awesomesauce also simplifies discovering the minds behind these web gems by providing direct links to their creator profiles.
Besides this, you can also search for old-looking images by using the image search, or old videos by using the video search functions.

Video search makes use of the youtube API to define a date and month, by default it will search for videos from around 2011.

Image search on the other hand employs custom code to retrieve images from GlitterGraphics website.

All of this avoiding CORS conflicts by using a serverless CORS proxy.
