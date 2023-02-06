import { later } from '../../../test'
import { showToast } from '../function-call'

test('toast disappeared after duration', async () => {
  const onClose = jest.fn()
  showToast({
    duration: 10,
    onClose
  })

  expect(onClose).toHaveBeenCalledTimes(0)
  await later(50)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('show loading toast', async () => {
  showToast({ type: 'loading', className: 'loading-toast' })

  await later()
  expect(
    document.querySelector('.r-toast.r-toast--loading.loading-toast')
  ).toBeTruthy()
})

test('show html toast', async () => {
  showToast({
    type: 'html',
    className: 'html-toast',
    message: '<div>Message</div>'
  })

  await later(1000)
  const toastText = document.querySelector(
    '.html-toast .r-toast__text'
  ) as HTMLDivElement
  expect(toastText.innerHTML).toEqual('<div>Message</div>')
})
