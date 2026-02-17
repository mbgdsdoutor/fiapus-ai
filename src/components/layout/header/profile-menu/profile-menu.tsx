import { ActionIcon, Avatar, Image, Menu, Text } from '@mantine/core';
import { useState } from 'react';

import ArrowLeftIcon from '@/assets/arrow-left-icon.svg';
import ChangePasswordIcon from '@/assets/change-password-icon.svg';
import LogoutIcon from '@/assets/logout-icon.svg';
import MyDataIcon from '@/assets/my-data-icon.svg';
import ProfileIcon from '@/assets/profile-icon.svg';
import ProfilePictureIcon from '@/assets/profile-picture-icon.svg';
import SettingsIcon from '@/assets/settings-icon.svg';

const userData = {
  name: 'Matheus Braz',
  email: 'matheus.braz.gs@gmail.com',
};

export function ProfileMenu() {
  const [isProfileMenuView, setIsProfileMenuView] = useState(false);

  function handleLogout() {
    // signOut();
  }

  const myProfileMenuContent = (
    <>
      <Menu.Item
        onClick={() => setIsProfileMenuView(false)}
        closeMenuOnClick={false}
        styles={{
          itemSection: {
            marginRight: '8px',
          },
        }}
        leftSection={
          <Image
            src={ArrowLeftIcon}
            alt="icone de seta para esquerda"
            w={16}
            h={16}
          />
        }
      >
        <Text c="#8A8A8A">Meu perfil</Text>
      </Menu.Item>
      <Menu.Item
        leftSection={
          <Image src={MyDataIcon} alt="icone de dados" w={16} h={16} />
        }
      >
        Meus dados
      </Menu.Item>
      <Menu.Item
        leftSection={
          <Image
            src={ProfilePictureIcon}
            alt="icone de alterar foto"
            w={16}
            h={16}
          />
        }
      >
        Foto do perfil
      </Menu.Item>
      <Menu.Item
        leftSection={
          <Image
            src={ChangePasswordIcon}
            alt="icone de alterar senha"
            w={16}
            h={16}
          />
        }
      >
        Alterar senha
      </Menu.Item>
    </>
  );

  return (
    <Menu shadow="md" width={280}>
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          radius="md"
          size={40}
          aria-label="Perfil"
        >
          <Avatar
            src="https://p4.wallpaperbetter.com/wallpaper/761/449/102/spy-x-family-anya-folger-hd-wallpaper-preview.jpg"
            alt="your profile"
            name={userData.name}
            color="initials"
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {isProfileMenuView ? (
          myProfileMenuContent
        ) : (
          <>
            <Menu.Label fw={700} fz="lg" c="black" pb={0}>
              {userData.name}
            </Menu.Label>
            <Menu.Label fz="sm" c="black" pt={0} pb="md">
              {userData.email}
            </Menu.Label>
            <Menu.Item
              closeMenuOnClick={false}
              leftSection={
                <Image src={ProfileIcon} alt="icone de perfil" w={16} h={16} />
              }
              onClick={() => setIsProfileMenuView(true)}
            >
              Meu perfil
            </Menu.Item>
            <Menu.Item
              leftSection={
                <Image
                  src={SettingsIcon}
                  alt="icone de configurações"
                  w={16}
                  h={16}
                />
              }
            >
              Configurações
            </Menu.Item>
            <Menu.Item
              onClick={handleLogout}
              leftSection={
                <Image src={LogoutIcon} alt="icone de sair" w={16} h={16} />
              }
            >
              Sair
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
