"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface LoadingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  message?: string
  showCancel?: boolean
  onCancel?: () => void
}

export function LoadingDialog({
  open,
  onOpenChange,
  title = "IEP Generator",
  message = "Analyzing all the information...",
  showCancel = true,
  onCancel,
}: LoadingDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-16 h-16">
            <svg viewBox="0 0 49 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" width="48" height="48" rx="13.7143" fill="url(#paint0_linear_loading)" />
              <path d="M31.5008 30.9998C31.7557 31 32.0008 31.0976 32.1862 31.2726C32.3715 31.4476 32.483 31.6867 32.498 31.9412C32.5129 32.1956 32.4301 32.4461 32.2665 32.6416C32.1029 32.837 31.8709 32.9627 31.6178 32.9928L31.5008 32.9998H24.5008C24.2459 32.9995 24.0008 32.9019 23.8154 32.7269C23.6301 32.5519 23.5186 32.3128 23.5036 32.0584C23.4887 31.8039 23.5715 31.5534 23.7351 31.3579C23.8986 31.1625 24.1307 31.0369 24.3838 31.0068L24.5008 30.9998H31.5008ZM32.1318 16.3678C32.364 16.5999 32.5482 16.8755 32.6739 17.1789C32.7996 17.4823 32.8643 17.8074 32.8643 18.1358C32.8643 18.4641 32.7996 18.7893 32.6739 19.0926C32.5482 19.396 32.364 19.6716 32.1318 19.9038L21.2358 30.7998C21.1086 30.927 20.9596 31.0303 20.7958 31.1048L16.9918 32.8338C16.1498 33.2168 15.2838 32.3498 15.6668 31.5078L17.3968 27.7038C17.4709 27.5401 17.5739 27.391 17.7008 27.2638L28.5968 16.3678C29.0656 15.8991 29.7014 15.6358 30.3643 15.6358C31.0272 15.6358 31.663 15.8991 32.1318 16.3678ZM18.5008 12.9998C18.7094 12.9998 18.9127 13.0652 19.0824 13.1865C19.252 13.3079 19.3794 13.4793 19.4468 13.6768L19.5768 14.0548C19.7248 14.4885 19.9702 14.8826 20.2942 15.2067C20.6182 15.5309 21.0121 15.7765 21.4458 15.9248L21.8238 16.0538C22.021 16.1213 22.1921 16.2488 22.3133 16.4184C22.4345 16.5881 22.4996 16.7913 22.4996 16.9998C22.4996 17.2082 22.4345 17.4114 22.3133 17.5811C22.1921 17.7507 22.021 17.8782 21.8238 17.9458L21.4458 18.0758C21.012 18.2238 20.618 18.4692 20.2938 18.7931C19.9696 19.1171 19.724 19.5111 19.5758 19.9448L19.4468 20.3228C19.3792 20.52 19.2517 20.6911 19.0821 20.8123C18.9125 20.9334 18.7092 20.9986 18.5008 20.9986C18.2923 20.9986 18.0891 20.9334 17.9195 20.8123C17.7499 20.6911 17.6224 20.52 17.5548 20.3228L17.4248 19.9448C17.2768 19.511 17.0314 19.1169 16.7074 18.7928C16.3834 18.4686 15.9895 18.223 15.5558 18.0748L15.1778 17.9458C14.9806 17.8782 14.8094 17.7507 14.6883 17.5811C14.5671 17.4114 14.502 17.2082 14.502 16.9998C14.502 16.7913 14.5671 16.5881 14.6883 16.4184C14.8094 16.2488 14.9806 16.1213 15.1778 16.0538L15.5558 15.9238C15.9895 15.7758 16.3836 15.5304 16.7078 15.2064C17.0319 14.8824 17.2776 14.4884 17.4258 14.0548L17.5548 13.6768C17.6222 13.4793 17.7496 13.3079 17.9192 13.1865C18.0888 13.0652 18.2922 12.9998 18.5008 12.9998Z" fill="white" />
              <defs>
                <linearGradient id="paint0_linear_loading" x1="24.5" y1="0" x2="24.5" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B3560E" />
                  <stop offset="1" stopColor="#FFF706" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-medium leading-6 tracking-normal text-muted-foreground text-center">{title}</p>
            <h2 className="text-xl font-medium leading-7 tracking-normal text-foreground text-center">{message}</h2>
          </div>
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          {showCancel && (
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
