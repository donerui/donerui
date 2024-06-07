import { useEffect, useState } from 'react'
import {
  MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp,
  MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowUp
} from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Button, { type IButtonProps } from '../Button'
import Icon from '../Icon'
import { defaultPaginationActiveButtonProps, defaultPaginationButtonProps } from './constants'
import { type IPaginationProps } from './types'

function Pagination ({
  maxPages,
  page,
  defaultPage = 0,
  onPageChange,
  visibleAmount = 5,
  previousButton = true,
  nextButton = true,
  jumpPreviousButton = true,
  jumpNextButton = true,
  startPage = 0,
  buttonProps,
  activeButtonProps,
  alignment = 'horizontal',
  showUtilityButtons = 'hover'
}: IPaginationProps): JSX.Element {
  const isControlled = page !== undefined

  const [currentPage, setCurrentPage] = useState<number>(isControlled ? page : defaultPage)
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  const [paginationButtonProps, setPaginationButtonProps] = useState<IButtonProps>(defaultPaginationButtonProps)
  const [paginationActiveButtonProps, setPaginationActiveButtonProps] = useState<IButtonProps>(defaultPaginationActiveButtonProps)

  const isFirst = currentPage === startPage
  const renderFirst = maxPages > 0 && currentPage - Math.floor(visibleAmount / 2) > startPage
  const isLast = currentPage === startPage + maxPages - 1
  const renderLast = maxPages > 1 && currentPage + Math.floor(visibleAmount / 2) < startPage + maxPages - 1

  const hasEllipsisPrevious = visiblePages[0] > startPage + Math.floor(visibleAmount / 2)
  const hasEllipsisNext = visiblePages[visiblePages.length - 1] < startPage + maxPages - 1 - Math.floor(visibleAmount / 2)

  useEffect(() => {
    setPaginationButtonProps({ ...defaultPaginationButtonProps, ...buttonProps })
  }, [buttonProps])

  useEffect(() => {
    setPaginationActiveButtonProps({ ...defaultPaginationActiveButtonProps, ...activeButtonProps })
  }, [activeButtonProps])

  useEffect(() => {
    if (isControlled) {
      setCurrentPage(page)
    }
  }, [isControlled, page])

  useEffect(() => {
    const newVisiblePages = []

    const visibleStart = Math.max(startPage, currentPage - Math.floor(visibleAmount / 2))
    for (let i = visibleStart; i < Math.min(maxPages, visibleStart + visibleAmount); i++) {
      newVisiblePages.push(i)
    }

    setVisiblePages(newVisiblePages)
  }, [maxPages, visibleAmount, currentPage])

  return (
    <span className={twMerge(
      'group flex justify-between',
      alignment === 'vertical' && 'flex-col h-full w-fit',
      showUtilityButtons === 'never' && 'justify-center'
    )}>
      <span className={twMerge(
        'flex gap-2',
        alignment === 'vertical' && 'flex-col',
        showUtilityButtons === 'hover' && 'duration-200 opacity-25 group-hover:opacity-100',
        showUtilityButtons === 'never' && 'hidden'
      )}>
        {jumpPreviousButton && (
          <Button
            {...paginationButtonProps}
            iconButton
            disabled={isFirst}
            onClick={() => {
              if (!isFirst) {
                const newPage = Math.max(startPage, currentPage - visibleAmount)

                if (!isControlled) {
                  setCurrentPage(newPage)
                }

                onPageChange?.(newPage)
              }
            }}
          >
            <Icon icon={alignment === 'vertical' ? MdKeyboardDoubleArrowUp : MdKeyboardDoubleArrowLeft} />
          </Button>
        )}

        {previousButton && (
          <Button
            {...paginationButtonProps}
            iconButton
            disabled={isFirst}
            onClick={() => {
              if (!isFirst) {
                const newPage = Math.max(startPage, currentPage - 1)

                if (!isControlled) {
                  setCurrentPage(newPage)
                }

                onPageChange?.(newPage)
              }
            }}
          >
            <Icon icon={alignment === 'vertical' ? MdKeyboardArrowUp : MdKeyboardArrowLeft} />
          </Button>
        )}
      </span>

      <span className={twMerge(
        'flex gap-2',
        alignment === 'vertical' && 'flex-col'
      )}>
        {renderFirst && (
          <Button
            {...paginationButtonProps}
            onClick={() => {
              if (!isControlled) {
                setCurrentPage(startPage)
              }

              onPageChange?.(startPage)
            }}
          >
            1
          </Button>
        )}

        {hasEllipsisPrevious && (
          <span className="flex justify-center bg-white text-sm font-semibold text-gray-700 rounded-lg px-2 py-1 duration-200 h-8 min-w-[2rem]">...</span>
        )}

        {visiblePages.map((p) => (
          <Button
            key={p}
            {...(p === currentPage ? paginationActiveButtonProps : paginationButtonProps)}
            onClick={() => {
              if (!isControlled) {
                setCurrentPage(p)
              }

              onPageChange?.(p)
            }}
          >
            {p + 1}
          </Button>
        ))}

        {hasEllipsisNext && (
          <span className="flex justify-center bg-white text-sm font-semibold text-gray-700 rounded-lg px-2 py-1 duration-200 h-8 min-w-[2rem]">...</span>
        )}

        {renderLast && (
          <Button
            {...paginationButtonProps}
            onClick={() => {
              if (!isControlled) {
                setCurrentPage(startPage + maxPages - 1)
              }

              onPageChange?.(startPage + maxPages - 1)
            }}
          >
            {maxPages}
          </Button>
        )}
      </span>

      <span className={twMerge(
        'flex gap-2',
        alignment === 'vertical' && 'flex-col',
        showUtilityButtons === 'hover' && 'duration-200 opacity-25 group-hover:opacity-100',
        showUtilityButtons === 'never' && 'hidden'
      )}>
        {nextButton && (
          <Button
            {...paginationButtonProps}
            iconButton
            disabled={isLast}
            onClick={() => {
              if (!isLast) {
                const newPage = Math.min(startPage + maxPages - 1, currentPage + 1)

                if (!isControlled) {
                  setCurrentPage(newPage)
                }

                onPageChange?.(newPage)
              }
            }}
          >
            <Icon icon={alignment === 'vertical' ? MdKeyboardArrowDown : MdKeyboardArrowRight} />
          </Button>
        )}

        {jumpNextButton && (
          <Button
            {...paginationButtonProps}
            iconButton
            disabled={isLast}
            onClick={() => {
              if (!isLast) {
                const newPage = Math.min(startPage + maxPages - 1, currentPage + visibleAmount)

                if (!isControlled) {
                  setCurrentPage(newPage)
                }

                onPageChange?.(newPage)
              }
            }}
          >
            <Icon icon={alignment === 'vertical' ? MdKeyboardDoubleArrowDown : MdKeyboardDoubleArrowRight} />
          </Button>
        )}
      </span>
    </span>
  )
}

export * from './types'

export default Pagination
