import React, { useState } from 'react'
import { useMemo } from 'react'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  type MenuProps,
  Select,
  theme,
} from 'antd'
import type { SelectProps } from 'antd/lib'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { authModel } from 'entities/auth'

import logo from 'shared/assets/logo.svg'
import { APP_VERSION } from 'shared/config/env-consts'
import { LOCAL_STORAGE_KEYS } from 'shared/const/localStorageKeys'
import { PageLoader } from 'shared/ui/PageLoader'

import { VersionModal, openVersionModal } from './VersionModal'
import './styles.scss'

const { Header, Content, Footer, Sider } = Layout

export function getTabKey(key: number): React.Key {
  return key + 1
}

type MenuItem = Required<MenuProps>['items'][number] & { path: string }
type MainLayoutProps = {
  menuItems: MenuItem[]
  isLoading?: boolean
}
export function MainLayout({
  children,
  isLoading = false,
  menuItems,
}: React.PropsWithChildren<MainLayoutProps>) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG, paddingLG },
  } = theme.useToken()

  const handleLogout = useUnit(authModel.events.logout)

  const { i18n, t } = useTranslation()

  const handleSwitchLanguage = (lang: 'ru' | 'en') => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, lang)
    void i18n.changeLanguage(lang)
  }

  const langOptions: SelectProps['options'] = [
    { label: 'Русский', value: 'ru' },
    { label: 'English', value: 'en' },
    { label: 'Հայկական', value: 'hy' },
  ]

  const location = useLocation()

  const openModal = useUnit(openVersionModal)

  const avatarMenu: MenuProps['items'] = [
    {
      key: '2',
      onClick: handleLogout,
      label: <span>{t('logoutButton')}</span>,
    },
  ]

  const selectedKey = useMemo(() => {
    if (location.pathname.includes('management')) {
      return 1
    }

    return getTabKey(
      menuItems.findIndex((tab) => tab.path === location.pathname),
    )
  }, [menuItems, location.pathname])

  return (
    <>
      <CSSTransition
        in={isLoading}
        timeout={500}
        classNames='modal-transition'
        unmountOnExit
      >
        <PageLoader logo={<img src={logo} alt='Logo' />} />
      </CSSTransition>
      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <Sider theme='light' collapsible collapsed={collapsed} trigger={null}>
          <div className='slider-logo'>
            <img src={logo} alt='Лого' />
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            mode='inline'
            items={menuItems}
            selectedKeys={[selectedKey.toString()]}
          />
        </Sider>

        <Layout>
          <Header
            className='layout__header'
            style={{
              background: colorBgContainer,
            }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: 64,
                height: 64,
              }}
            />

            <div className='flex gap-4 items-center'>
              <Select
                options={langOptions}
                defaultValue={i18n.language}
                onChange={(value) => handleSwitchLanguage(value as 'ru' | 'en')}
              />

              <Dropdown
                placement='bottomRight'
                arrow
                classNames={{ root: 'avatar-dropdown-overlay' }}
                menu={{ items: avatarMenu }}
              >
                <Avatar className='header-avatar'>??</Avatar>
              </Dropdown>
            </div>
          </Header>

          <Content
            className='layout__content'
            style={{
              padding: paddingLG,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>

          <Footer
            className='layout__footer'
            style={{
              background: colorBgContainer,
            }}
          >
            <p onClick={openModal} style={{ cursor: 'pointer' }}>
              {APP_VERSION}
            </p>

            <span>© 2026 Solution Factory. All right reserved.</span>

            <VersionModal />
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}
