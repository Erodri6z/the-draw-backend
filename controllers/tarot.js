import fetch from 'node-fetch'

async function proxyImage(req, res){
  const { slug } = req.params

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/Tart%20cards/${slug}`
  

  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get('content-type')
    const buffer = await response.arrayBuffer()

    res.set('Content-Type', contentType)
    res.send(Buffer.from(buffer))
  } catch (err) {
    res.status(500).json({ error: 'Failed to load image', message: err.message })
  }
}

export {
  proxyImage
}