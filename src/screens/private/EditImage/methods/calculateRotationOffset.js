export default function (width, height) {
  const transform = [
    { rotate: `${this.rotation}deg` },
  ]

  /*
    RN rotates around centre point, so we need to
    manually offset the rotation to stick the image
    to the top left corner so that our offsets will
    work.
  */
  if (this.rotation === 90) {
    transform.push(
      { translateX: -((width - height) / 2) },
      { translateY: -((width - height) / 2) },
    )
  } else if (this.rotation === 270) {
    transform.push(
      { translateX: ((width - height) / 2) },
      { translateY: ((width - height) / 2) },
    )
  }
  return transform
}
