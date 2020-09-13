export const getFiles = (element: HTMLInputElement): File[] => {
  if (!element.files || !element.files.length) {
    return []
  }

  return Array.from(element.files)
}

export type FileReaderMethod = 'readAsArrayBuffer' | 'readAsBinaryString' | 'readAsDataURL' | 'readAsText'

export function openReader(file: File, method: 'readAsArrayBuffer'): Promise<ArrayBuffer>
export function openReader(file: File, method: 'readAsBinaryString' | 'readAsDataURL' | 'readAsText'): Promise<string>
export function openReader(file: File, method: FileReaderMethod): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = reject
    fileReader[method](file)
  })
}

export async function readImage(element: HTMLInputElement): Promise<HTMLImageElement | null> {
  for (const file of getFiles(element)) {
    if (!file.type.startsWith('image/')) continue

    const image = new Image()
    image.src = await openReader(file, 'readAsDataURL')
    
    return image
  }

  return null
}