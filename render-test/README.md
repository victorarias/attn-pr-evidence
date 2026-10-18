# Video embed forms in a repo markdown file

## 1. video tag, relative src

<video src="clip.mp4" controls muted></video>

## 2. video tag, absolute github.com raw URL

<video src="https://github.com/victorarias/attn-pr-evidence/raw/guide-video-render-test/render-test/clip.mp4" controls muted></video>

## 3. image markdown, animated AVIF

![animated avif](clip.avif)

## 4. image markdown, GIF

![gif](clip.gif)

## 5. image markdown, APNG

![apng](clip-anim.png)

## 6. image markdown, mp4

![mp4 as image](clip.mp4)

## 7. bare relative link to mp4 on its own line

clip.mp4

## 8. video tag, relative webm

<video src="clip.webm" controls muted></video>

## 9. picture element, avif source with gif fallback

<picture><source srcset="clip.avif" type="image/avif"><img alt="picture fallback" src="clip.gif"></picture>
