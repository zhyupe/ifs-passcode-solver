export async function readInput(element: HTMLInputElement): Promise<HTMLImageElement | null> {
  if (!element.files || !element.files.length) {
    return null
  }

  for (const file of Array.from(element.files)) {
    if (!file.type.startsWith('image/')) continue

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const image = new Image()
        image.src = fileReader.result as string

        resolve(image)
      }
      fileReader.onerror = reject
      fileReader.readAsDataURL(file)
    })
  }

  return null
}

export async function readURL(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    
    image.src = url
  })
}