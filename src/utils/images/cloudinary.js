import cloudinaryCore from 'cloudinary-core'
import config from 'config'

export default new cloudinaryCore.Cloudinary({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  secure: true,
})
