import cloudinaryCore from 'cloudinary-core'
import config from 'config'

export default new cloudinaryCore.Cloudinary({
  cloud_name: config.cloudinaryCloudName,
  secure: true,
})
