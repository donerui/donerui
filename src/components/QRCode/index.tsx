import QR from 'qrcode'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { MdDownload } from 'react-icons/md'
import Button from '../Button'
import Icon from '../Icon'
import { type IQRCodeProps } from './types'

function QRCode ({
  className,
  data,
  errorCorrectionLevel = 'M',
  margin = 0
}: IQRCodeProps): JSX.Element {
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function generateSvg (): void {
    if (data == null || data === '') {
      setSvg(null)
      setError(null)
      return
    }

    QR.toString(data, {
      type: 'svg',
      errorCorrectionLevel,
      margin
    }, (err, url) => {
      if (err != null) {
        setError(err.message)
        setSvg(null)
        return
      }

      setError(null)
      setSvg(url)
    })
  }

  function downloadQRCode (): void {
    QR.toDataURL(data, {
      errorCorrectionLevel,
      margin: 1,
      width: 512
    }, (err, url) => {
      if (err != null) {
        return
      }

      const a = document.createElement('a')
      a.href = url
      a.download = `${data}.png`
      a.click()
      a.parentNode?.removeChild(a)
    })
  }

  useEffect(() => {
    generateSvg()
  }, [data])

  return (
    <div
      className={twMerge(
        'relative group w-full h-full flex justify-center items-center',
        className
      )}
    >
      {svg != null
        ? (
          <svg
            className='w-full h-full'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid meet'
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          )
        : (
          <div
            className={twMerge(
              'w-full h-full aspect-square p-2 flex justify-center items-center bg-gray-50 border border-gray-200',
              error != null ? 'text-red-300' : 'text-gray-300'
            )}
          >
            {error ?? 'No QR Code data'}
          </div>
          )}

      <Button
        type='button'
        shape='circle'
        disabled={svg == null}
        className={twMerge(
          'absolute top-2 right-2 p-2 duration-200 opacity-0',
          'disabled:opacity-0',
          'group-hover:enabled:opacity-100 group-hover:disabled:opacity-50'
        )}
        onClick={downloadQRCode}
      >
        <Icon icon={MdDownload} />
      </Button>
    </div>
  )
}

export default QRCode
