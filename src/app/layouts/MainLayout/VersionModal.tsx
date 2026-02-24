import { type FC, useEffect, useState } from 'react'

import { Modal } from 'antd'
import { useUnit } from 'effector-react'
import Markdown from 'react-markdown'

import { createModal } from 'shared/lib/effector-factories'

import './markdown.scss'

export const [openVersionModal, closeVersionModal, $versionModalOpen] =
  createModal()

export const VersionModal: FC = () => {
  const [open, onClose] = useUnit([$versionModalOpen, closeVersionModal])

  const [changelog, setChangelog] = useState<string>('')

  const fetchChangelog = async () => {
    const text = await fetch('/CHANGELOG.md').then((res) => res.text())
    setChangelog(text)
  }

  useEffect(() => {
    if (open) {
      void fetchChangelog()
    }
  }, [open])

  return (
    <Modal
      footer={false}
      closable
      title='Информация о версии'
      open={open}
      onCancel={onClose}
    >
      <div className='max-h-85 overflow-y-auto changelog'>
        <Markdown>{changelog}</Markdown>
      </div>
    </Modal>
  )
}
