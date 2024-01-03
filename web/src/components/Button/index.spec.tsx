import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

import { Button } from './index'

const BUTTON_TEST_ID = 'button'

describe('Button component', () => {
  it('should be able to render the button ', () => {
    const { getByTestId } = render(
      <Button data-testid={BUTTON_TEST_ID}>Entrar</Button>,
    )
    expect(getByTestId(BUTTON_TEST_ID)).toBeInTheDocument()
  })

  it('should be able to render based on the children prop', () => {
    const { getByTestId } = render(
      <Button data-testid={BUTTON_TEST_ID}>Entrar</Button>,
    )

    expect(getByTestId(BUTTON_TEST_ID)).toHaveTextContent('Entrar')
  })

  it('should be able to fire event', () => {
    const handleClick = vi.fn()

    const { getByTestId } = render(
      <Button data-testid={BUTTON_TEST_ID} onClick={handleClick}>
        Entrar
      </Button>,
    )

    fireEvent.click(getByTestId(BUTTON_TEST_ID))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be able to have primary button style', () => {
    const { getByTestId } = render(
      <Button data-testid={BUTTON_TEST_ID}>Default text</Button>,
    )

    expect(getByTestId(BUTTON_TEST_ID)).toHaveClass(
      'flex items-center rounded-lg justify-center h-12 w-full py-3 font-semibold duration-150 ease-out text-lg hover:bg-blue-900 bg-blue-900 text-slate-50 disable:border-2 disable:bg-blue-900 disable:hover:bg-blue-900',
    )
  })

  it('should be able to have secondary button style', () => {
    const { getByTestId } = render(
      <Button data-testid={BUTTON_TEST_ID} variants="secondary">
        Default text
      </Button>,
    )

    expect(getByTestId(BUTTON_TEST_ID)).toHaveClass(
      'font-poppins flex items-center rounded-lg justify-center h-12 w-full py-3 font-semibold duration-150 ease-out border-2 border-slate-300 bg-transparent text-slate-500 hover:bg-slate-200 ',
    )
  })
})
