import { type QRCodeErrorCorrectionLevel } from 'qrcode'

export interface IQRCodeProps {
  className?: string
  data: string
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
  margin?: number
}
